'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function AnimatedStrands({
    count = 15,
}: {
    count?: number
}) {
    const [strands, setStrands] = useState<
        { id: number; x: number; height: number; delay: number }[]
    >([])

    useEffect(() => {
        const newStrands = Array.from({ length: count }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // position horizontale en %
            height: 50 + Math.random() * 800, // hauteur entre 50 et 250px
            delay: Math.random() * 2, // décalage de l’animation
        }))
        setStrands(newStrands)
    }, [count])

    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-30">
            {strands.map(({ id, x, height, delay }) => (
                <motion.div
                    key={id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: [0, 0.6, 0], height }}
                    transition={{
                        duration: 3,
                        delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute w-px bg-gradient-to-b from-[#ff1e56] to-[#7e003a]"
                    style={{
                        left: `${x}%`,
                    }}
                />
            ))}
        </div>
    )
}
