import { useEffect, useRef, useState } from 'react'

export function useAudioAnalyser(src: string, initialMuted = true) {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const analyserRef = useRef<AnalyserNode | null>(null)
    const dataArrayRef = useRef<Uint8Array | null>(null)
    const audioCtxRef = useRef<AudioContext | null>(null)
    const [isMuted, setIsMuted] = useState(initialMuted)

    useEffect(() => {
        const audio = new Audio(src)
        audio.crossOrigin = 'anonymous'
        audio.loop = true
        audio.muted = initialMuted
        audioRef.current = audio

        const audioCtx = new AudioContext()
        audioCtxRef.current = audioCtx
        const source = audioCtx.createMediaElementSource(audio)
        const analyser = audioCtx.createAnalyser()
        analyser.fftSize = 256

        source.connect(analyser)
        analyser.connect(audioCtx.destination)

        dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount)
        analyserRef.current = analyser

        audio.play()
        audioCtx.resume()

        return () => {
            audio.pause()
            audioCtx.close()
        }
    }, [src, initialMuted])

    const toggleMute = () => {
        const audio = audioRef.current
        if (!audio) return
        audio.muted = !audio.muted
        setIsMuted(audio.muted)
        if (!audio.muted) {
            audio.play()
            audioCtxRef.current?.resume()
        }
    }

    return { analyserRef, dataArrayRef, isMuted, toggleMute }
}
