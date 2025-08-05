'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function FlipCard() {
    const [flipped, setFlipped] = useState(false)

    return (
        <motion.div
            className="w-[25%] h-[90%] m-8 cursor-pointer perspective-[1000px] mr-24"
            onClick={() => setFlipped(!flipped)}
            onMouseEnter={() => window.innerWidth > 768 && setFlipped(true)}
            onMouseLeave={() => window.innerWidth > 768 && setFlipped(false)}
            initial={{x: 800}}
            animate={{x: 0}}
            transition={{duration: 1, delay: 1.5}}
        >
            <div
                className="relative w-full h-full transition-transform duration-700"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: flipped
                        ? 'rotateY(168deg) rotateX(-2deg)'
                        : 'rotateY(-12deg) rotateX(2deg)', // inclination par défaut
                }}
            >

                {/* Front */}
                <div
                    className="absolute flex flex-col w-full h-full rounded-xl bg-zinc-800/40 border-2 border-red-900 text-white p-4 shadow-xl"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <h2 className="text-xl font-bold">Adrien V.</h2>
                    <p className="text-sm text-zinc-400 mt-2">Écrivain de l&apos;ombre</p>
                    <p className="text-xs mt-6">Clique ou survole pour voir plus...</p>
                </div>

                {/* Back */}
                <div
                    className="absolute w-full h-full rounded-xl bg-zinc-900 text-white p-4 shadow-xl"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                    }}
                >
                    <p className="text-sm italic">« Ce n&apos;est pas la haine qui le consume…</p>
                    <p className="text-sm italic">C&apos;est tout ce qui pourrait rester. »</p>
                    <p className="text-xs mt-4 text-zinc-400">Personnage : Adrien</p>
                </div>
            </div>
        </motion.div>
    )
}

