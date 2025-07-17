'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleOrbitalRing() {
    const ref = useRef<THREE.Points>(null);
    const count = 1200;
    const radius = 2.5;
    const { camera } = useThree();

    const {
        basePositions,
        currentPositions,
        angles,
        speeds,
        offsets,
        noiseOffsets
    } = useMemo(() => {
        const basePositions = new Float32Array(count * 3);
        const currentPositions = new Float32Array(count * 3);
        const angles = new Float32Array(count);
        const speeds = new Float32Array(count);
        const offsets = new Float32Array(count * 3);
        const noiseOffsets = new Float32Array(count * 3);

        const radiusOffset = .4;

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const inclination = (Math.random() - 0.5) * Math.PI;

            angles[i] = angle;
            speeds[i] = 0.001 + Math.random() * 0.0015;

            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius * Math.cos(inclination);
            const z = Math.sin(angle) * radius * Math.sin(inclination);
            basePositions.set([x, y, z], i * 3);
            currentPositions.set([x, y, z], i * 3);

            // Offsets sphériques désordonnés autour du curseur
            const dir = new THREE.Vector3(
                Math.random() * 2 - 1,
                Math.random() * 2 - 1,
                Math.random() * 2 - 1
            ).normalize();

            const r = Math.pow(Math.random(), 0.8) * radiusOffset;

            const ox = dir.x * r;
            const oy = dir.y * r;
            const oz = dir.z * r;
            offsets.set([ox, oy, oz], i * 3);

            const nx = Math.random() * 100;
            const ny = Math.random() * 100;
            const nz = Math.random() * 100;
            noiseOffsets.set([nx, ny, nz], i * 3);
        }

        return {
            basePositions,
            currentPositions,
            angles,
            speeds,
            offsets,
            noiseOffsets
        };
    }, [count]);

    useFrame((state) => {
        if (!ref.current) return;
        const time = state.clock.getElapsedTime();
        //const delta = state.clock.getDelta();
        const posAttr = ref.current.geometry.getAttribute('position');

        const pointer = state.pointer;
        const mouseVec = new THREE.Vector3(pointer.x, pointer.y, 0);
        mouseVec.unproject(camera);
        const dir = mouseVec.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        const cursorPos = camera.position.clone().add(dir.multiplyScalar(distance));

        const attract = cursorPos.length() < 2.2;
        const attractStrength = attract ? 0.12 : 0.02;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            let targetX, targetY, targetZ;

            if (attract) {
                const ox = offsets[i3];
                const oy = offsets[i3 + 1];
                const oz = offsets[i3 + 2];

                const nx = Math.sin(time + noiseOffsets[i3]) * 0.15;
                const ny = Math.sin(time + noiseOffsets[i3 + 1]) * 0.15;
                const nz = Math.sin(time + noiseOffsets[i3 + 2]) * 0.15;

                targetX = cursorPos.x + ox + nx;
                targetY = cursorPos.y + oy + ny;
                targetZ = cursorPos.z + oz + nz;
            } else {
                angles[i] += speeds[i];
                const inclination = (i / count - 0.5) * Math.PI;

                targetX = Math.cos(angles[i]) * radius;
                targetY = Math.sin(angles[i]) * radius * Math.cos(inclination);
                targetZ = Math.sin(angles[i]) * radius * Math.sin(inclination);
            }

            const px = currentPositions[i3];
            const py = currentPositions[i3 + 1];
            const pz = currentPositions[i3 + 2];

            const dx = targetX - px;
            const dy = targetY - py;
            const dz = targetZ - pz;

            currentPositions[i3] = px + dx * attractStrength;
            currentPositions[i3 + 1] = py + dy * attractStrength;
            currentPositions[i3 + 2] = pz + dz * attractStrength;

            posAttr.setXYZ(i, currentPositions[i3], currentPositions[i3 + 1], currentPositions[i3 + 2]);
        }

        posAttr.needsUpdate = true;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[basePositions, 3]} />
            </bufferGeometry>
            <pointsMaterial
                color={new THREE.Color('#ff99ff')}
                size={0.02}
                sizeAttenuation
                transparent
                opacity={0.8}
            />
        </points>
    );
}
