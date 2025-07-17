import { useMemo } from 'react';
import * as THREE from 'three';

export default function WireCave() {
    const material = useMemo(
        () =>
            new THREE.MeshBasicMaterial({
                color: '#444',
                wireframe: true,
                transparent: true,
                opacity: 0.2,
                depthWrite: false,
            }),
        []
    );

    const positions = [
        [-4, -1, -5],
        [3, 2, -6],
        [0, -3, -7],
        [1.5, 1.2, -4],
    ];

    return (
        <>
            {positions.map((pos, i) => (
                <mesh key={i} position={pos as [number, number, number]}>
                    <icosahedronGeometry args={[2 + Math.random(), 1]} />
                    <primitive object={material.clone()} />
                </mesh>
            ))}
        </>
    );
}