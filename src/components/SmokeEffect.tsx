'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import * as THREE from 'three'
import { motion } from 'framer-motion'

extend({ Mesh: THREE.Mesh, PlaneGeometry: THREE.PlaneGeometry, ShaderMaterial: THREE.ShaderMaterial })

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform float uOpacity;
  varying vec2 vUv;
  
  // Noise function
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }
  
  float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  
  float fractalNoise(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for (int i = 0; i < 4; i++) {
      value += amplitude * smoothNoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    
    return value;
  }
  
  void main() {
    vec2 uv = vUv;
    
    // Create smoke movement
    float timeOffset = uTime * 0.1;
    vec2 smokeUv = uv + vec2(sin(uTime * 0.2) * 0.05, timeOffset * 0.3);
    
    // Multiple noise layers for realistic smoke
    float noise1 = fractalNoise(smokeUv * 3.0 + uTime * 0.1);
    float noise2 = fractalNoise(smokeUv * 6.0 - uTime * 0.05);
    float noise3 = fractalNoise(smokeUv * 12.0 + uTime * 0.03);
    
    // Combine noises
    float smoke = noise1 * 0.6 + noise2 * 0.3 + noise3 * 0.1;
    
    // Create ground-level fade (smoke only at bottom)
    float groundFade = smoothstep(0.8, 0.0, uv.y);
    
    // Create horizontal spread
    float horizontalFade = smoothstep(0.0, 0.3, uv.x) * smoothstep(1.0, 0.7, uv.x);
    
    // Final smoke density
    float smokeDensity = smoke * groundFade * horizontalFade;
    
    // Add wispy edges
    smokeDensity = smoothstep(0.2, 0.8, smokeDensity);
    
    // Color and opacity
    vec3 smokeColor = vec3(0.9, 0.9, 1.0);
    float alpha = smokeDensity * uOpacity * 0.3;
    
    gl_FragColor = vec4(smokeColor, alpha);
  }
`

function VolumetricSmoke() {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 1.0 }
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
      {/* Main ground smoke layer */}
      <mesh
        ref={meshRef}
        position={[0, -2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={shaderMaterial}
      >
        <planeGeometry args={[50, 30]} />
      </mesh>
      
      {/* Secondary wispy layer */}
      <mesh
        position={[2, -1.5, 1]}
        rotation={[-Math.PI / 2 + 0.1, 0, 0.2]}
        material={shaderMaterial}
      >
        <planeGeometry args={[40, 25]} />
      </mesh>
      
      {/* Third atmospheric layer */}
      <mesh
        position={[-1, -1.8, -1]}
        rotation={[-Math.PI / 2 - 0.05, 0, -0.1]}
        material={shaderMaterial}
      >
        <planeGeometry args={[45, 28]} />
      </mesh>
    </>
  )
}

export default function SmokeEffect() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3, delay: 1 }}
      className="absolute inset-0 pointer-events-none"
      style={{ 
        height: '100vh', 
        width: '100vw',
        zIndex: 1
      }}
    >
      <Canvas
        camera={{ 
          position: [0, 2, 15], 
          fov: 75,
          near: 0.1,
          far: 100
        }}
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'transparent'
        }}
      >
        <VolumetricSmoke />
      </Canvas>
    </motion.div>
  )
}