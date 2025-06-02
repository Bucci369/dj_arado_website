// src/effects/SandTextParticleEffect.ts
interface Particle {
  x: number; y: number;           // Aktuelle Position
  startX: number; startY: number;  // Startposition für Formationsanimation (aus der "Wolke")
  originX: number; originY: number; // Zielposition im geformten Text
  size: number;
  color: string;
  opacity: number;
  // Für Physik/Bewegung
  vx: number; // Geschwindigkeit für initiales Auflösen/Streuen
  vy: number;
}

export class SandTextParticleEffect {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  public particles: Particle[] = [];
  private text: string;
  private textOptions = {
    font: 'bold 14rem Poppins', // AN DEINEN .hero-title STYLE & CANVAS CONTAINER HÖHE ANPASSEN!
    fillStyle: '#FFFFFF',
    particleSpacing: 1.8,        // Verkleinert für feinere Partikel (mehr Partikel!)
    particleSizeMin: 0.4,      // Verkleinert für feinere Partikel
    particleSizeMax: 1.0,      // Verkleinert für feinere Partikel
    formRandomFactor: 1.8,     // Wie weit verstreut Partikel starten (größer für weitere Wolke)
    dissolveScatterStrength: 20, // Wie stark Partikel beim Auflösen initial streuen
    windStrengthHorizontal: 400, // Stärke des Windes nach rechts
    windTurbulenceVertical: 80,  // Vertikale Streuung im Wind
  };

  public formationProgress = 0; 
  public dissolveProgress = 0;  
  public windProgress = 0;      
  public isVisible = true;      

