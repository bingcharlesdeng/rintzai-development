import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import Anime from 'animejs';

const AnimatedArt = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create geometry and material
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Position camera and light
    camera.position.z = 5;
    const light = new THREE.AmbientLight(0x404040);
    scene.add(light);

    // Animation logic with Anime.js
    const animate = Anime({
      targets: sphere.rotation,
      x: 2 * Math.PI,
      y: 2 * Math.PI,
      z: 2 * Math.PI,
      duration: 8000,
      easing: 'linear',
      loop: true,
    });

    // Resize handler for responsiveness
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Render loop
    const animateScene = () => {
      requestAnimationFrame(animateScene);
      renderer.render(scene, camera);
    };

    animateScene();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      animate.pause();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />;
};

export default AnimatedArt;