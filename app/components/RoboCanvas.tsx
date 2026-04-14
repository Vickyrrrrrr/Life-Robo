"use client";

import { useEffect, useRef } from "react";

export default function RoboCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let THREE: typeof import("three") | null = null;
    let animId: number;
    let renderer: import("three").WebGLRenderer;
    let scene: import("three").Scene;
    let camera: import("three").PerspectiveCamera;
    let particles: import("three").Points;
    let lines: import("three").LineSegments;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", onMouseMove);

    const init = async () => {
      const mod = await import("three");
      THREE = mod;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 28;

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

      // — Particle cloud —
      const pCount = 1800;
      const pGeo = new THREE.BufferGeometry();
      const pos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 70;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 70;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
      }
      pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0x4466ff,
        size: 0.12,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
      });
      particles = new THREE.Points(pGeo, pMat);
      scene.add(particles);

      // — Wireframe icosahedron ring (looks like robot joint) —
      const icoGeo = new THREE.IcosahedronGeometry(7, 1);
      const edges = new THREE.EdgesGeometry(icoGeo);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x223388,
        transparent: true,
        opacity: 0.35,
      });
      lines = new THREE.LineSegments(edges, lineMat);
      scene.add(lines);

      // — Second smaller wireframe sphere —
      const sGeo = new THREE.IcosahedronGeometry(3.2, 1);
      const sEdges = new THREE.EdgesGeometry(sGeo);
      const sLines = new THREE.LineSegments(
        sEdges,
        new THREE.LineBasicMaterial({ color: 0x3355cc, transparent: true, opacity: 0.28 })
      );
      sLines.position.set(12, -4, -6);
      scene.add(sLines);

      // — Grid plane at bottom —
      const gridHelper = new THREE.GridHelper(80, 30, 0x111833, 0x0d1428);
      gridHelper.position.y = -14;
      scene.add(gridHelper);

      // — Ambient + point lights (affect future meshes) —
      scene.add(new THREE.AmbientLight(0x0a1255, 1));
      const pointLight = new THREE.PointLight(0x2244ff, 2, 60);
      pointLight.position.set(0, 10, 15);
      scene.add(pointLight);

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);

      const clock = new THREE.Clock();

      const animate = () => {
        animId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        particles.rotation.y = t * 0.025;
        particles.rotation.x = t * 0.012;

        lines.rotation.y = t * 0.07;
        lines.rotation.x = t * 0.04;
        lines.rotation.z = t * 0.02;

        // Subtle parallax on camera with mouse
        camera.position.x += (mouseX * 3 - camera.position.x) * 0.04;
        camera.position.y += (mouseY * 2 - camera.position.y) * 0.04;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };
      animate();
    };

    init();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      renderer?.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="robo-canvas"
      aria-hidden="true"
    />
  );
}
