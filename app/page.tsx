'use client'

import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import CustomCursor from './(components)/customCursor'
import HeaderNav from './(components)/HeaderNav'
import { useAudioAnalyser } from './hooks/useAudioAnalyser' // chemin à adapter
import { Volume2, VolumeX } from 'lucide-react'

const Logo3D = dynamic(() => import('./(components)/logo3D'), { ssr: false })
const ParticleOrbitalRing = dynamic(() => import('./(components)/particleOrbitalRing'), { ssr: false })
const AudioSpectrumLineCircle = dynamic(() => import('./(components)/AudioReactiveCircle'), { ssr: false })

export default function Home() {
  const { analyserRef, dataArrayRef, isMuted, toggleMute } = useAudioAnalyser('/Special_Spotlight.mp3', true)

  return (
    <div className="w-screen h-screen bg-black cursor-none relative">
      <HeaderNav />
      <CustomCursor />

      {/* Bouton mute/demute overlay */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
        className="fixed bottom-6 right-6 z-50 bg-black/70 p-3 rounded-full border border-white hover:bg-white/10 transition cursor-pointer"
      >
        {isMuted ? <VolumeX color="white" size={24} /> : <Volume2 color="white" size={24} />}
      </button>

      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={0.3} />
        <Suspense fallback={null}>
          <Logo3D />
          <ParticleOrbitalRing />
          <AudioSpectrumLineCircle analyserRef={analyserRef} dataArrayRef={dataArrayRef} />
          <EffectComposer>
            <Bloom intensity={2} luminanceThreshold={0} luminanceSmoothing={0.9} mipmapBlur />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  )
}