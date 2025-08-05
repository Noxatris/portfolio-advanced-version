"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type WordData = {
    id: string;
    word: string;
    style: React.CSSProperties;
};

const wordList = [
    "rêve", "création", "histoire", "mémoire", "liberté",
    "avenir", "dépacemment", "progression", "immersion", "limite",
    "voyage", "souvenir", "partage"
];

const getRandomPosition = (): React.CSSProperties => ({
    top: `${Math.random() * 95}%`,
    left: `${Math.random() * 95}%`,
    fontSize: `${Math.random() * 0.4 + 1.5}rem`,
    opacity: Math.random() * 0.3 + 0.2,
    transform: `rotate(${Math.random() * 10 - 5}deg)`,
    filter: `blur(${Math.random() * 1.2 + 0.4}px)`
});

const FloatingWhispersBackground = ({ density = 18 }: { density?: number }) => {
    const [words, setWords] = useState<WordData[]>([]);

    useEffect(() => {
        const generateWords = () => {
            const newWords: WordData[] = Array.from({ length: density }).map((_, i) => ({
                id: `${i}-${Math.random()}`,
                word: wordList[Math.floor(Math.random() * wordList.length)],
                style: getRandomPosition()
            }));
            setWords(newWords);
        };

        generateWords();
        const interval = setInterval(generateWords, 3500);
        return () => clearInterval(interval);
    }, [density]);

    return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            <AnimatePresence>
                {words.map(({ id, word, style }) => (
                    <motion.span
                        key={id}
                        className="absolute text-purple-800/80 font-mono select-none"
                        style={style}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: style.opacity ?? 0.5, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 2.5, ease: "easeOut" }}
                    >
                        {word}
                    </motion.span>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default FloatingWhispersBackground;
