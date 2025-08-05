"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function HoverShrink({ word }: { word: string }) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            className="relative w-[13vw] h-[13vw] flex justify-center items-center cursor-pointer group"
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
        >
            {/* Fond animé */}
            <motion.div
                className="absolute w-full h-full rounded-2xl bg-gradient-to-br from-red-700 via-red-900 to-black shadow-[0_0_20px_#ff000088] -z-10"
                animate={{ scale: hovered ? 0.2 : 1 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
            />

            {/* Texte avec animation de couleur */}
            <motion.p
                className="font-bold text-center text-[2.8vw] md:text-[2.4vw] xl:text-[2vw] select-none"
                animate={{
                    color: hovered ? "#ef4444" : "#ffffff",
                    textShadow: hovered
                        ? "0 0 10px #ef4444, 0 0 20px #ef4444aa"
                        : "none",
                }}
                transition={{ duration: 0.3 }}
            >
                {word}
            </motion.p>
        </motion.div>
    );
}
