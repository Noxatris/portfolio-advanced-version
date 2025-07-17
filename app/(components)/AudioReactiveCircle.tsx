import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const NUM_POINTS = 128
const RADIUS = 2.5
const SMOOTHING_HISTORY = 6 // nombre de frames à moyenner
const AMP_SENSITIVITY = 0.6
const ACTIVITY_THRESHOLD = 0.05 // seuil pour détecter activité audio

type Props = {
    analyserRef: React.RefObject<AnalyserNode | null>
    dataArrayRef: React.RefObject<Uint8Array | null>
}

export default function AudioSpectrumLineCircle({ analyserRef, dataArrayRef }: Props) {
    const lineRef = useRef<THREE.LineLoop>(null)
    const geometryRef = useRef(new THREE.BufferGeometry())
    const positions = new Float32Array(NUM_POINTS * 3)

    // Buffer de lissage : chaque point garde un historique d'amps
    const ampHistoryRef = useRef<number[][]>(
        Array.from({ length: NUM_POINTS }, () => Array(SMOOTHING_HISTORY).fill(0))
    )
    const ampIndexRef = useRef(0) // position actuelle dans le buffer circulaire

    // Initialisation cercle parfait
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

        const ANGULAR_OFFSET = Math.floor(NUM_POINTS / 4)
        const MAX_FREQ_INDEX = Math.floor(dataArray.length * 0.7)

        let ampSum = 0
        const averagedAmps: number[] = []

        // Mise à jour du buffer circulaire
        for (let i = 0; i < NUM_POINTS; i++) {
            const dataIndex = (i + ANGULAR_OFFSET) % NUM_POINTS
            const freqIndex = Math.floor((dataIndex / NUM_POINTS) * MAX_FREQ_INDEX)
            const ampRaw = dataArray[freqIndex] / 255

            const history = ampHistoryRef.current[i]
            history[ampIndexRef.current] = ampRaw

            // Moyenne glissante
            const avg = history.reduce((a, b) => a + b, 0) / SMOOTHING_HISTORY
            averagedAmps.push(avg)
            ampSum += avg
        }

        // Prochaine position dans le buffer circulaire
        ampIndexRef.current = (ampIndexRef.current + 1) % SMOOTHING_HISTORY
        const averageAmp = ampSum / NUM_POINTS

        // Construction des positions (sauf point 0 pour le moment)
        for (let i = 1; i < NUM_POINTS; i++) {
            const angle = (i / NUM_POINTS) * Math.PI * 2
            const amp = averagedAmps[i]

            const deform = AMP_SENSITIVITY * Math.pow(amp, 1.5)
            const r = RADIUS + deform

            pos.setXYZ(i, Math.cos(angle) * r, Math.sin(angle) * r, 0)
        }

        // POINT 0 — spécial : lissé avec le dernier et le suivant si musique active
        const angle0 = 0
        if (averageAmp > ACTIVITY_THRESHOLD) {
            const last = new THREE.Vector3(
                pos.getX(NUM_POINTS - 1),
                pos.getY(NUM_POINTS - 1),
                pos.getZ(NUM_POINTS - 1)
            )
            const next = new THREE.Vector3(
                pos.getX(1),
                pos.getY(1),
                pos.getZ(1)
            )
            const smoothed = new THREE.Vector3().lerpVectors(last, next, 0.5)
            pos.setXYZ(0, smoothed.x, smoothed.y, smoothed.z)
        } else {
            // Aucun son → cercle par défaut
            const amp = averagedAmps[0]
            const deform = AMP_SENSITIVITY * Math.pow(amp, 1.5)
            const r = RADIUS + deform
            pos.setXYZ(0, Math.cos(angle0) * r, Math.sin(angle0) * r, 0)
        }

        pos.needsUpdate = true
    })

    return (
        <lineLoop ref={lineRef} geometry={geometryRef.current} position={[0, 0, -6]}>
            <lineBasicMaterial attach="material" color={0xf154ff} linewidth={2} />
        </lineLoop>
    )
}
