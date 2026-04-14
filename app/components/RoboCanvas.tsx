"use client";

import { useEffect, useRef } from "react";

export default function RoboCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    let renderer: import("three").WebGLRenderer;
    let camera: import("three").PerspectiveCamera;
    let scene: import("three").Scene;
    let mouseX = 0, mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    const init = async () => {
      const THREE = await import("three");

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 32;

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

      // ── Particles ──
      const pCount = 2400;
      const pGeo = new THREE.BufferGeometry();
      const pos = new Float32Array(pCount * 3);
      const sizes = new Float32Array(pCount);
      for (let i = 0; i < pCount; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * 90;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 90;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
        sizes[i] = Math.random() * 0.14 + 0.04;
      }
      pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      pGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
      const pMat = new THREE.PointsMaterial({
        color: 0x00c8ff,
        size: 0.10,
        transparent: true,
        opacity: 0.45,
        sizeAttenuation: true,
      });
      scene.add(new THREE.Points(pGeo, pMat));

      // ── Torus (robot joint) ──
      const torusGeo = new THREE.TorusGeometry(9, 0.18, 3, 100);
      const torusMat = new THREE.LineBasicMaterial({ color: 0x00c8ff, transparent: true, opacity: 0.18 });
      const torus = new THREE.LineSegments(new THREE.EdgesGeometry(torusGeo), torusMat);
      torus.rotation.x = Math.PI / 4;
      scene.add(torus);

      // ── Outer wireframe icosahedron ──
      const icoGeo = new THREE.IcosahedronGeometry(10, 1);
      const icoMat = new THREE.LineBasicMaterial({ color: 0x003366, transparent: true, opacity: 0.22 });
      const ico = new THREE.LineSegments(new THREE.EdgesGeometry(icoGeo), icoMat);
      scene.add(ico);

      // ── Inner solid icosahedron ──
      const innerGeo = new THREE.IcosahedronGeometry(5.5, 1);
      const innerEdges = new THREE.EdgesGeometry(innerGeo);
      const innerMat = new THREE.LineBasicMaterial({ color: 0x0066aa, transparent: true, opacity: 0.3 });
      const inner = new THREE.LineSegments(innerEdges, innerMat);
      scene.add(inner);

      // ── Satellite small spheres ──
      const satPositions = [
        [16, -5, -8], [-18, 4, -12], [14, 10, -5], [-12, -12, -4]
      ] as const;
      const sats = satPositions.map(([x, y, z]) => {
        const g = new THREE.IcosahedronGeometry(2.2, 1);
        const e = new THREE.EdgesGeometry(g);
        const m = new THREE.LineBasicMaterial({ color: 0x00aadd, transparent: true, opacity: 0.25 });
        const ls = new THREE.LineSegments(e, m);
        ls.position.set(x, y, z);
        scene.add(ls);
        return ls;
      });

      // ── Grid at bottom ──
      const grid = new THREE.GridHelper(120, 40, 0x001133, 0x000d22);
      grid.position.y = -18;
      scene.add(grid);

      // ── Lights ──
      scene.add(new THREE.AmbientLight(0x001244, 1));
      const pt = new THREE.PointLight(0x00c8ff, 2.5, 80);
      pt.position.set(0, 12, 18);
      scene.add(pt);

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

        ico.rotation.y = t * 0.06;
        ico.rotation.x = t * 0.03;

        inner.rotation.y = -t * 0.09;
        inner.rotation.z = t * 0.04;

        torus.rotation.z = t * 0.05;
        torus.rotation.y = t * 0.03;

        sats.forEach((s, i) => {
          s.rotation.y = t * (0.1 + i * 0.03);
          s.rotation.x = t * (0.07 + i * 0.02);
        });

        camera.position.x += (mouseX * 3.5 - camera.position.x) * 0.04;
        camera.position.y += (mouseY * 2.5 - camera.position.y) * 0.04;
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
