'use client';

import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import CustomCursor from './(components)/customCursor';
import HeaderNav from './(components)/HeaderNav';

const Logo3D = dynamic(() => import('./(components)/logo3D'), { ssr: false });
const ParticleOrbitalRing = dynamic(() => import('./(components)/particleOrbitalRing'), { ssr: false });
const AudioReactiveCircle = dynamic(() => import('./(components)/AudioReactiveCircle'), { ssr: false });

export default function Home() {
  return (
    <div className="w-screen h-screen bg-black cursor-none">
      <HeaderNav />
      <CustomCursor />
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={0.3} />
        <Suspense fallback={null}>
          <Logo3D />
          <ParticleOrbitalRing />
          <AudioReactiveCircle />
          <EffectComposer>
            <Bloom
              intensity={2}
              luminanceThreshold={0}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
