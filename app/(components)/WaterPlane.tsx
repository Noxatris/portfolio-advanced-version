'use client'

import { MeshReflectorMaterial } from '@react-three/drei'
import { useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader, RepeatWrapping } from 'three'
import { useRef } from 'react'
import * as THREE from 'three'

export default function WaterPlane() {
  const normalMap = useLoader(TextureLoader, '/textures/water-normal.png')
  const meshRef = useRef<THREE.Group>(null)

  // Répétition pour l'effet de mouvement fluide
  normalMap.wrapS = normalMap.wrapT = RepeatWrapping

  useFrame((_, delta) => {
    if (normalMap) {
      // Animation très subtile pour simuler des ondulations lentes
      normalMap.offset.x += delta * 0.02
      normalMap.offset.y += delta * 0.015
    }
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]}>
      <planeGeometry args={[20, 20]} />
      <MeshReflectorMaterial
        blur={[400, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={1.5}
        roughness={0.2}
        depthScale={0.3}
        minDepthThreshold={0.5}
        maxDepthThreshold={1}
        color="red"
        metalness={0.5}
        normalMap={normalMap}
        normalScale={[0.3, 0.3]}
        mirror={1}
      />
    </mesh>
  )
}
