'use client'

import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

import CustomCursor from './(components)/customCursor'
import AnimatedStrands from './(components)/AnimatedStrands'
import CitationMain from './(components)/CitationMain'
import AboutMe from './(components)/AboutMe'
import ProjectNav from './(components)/ProjectNav'
import PortalNav from './(components)/PortalNav'
import Technologie from './(components)/Technologie'

import { useAudioAnalyser } from './hooks/useAudioAnalyser'
import { Volume2, VolumeX } from 'lucide-react'


const Logo3D = dynamic(() => import('./(components)/logo3D'), { ssr: false })
const ParticleOrbitalRing = dynamic(() => import('./(components)/particleOrbitalRing'), { ssr: false })
const AudioSpectrumLineCircle = dynamic(() => import('./(components)/AudioReactiveCircle'), { ssr: false })
const WaterPlane = dynamic(() => import('./(components)/WaterPlane'), { ssr: false })

export default function Home() {
  const { analyserRef, dataArrayRef, isMuted, toggleMute } = useAudioAnalyser('/Special_Spotlight.mp3', true)

  return (
    <>
      {/* SECTION 1 — Canvas avec effet */}
      <section className="relative w-screen h-[100vh] bg-black cursor-none overflow-hidden">
        <CustomCursor />

        {/* Bouton mute/demute */}
        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          className="fixed bottom-6 right-6 z-50 bg-black/70 p-3 rounded-full border border-white hover:bg-white/10 transition cursor-pointer"
        >
          {isMuted ? <VolumeX color="white" size={24} /> : <Volume2 color="white" size={24} />}
        </button>

        {/* Canvas avec effet bloom */}
        <Canvas camera={{ position: [0, 0, 6] }}>
          <ambientLight intensity={0.3} />
          <Suspense fallback={null}>
            <Logo3D />
            <ParticleOrbitalRing />
            <AudioSpectrumLineCircle analyserRef={analyserRef} dataArrayRef={dataArrayRef} />
            <WaterPlane />
            <EffectComposer>
              <Bloom intensity={2} luminanceThreshold={0} luminanceSmoothing={0.9} mipmapBlur />
            </EffectComposer>
          </Suspense>
        </Canvas>

        {/* Fade-out vers le bas (fondu noir) */}
        <div
          className="absolute bottom-0 left-0 w-full h-32 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))',
            mixBlendMode: 'multiply',
          }}
        />
      </section>

      {/* ABOUT ME */}
      <section className="relative min-h-screen w-screen bg-black text-white z-10 pt-20">
        <AnimatedStrands />
        <CitationMain />
        <AboutMe />
      </section>

      {/* PROJET */}
      <section className="relative min-h-screen w-screen bg-black text-white z-10">

        <ProjectNav />
      </section>

      {/* TECHNOLOGIE */}
      <section className="relative min-h-screen w-screen bg-black text-white z-10">
          <Technologie />
      </section>

      {/* SERVICES */}
      <section className="relative min-h-screen w-screen bg-gradient-to-tr from-black to-[#0f1a2b] text-white z-10">

      </section>

      {/* CONTACT */}
      <section className="relative min-h-screen w-screen bg-black text-white z-10">

      </section>
    </>
  )
}