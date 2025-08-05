// app/page.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const FloodScreenEnhanced = () => {
    const [showWords, setShowWords] = useState(true);
    const [isCyanFlood, setIsCyanFlood] = useState(false);

    useEffect(() => {
        // Durée de l'animation des mots
        const wordsAnimationDuration = 6000; // Augmenté pour un effet plus lent
        // Délai avant que le fond cyan ne commence à apparaître
        const cyanFadeInDelay = wordsAnimationDuration - 2000;

        const wordsTimer = setTimeout(() => {
            setShowWords(false); // Cache les mots
        }, wordsAnimationDuration);

        const cyanTimer = setTimeout(() => {
            setIsCyanFlood(true); // Déclenche l'affichage du fond cyan
        }, cyanFadeInDelay);

        return () => {
            clearTimeout(wordsTimer);
            clearTimeout(cyanTimer);
        };
    }, []);

    const words = [
        {
            id: 1,
            initialX: -10, // Légèrement décalé à gauche
            initialY: -10, // Légèrement décalé vers le haut
            initialRotate: -5, // Légère rotation
            delay: 0,
        },
        {
            id: 2,
            initialX: 10, // Légèrement décalé à droite
            initialY: 50, // Légèrement décalé vers le bas
            initialRotate: 5, // Légère rotation opposée
            delay: 0.5, // Apparaît un peu après le premier
        },
        {
            id: 3,
            initialX: 0, // Au centre
            initialY: 0, // Au centre
            initialRotate: 0,
            delay: 1, // Apparaît encore un peu après
        },
    ];

    return (
        <motion.div className="absolute flex items-center justify-center min-h-screen w-screen" initial={{opacity: 0}} whileInView={{opacity: 1}}>
            <AnimatePresence>
                {showWords && (
                    <>
                        {words.map((word) => (
                            <motion.div
                                key={word.id}
                                initial={{
                                    opacity: 1,
                                    scale: 0.1,
                                    x: `${word.initialX}vw`,
                                    y: `${word.initialY}vh`,
                                    rotate: word.initialRotate,
                                }}
                                whileInView={{
                                    opacity: [1, 1, 0], // Reste opaque, puis devient transparent à la fin
                                    scale: 800, // Encore plus grand pour un remplissage garanti
                                    transition: {
                                        duration: 7, // Durée d'animation plus longue pour un effet ralenti
                                        delay: word.delay,
                                        ease: 'easeOut',
                                        opacity: { duration: 1, delay: 5 }, // L'opacité diminue sur 1s, à partir de 5s
                                    },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.5 },
                                }}
                                className="absolute text-cyan-400 font-black whitespace-nowrap text-center"
                                style={{ fontSize: '1vw' }} // Taille de base très petite
                            >
                                Créer
                            </motion.div>
                        ))}
                    </>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isCyanFlood && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                        className="absolute inset-0 bg-cyan-400 z-10"
                    ></motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default FloodScreenEnhanced;