'use client'

import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { motion } from 'framer-motion'

// Custom volumetric smoke shader
const smokeVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const smokeFragmentShader = `
  uniform float uTime;
  uniform float uDensity;
  uniform vec3 uColor;
  varying vec2 vUv;
  varying vec3 vPosition;
  
  // Simplex noise
  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 permute(vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
  }
  
  vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
  }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod289(i);
    vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for(int i = 0; i < 5; i++) {
      value += amplitude * snoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    
    return value;
  }
  
  void main() {
    vec2 uv = vUv;
    
    // Time-based movement
    float time = uTime * 0.05;
    
    // Create flowing smoke
    vec3 smokePos = vec3(uv.x * 2.0, uv.y * 3.0 + time, time * 0.3);
    
    // Multiple noise layers
    float noise1 = fbm(smokePos * 0.8);
    float noise2 = fbm(smokePos * 1.6 + vec3(100.0));
    float noise3 = fbm(smokePos * 3.2 + vec3(200.0));
    
    // Combine noises
    float smoke = noise1 * 0.6 + noise2 * 0.3 + noise3 * 0.1;
    
    // Ground fade - more smoke at bottom
    float groundMask = pow(1.0 - uv.y, 2.0);
    
    // Horizontal spread
    float horizontalMask = smoothstep(0.0, 0.3, uv.x) * smoothstep(1.0, 0.7, uv.x);
    
    // Create density
    float density = smoke * groundMask * horizontalMask * uDensity;
    density = smoothstep(0.2, 0.8, density);
    
    // Final color with opacity
    vec3 finalColor = uColor;
    float alpha = density * 0.6;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`

function VolumetricSmoke() {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: smokeVertexShader,
      fragmentShader: smokeFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uDensity: { value: 50.0 },
        uColor: { value: new THREE.Color('white') }
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    })
  }, [])
  
  useFrame((state) => {
    if (shaderMaterial) {
      shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime
    }
  })
  
  return (
    <>
      {/* Main ground smoke layers */}
      <mesh
        ref={meshRef}
        position={[0, -2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={shaderMaterial}
      >
        <planeGeometry args={[25, 15, 64, 64]} />
      </mesh>
      
      <mesh
        position={[3, -1.8, 2]}
        rotation={[-Math.PI / 2 + 0.1, 0, 0.3]}
        material={shaderMaterial}
      >
        <planeGeometry args={[20, 12, 64, 64]} />
      </mesh>
      
      <mesh
        position={[-2, -1.9, -1]}
        rotation={[-Math.PI / 2 - 0.05, 0, -0.2]}
        material={shaderMaterial}
      >
        <planeGeometry args={[22, 13, 64, 64]} />
      </mesh>
    </>
  )
}

const SmokeLanding: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    setIsMounted(true)
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isMounted) return null

  // Calculate opacity based on scroll (fade out at 20% scroll)
  const scrollProgress = Math.min(scrollY / (window.innerHeight * 0.2), 1)
  const opacity = 1 - scrollProgress

  return (
    <div 
      style={{ 
        position: 'absolute', 
        bottom: 0,
        left: 0,
        width: '100%', 
        height: '100%',
        opacity: opacity,
        pointerEvents: 'none',
        zIndex: 1
      }}
    >
      {/* Volumetric Smoke Canvas */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
        style={{ opacity: opacity }}
      >
        <Canvas
          camera={{ 
            fov: 60, 
            position: [0, 2, 12], 
            near: 0.1,
            far: 100
          }}
          style={{ 
            position: 'absolute', 
            bottom: 0, 
            width: '100%', 
            height: '100%' 
          }}
        >
          <VolumetricSmoke />
        </Canvas>
      </motion.div>

      {/* Farb-Overlay für bläulichen Schimmer */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at center bottom, rgba(0,100,255,0.08), transparent 70%)',
          mixBlendMode: 'screen',
          pointerEvents: 'none',
        }}
      />

      {/* Glow-Effekt am Boden */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '40%',
          background: 'radial-gradient(ellipse 120% 100% at center bottom, rgba(255, 255, 255, 0.06), transparent)',
          pointerEvents: 'none',
          filter: 'blur(20px)'
        }}
      />
    </div>
  )
}

export default SmokeLanding