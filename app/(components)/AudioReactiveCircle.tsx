'use client'

import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const NUM_POINTS = 128
const RADIUS = 1.2

export default function AudioSpectrumLineCircle() {
    const lineRef = useRef<THREE.LineLoop>(null)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const analyserRef = useRef<AnalyserNode | null>(null)
    const dataArrayRef = useRef<Uint8Array | null>(null)

    const geometryRef = useRef(new THREE.BufferGeometry())
    const positions = new Float32Array(NUM_POINTS * 3)

    useEffect(() => {
        // Initialisation audio
        const audio = new Audio('/Special_Spotlight.mp3')
        audio.crossOrigin = 'anonymous'
        audio.loop = true
        audioRef.current = audio

        const audioCtx = new AudioContext()
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
    }, [])

    // Initial setup des positions (cercle parfait)
    for (let i = 0; i < NUM_POINTS; i++) {
        const angle = (i / NUM_POINTS) * Math.PI * 2
        positions[i * 3] = Math.cos(angle) * RADIUS
        positions[i * 3 + 1] = Math.sin(angle) * RADIUS
        positions[i * 3 + 2] = 0
    }
    geometryRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    useFrame(() => {
        const analyser = analyserRef.current
        const dataArray = dataArrayRef.current
        const geo = geometryRef.current
        if (!analyser || !dataArray || !geo) return

        analyser.getByteFrequencyData(dataArray)
        const pos = geo.attributes.position as THREE.BufferAttribute

        for (let i = 0; i < NUM_POINTS; i++) {
            const angle = (i / NUM_POINTS) * Math.PI * 2
            const freqIndex = Math.floor((i / NUM_POINTS) * dataArray.length)
            const amp = dataArray[freqIndex] / 255
            const deform = 0.6 * Math.pow(amp, 1.5) // intensité de déformation

            const r = RADIUS + deform

            pos.setXYZ(i, Math.cos(angle) * r, Math.sin(angle) * r, 0)
        }

        pos.needsUpdate = true
    })

    return (
        <lineLoop ref={lineRef} geometry={geometryRef.current}>
            <lineBasicMaterial attach="material" color={0xf154ff} linewidth={2} />
        </lineLoop>
    )
}