  constructor(canvas: HTMLCanvasElement, text: string, options?: Partial<SandTextParticleEffect['textOptions']>) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.text = text;
    this.textOptions = { ...this.textOptions, ...options };
    this.init();
  }

  private init() {
    this.resizeCanvasAndCreateParticles();
    this.draw(); // Einmal initial zeichnen (Partikel sind bei opacity 0)
    window.addEventListener('resize', this.handleResize);
  }

  public handleResize = () => {
    this.resizeCanvasAndCreateParticles();
    this.draw(); 
  }

  private resizeCanvasAndCreateParticles() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    let canvasDrawWidth = 300, canvasDrawHeight = 150;

    if (rect.width > 0 && rect.height > 0) {
        canvasDrawWidth = rect.width; canvasDrawHeight = rect.height;
    } else if (this.canvas.parentElement) {
        canvasDrawWidth = this.canvas.parentElement.clientWidth || canvasDrawWidth;
        canvasDrawHeight = this.canvas.parentElement.clientHeight || canvasDrawHeight;
    }
    
    this.canvas.width = canvasDrawWidth * dpr;
    this.canvas.height = canvasDrawHeight * dpr;
    this.ctx.scale(dpr, dpr);
    this._createTextParticles();
  }

  private _createTextParticles() {
    this.particles = [];
    const dpr = window.devicePixelRatio || 1;
    const canvasCSSWidth = this.canvas.width / dpr;
    const canvasCSSHeight = this.canvas.height / dpr;

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d')!;
    tempCanvas.width = this.canvas.width; 
    tempCanvas.height = this.canvas.height;
    
    tempCtx.font = this.textOptions.font;
    tempCtx.fillStyle = 'black'; 
    tempCtx.textAlign = 'center';
    tempCtx.textBaseline = 'middle';
    tempCtx.fillText(this.text, tempCanvas.width / 2, tempCanvas.height / 2);

    const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    const data = imageData.data;

    for (let yPix = 0; yPix < tempCanvas.height; yPix += this.textOptions.particleSpacing * dpr) {
      for (let xPix = 0; xPix < tempCanvas.width; xPix += this.textOptions.particleSpacing * dpr) {
        const alphaIndex = (Math.floor(yPix) * tempCanvas.width + Math.floor(xPix)) * 4 + 3;
        if (data[alphaIndex] > 128) { 
          const originX = xPix / dpr; 
          const originY = yPix / dpr;
          
          // Für den "Wolken"-Effekt starten die Partikel zufälliger
          const randomAngle = Math.random() * Math.PI * 2;
          // Radius so, dass Partikel auch von außerhalb des direkten Textbereichs kommen können
          const randomRadiusFactor = (0.5 + Math.random() * 0.5) * this.textOptions.formRandomFactor;
          const cloudRadius = Math.min(canvasCSSWidth, canvasCSSHeight) * 0.4 * randomRadiusFactor;


          this.particles.push({
            startX: canvasCSSWidth / 2 + Math.cos(randomAngle) * cloudRadius,
            startY: canvasCSSHeight / 2 + Math.sin(randomAngle) * cloudRadius,
            originX, originY,
            x: 0, y: 0, // Werden im ersten Update gesetzt
            size: this.textOptions.particleSizeMin + Math.random() * (this.textOptions.particleSizeMax - this.textOptions.particleSizeMin),
            color: this.textOptions.fillStyle,
            opacity: 0,
            vx: 0, vy: 0,
          });
        }
      }
    }
    this.particles.forEach(p => { // Initiale Positionen für Animationsstart
        p.x = p.startX;
        p.y = p.startY;
    });
  }
  
  public updateAndDraw() {
    if (!this.isVisible && this.formationProgress < 1) { // Nicht zeichnen, wenn unsichtbar und Formation nicht gestartet
        this.ctx.clearRect(0, 0, this.canvas.width / (window.devicePixelRatio||1), this.canvas.height / (window.devicePixelRatio||1));
        return;
    }

    const dpr = window.devicePixelRatio || 1;
    const canvasCSSWidth = this.canvas.width / dpr;
    const canvasCSSHeight = this.canvas.height / dpr;
    this.ctx.clearRect(0, 0, canvasCSSWidth, canvasCSSHeight);

    const hexColor = this.textOptions.fillStyle.startsWith('#') ? this.textOptions.fillStyle : '#FFFFFF';
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    this.particles.forEach(p => {
      let currentX, currentY, currentOpacity;

      // Phase 1: Formation
      currentX = p.startX + (p.originX - p.startX) * this.formationProgress;
      currentY = p.startY + (p.originY - p.startY) * this.formationProgress;
      currentOpacity = this.formationProgress;

      // Wenn Formation abgeschlossen ist, sind originX/Y die Basis
      if (this.formationProgress >= 1) {
        currentX = p.originX;
        currentY = p.originY;
        currentOpacity = 1;

        // Phase 2: Auflösen / Destabilisieren
        if (this.dissolveProgress > 0) {
          if (this.dissolveProgress < 0.05 && (p.vx === 0 && p.vy === 0)) { 
            p.vx = (Math.random() - 0.5) * this.textOptions.dissolveScatterStrength; 
            p.vy = (Math.random() - 0.5) * this.textOptions.dissolveScatterStrength;
          }
          currentX = p.originX + p.vx * this.dissolveProgress;
          currentY = p.originY + p.vy * this.dissolveProgress;
          currentOpacity = 1 - (this.dissolveProgress * 0.9); // Stärkeres Verblassen
        }

        // Phase 3: Wind
        // Startet, wenn Auflösen begonnen hat und windProgress aktiv ist
        if (this.dissolveProgress > 0.01 && this.windProgress > 0) {
          // Startposition für Wind ist die aktuelle Position aus der Auflösungsphase
          const preWindX = p.originX + p.vx * this.dissolveProgress; 
          const preWindY = p.originY + p.vy * this.dissolveProgress;

          currentX = preWindX + this.textOptions.windStrengthHorizontal * this.windProgress; 
          currentY = preWindY + (Math.random() - 0.5) * this.textOptions.windTurbulenceVertical * this.windProgress; 
          currentOpacity = (1 - this.dissolveProgress * 0.9) * (1 - this.windProgress); 
        }
      }
      
      p.x = currentX; 
      p.y = currentY;

      if (currentOpacity > 0.01 && p.x > -p.size && p.x < canvasCSSWidth + p.size && p.y > -p.size && p.y < canvasCSSHeight + p.size) {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity})`;
        this.ctx.fill();
      }
    });
  }
  
  public draw() { 
      this.updateAndDraw();
  }

  public destroy() {
    window.removeEventListener('resize', this.handleResize);
    this.particles = [];
  }
}