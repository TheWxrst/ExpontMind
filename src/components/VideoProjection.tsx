"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

class VideoProjectionApp {
  canvas: HTMLCanvasElement;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  group: THREE.Group;
  grids: THREE.Group[] = [];
  gridSize = 36;
  spacing = 0.56;
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  hoveredPoint = new THREE.Vector3();
  hoverRadius = 0.8;
  scrollProgress = 0;
  scrollTicking = false;
  targetRotationZ = 0;
  frameCount = 0;
  videoElement: HTMLVideoElement | null = null;
  videoTexture: THREE.VideoTexture | null = null;
  cachedMousePos = new THREE.Vector3();

  constructor(canvasElement: HTMLCanvasElement) {
    this.canvas = canvasElement;

    // Renderer
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: !isMobile,
      alpha: true,
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5));

    // Scene & Camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camera.position.z = 6;

    // Controls - only Z rotation, no zoom
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    this.controls.minPolarAngle = Math.PI / 2;
    this.controls.maxPolarAngle = Math.PI / 2;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    this.scene.add(ambientLight);

    // Left light - pointing toward front
    const leftLight = new THREE.DirectionalLight(0xffffff, 8);
    leftLight.position.set(-5, 2, 5);
    leftLight.target.position.set(0, 0, 0);
    this.scene.add(leftLight);
    this.scene.add(leftLight.target);

    // Right light - pointing toward front
    const rightLight = new THREE.DirectionalLight(0xffffff, 8);
    rightLight.position.set(5, 2, 5);
    rightLight.target.position.set(0, 0, 0);
    this.scene.add(rightLight);
    this.scene.add(rightLight.target);

    // Group
    this.group = new THREE.Group();
    this.scene.add(this.group);
    this.group.scale.setScalar(0.15);

    // Create video texture for cubes
    this.createVideoTexture();

    // Load mask and create grid
    this.createMask();

    // Resize
    window.addEventListener("resize", this.onResize.bind(this));

    // Mouse move for hover effect
    window.addEventListener("mousemove", this.onMouseMove.bind(this), { passive: true });

    // Scroll for rotation
    window.addEventListener("scroll", this.onScroll.bind(this), { passive: true });

    // Animate
    this.animate();
  }

  onScroll() {
    if (this.scrollTicking) return;
    this.scrollTicking = true;

    requestAnimationFrame(() => {
      const windowHeight = window.innerHeight;
      const maxScroll = windowHeight * 3;
      this.scrollProgress = Math.min(window.scrollY / maxScroll, 1);
      this.targetRotationZ = this.scrollProgress * Math.PI;
      this.scrollTicking = false;
    });
  }

  createVideoTexture() {
    // Create video element
    this.videoElement = document.createElement("video");
    this.videoElement.src = "/footage.mp4";
    this.videoElement.loop = true;
    this.videoElement.muted = true;
    this.videoElement.playsInline = true;
    this.videoElement.autoplay = true;
    this.videoElement.play();

    // Create video texture
    this.videoTexture = new THREE.VideoTexture(this.videoElement);
    this.videoTexture.minFilter = THREE.LinearFilter;
    this.videoTexture.magFilter = THREE.LinearFilter;
    this.videoTexture.colorSpace = THREE.SRGBColorSpace;
  }

  onMouseMove(event: MouseEvent) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  createMask() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const maskImage = new Image();
    maskImage.crossOrigin = "anonymous";
    maskImage.onload = () => {
      const originalWidth = maskImage.width;
      const originalHeight = maskImage.height;
      const aspectRatio = originalWidth / originalHeight;

      let gridWidth: number;
      let gridHeight: number;

      if (aspectRatio > 1) {
        gridWidth = this.gridSize;
        gridHeight = Math.round(this.gridSize / aspectRatio);
      } else {
        gridHeight = this.gridSize;
        gridWidth = Math.round(this.gridSize * aspectRatio);
      }

      canvas.width = gridWidth;
      canvas.height = gridHeight;
      ctx.drawImage(maskImage, 0, 0, gridWidth, gridHeight);

      const imageData = ctx.getImageData(0, 0, gridWidth, gridHeight);
      this.createGrid(imageData.data, gridWidth, gridHeight);
    };

    maskImage.src = "/logo.png";
  }

  createGrid(data: Uint8ClampedArray, gridWidth: number, gridHeight: number) {
    // Video texture material for cubes
    const material = new THREE.MeshBasicMaterial({
      map: this.videoTexture,
      side: THREE.FrontSide,
    });

    const gridGroup = new THREE.Group();
    this.group.add(gridGroup);

    for (let x = 0; x < this.gridSize; x++) {
      for (let y = 0; y < this.gridSize; y++) {
        const flippedY = gridHeight - 1 - y;
        const pixelIndex = (flippedY * gridWidth + x) * 4;
        const r = data[pixelIndex];
        const g = data[pixelIndex + 1];
        const b = data[pixelIndex + 2];

        const brightness = (r + g + b) / 3;

        if (brightness < 128) {
          const geometry = new THREE.BoxGeometry(0.45, 0.45, 0.45);

          // UV mapping - cube бүрт video-ийн өөр өөр хэсгийг харуулна
          const uvAttribute = geometry.attributes.uv;
          const uOffset = x / this.gridSize;
          const vOffset = y / this.gridSize;
          const uvScale = 1 / this.gridSize;

          for (let i = 0; i < uvAttribute.count; i++) {
            const u = uvAttribute.getX(i) * uvScale + uOffset;
            const v = uvAttribute.getY(i) * uvScale + vOffset;
            uvAttribute.setXY(i, u, v);
          }

          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.x = (x - (this.gridSize - 1) / 2) * this.spacing;
          mesh.position.y = (y - (this.gridSize - 1) / 2) * this.spacing;
          mesh.position.z = 0;

          gridGroup.add(mesh);
        }
      }
    }

    this.grids.push(gridGroup);
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.frameCount++;
    this.controls.update();

    // Smooth rotation based on scroll (rotate around Y axis)
    this.group.rotation.y +=
      (this.targetRotationZ - this.group.rotation.y) * 0.05;

    // Only calculate mouse world position every 2nd frame
    if (this.frameCount % 2 === 0) {
      const mouseWorld = new THREE.Vector3(this.mouse.x, this.mouse.y, 0);
      mouseWorld.unproject(this.camera);
      const dir = mouseWorld.sub(this.camera.position).normalize();
      const distance = -this.camera.position.z / dir.z;
      this.cachedMousePos.copy(this.camera.position).add(dir.multiplyScalar(distance));
    }

    // Update mesh positions based on hover - only every 2nd frame
    if (this.frameCount % 2 === 0) {
      const mousePos = this.cachedMousePos;
      this.grids.forEach((gridGroup) => {
        const children = gridGroup.children;
        for (let i = 0, len = children.length; i < len; i++) {
          const mesh = children[i];
          // Use local position instead of getWorldPosition for speed
          const dx = mesh.position.x * 0.15 - mousePos.x;
          const dy = mesh.position.y * 0.15 - mousePos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const effectStrength =
            dist < this.hoverRadius ? 1 - dist / this.hoverRadius : 0;
          const targetZ = effectStrength * 12;

          mesh.position.z += (targetZ - mesh.position.z) * 0.15;
        }
      });
    }

    this.renderer.render(this.scene, this.camera);
  }
}

export default function VideoProjection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<VideoProjectionApp | null>(null);

  useEffect(() => {
    if (canvasRef.current && !appRef.current) {
      appRef.current = new VideoProjectionApp(canvasRef.current);
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "auto",
      }}
    />
  );
}
