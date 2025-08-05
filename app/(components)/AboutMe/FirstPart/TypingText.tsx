'use client'

import { motion } from 'framer-motion'

type Props = {
    text: string
}

const typingVariant = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
        opacity: 1,
        transition: {
            delay: i * 0.08 + 2,
        },
    }),
}

export default function TypingText({ text }: Props) {
    return (
        <div className="flex">
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={typingVariant}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </div>
    )
}