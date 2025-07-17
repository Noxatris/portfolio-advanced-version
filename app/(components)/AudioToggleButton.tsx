'use client'

import { useState, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export default function AudioToggleButton() {
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    // Synchronise l'état local avec l'objet audio (si besoin)
    const audio = document.getElementById('music-audio') as HTMLAudioElement | null
    if (audio) setIsMuted(audio.muted)
  }, [])

  const toggleMute = () => {
    const audio = document.getElementById('music-audio') as HTMLAudioElement | null
    if (!audio) return
    audio.muted = !audio.muted
    setIsMuted(audio.muted)
  }

  return (
    <div
      onClick={toggleMute}
      className="fixed bottom-4 right-4 z-50 bg-black/70 p-2 rounded-full border border-white hover:bg-white/10 transition cursor-pointer"
    >
      {isMuted ? <VolumeX color="white" size={24} /> : <Volume2 color="white" size={24} />}
    </div>
  )
}
