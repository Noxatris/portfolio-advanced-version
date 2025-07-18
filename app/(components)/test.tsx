'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function BrainBackground() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <div
            ref={ref}
            className="relative w-screen h-[100vh] flex items-center justify-center overflow-hidden bg-black"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                    isInView
                        ? {
                            opacity: [0.3, 0.35, 0.3], // pulsation entre 30% et 35%
                            scale: [1, 1.02, 1],
                        }
                        : {}
                }
                transition={
                    isInView
                        ? {
                            duration: 4,
                            repeat: Infinity,
                            repeatType: 'loop',
                            ease: 'easeInOut',
                        }
                        : {}
                }
                className="absolute inset-0 bg-center bg-no-repeat bg-contain pointer-events-none w-[40%] mx-auto"
                style={{
                    backgroundImage: 'url("/brain_depth.svg")',
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), transparent)',
                }}
            />
            <div>
                <video src="/videoPresentation"></video>
            </div>
        </div>
    )
}
