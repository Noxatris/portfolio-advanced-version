'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function Logo3D() {
  const { scene } = useGLTF('/logo_ndev.glb');
  const logoRef = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          emissive: new THREE.Color('#ff66ff'),
          emissiveIntensity: 0.5,
          metalness: 0.3,
          roughness: 0.5,
        });
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (logoRef.current) {
      const t = state.clock.getElapsedTime();
      const scaleFactor = 1.5 + Math.sin(t * 2) * 0.05;
      logoRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);

      const pointer = state.pointer;
      const mouseVec = new THREE.Vector3(pointer.x, pointer.y, 0);
      // Inclinaison douce selon la position du curseur
      const normX = (mouseVec.x * 2);
      const normY = (mouseVec.y * 2);
      const rotationX = normY * 0.3;
      const rotationY = normX * 0.3;

      logoRef.current.rotation.x += (rotationX - logoRef.current.rotation.x) * 0.1;
      logoRef.current.rotation.y += (rotationY - logoRef.current.rotation.y) * 0.1;

      // Pulsation du glow
      const intensity = 0.5 + Math.sin(t * 2) * 0.25;
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material?.emissiveIntensity !== undefined) {
          child.material.emissiveIntensity = intensity;
        }
      });
    }
  });

  return (
    <primitive
      ref={logoRef}
      object={scene}
      position={[0, 0, 0]}
    />
  );
}
