'use client'

import { motion } from 'framer-motion'

export default function AssemblingChunks() {
    const chunks = [
        { text: 'As', x: 120, y: -60 },
        { text: 'se', x: 60, y: -40 },
        { text: 'mbl', x: -75, y: 100 },
        { text: 'er', x: 80, y: 120 },
    ]

    return (
        <div className="relative h-[100px] text-4xl font-bold flex items-center justify-center">
            {chunks.map((chunk, i) => (
                <motion.div
                    key={i}
                    initial={{ x: chunk.x, y: chunk.y, opacity: 0, rotate: -20 }}
                    animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                    transition={{
                        delay: i * 0.3 + 3,
                        type: 'spring',
                        stiffness: 250,
                        damping: 20,
                    }}
                    className=""
                >
                    {chunk.text}
                </motion.div>
            ))}
        </div>
    )
}
