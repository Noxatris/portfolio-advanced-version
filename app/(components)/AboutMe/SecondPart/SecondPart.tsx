"use client";
import React from "react"
import CodeBackground from "./CodeBackground"
import { useEffect, useState } from "react";
import { motion } from 'framer-motion'

const originalLines = [
    "Algorithmes, logique, structure —",
    "l’antipode de l’imaginaire.",
    "Plus de hasard.",
    "Plus de surprise.",
    "Des zéros, des uns.",
    "Un monde figé, esclave de sa propre rigueur.",
    "Un monde qui, en apparence, ne racontait rien.",
];

function toBinarySnippet(text: string, maxBits: number = 60) {
    const binary = text
        .split("")
        .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"));

    return binary.slice(0, maxBits).join(" ") + " ...";
}

function transformWordsRich(line: string, toBinaryForm: boolean): React.JSX.Element[] {
    const parts = line.split(/(zéros|uns)/gi); // Capture les mots cibles
    return parts.map((part, index) => {
        if (/^zéros$/i.test(part)) {
            return (
                <span key={index} className={toBinaryForm ? "text-green-400" : ""}>
                    {toBinaryForm ? "0" : "zéros"}
                </span>
            );
        }
        if (/^uns$/i.test(part)) {
            return (
                <span key={index} className={toBinaryForm ? "text-green-400" : ""}>
                    {toBinaryForm ? "1" : "uns"}
                </span>
            );
        }
        return <span key={index}>{part}</span>;
    });
}



export default function SecondPart() {
    const [glitched, setGlitched] = useState(false);
    const [binaryForm, setBinaryForm] = useState(false);
    let scrollTimeout: NodeJS.Timeout;

    useEffect(() => {
        const toggleBinaryWords = setInterval(() => {
            setBinaryForm((prev) => !prev);
        }, 1500); // toutes les 3 secondes

        return () => clearInterval(toggleBinaryWords);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setGlitched(true);
            clearTimeout(scrollTimeout);

            scrollTimeout = setTimeout(() => {
                setGlitched(false);
            }, 400); // délai sans scroll avant retour au texte normal
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.div className="w-screen flex justify-center items-center h-screen mb-8 mt-48 font-[synemono] text-[#D72631] text-[3em] relative overflow-hidden" initial={{opacity: 0, y: 200}} whileInView={{opacity: 1, y: 0}} transition={{duration: 1}} viewport={{amount: .2}}>
            <CodeBackground />
            <div className="w-[70%] mx-auto">
                {originalLines.map((line, i) => {
                    const displayText = glitched
                        ? toBinarySnippet(line)
                        : transformWordsRich(line, binaryForm);

                    return (
                        <p
                            key={i}
                            className={`transition duration-200 ease-in-out whitespace-nowrap overflow-hidden text-ellipsis ${glitched ? "text-green-400 blur-[0.5px] scale-[1.01]" : ""
                                }`}
                        >
                            {displayText}
                        </p>
                    );
                })}
            </div>
        </motion.div>
    )
}