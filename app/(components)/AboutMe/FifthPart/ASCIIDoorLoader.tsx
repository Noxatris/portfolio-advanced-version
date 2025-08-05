"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const asciiDoorLeft = [
    "╔══════════",
    "║ ▓▓▓▓  ACC",
    "║ ▓▓▓▓ INTE",
    "║ ░░░░░░░░░",
    "║ [ SYSTEM ",
    "║ ▓▓▓▓▓▓▓▓▓",
    "║    CODE: ",
    "╚══════════"
];

const asciiDoorRight = [
    "═══════════╗",
    "ÈS   ▓▓▓▓  ║",
    "RDIT ▓▓▓▓  ║",
    "░░░░░░░░░  ║",
    "LOCKED ]   ║",
    "▓▓▓▓▓▓▓▓▓  ║",
    "IMAGINARY  ║",
    "═══════════╝"
];

const asciiDoorOpened = [
    "╔══════════════════════╗",
    "║                      ║",
    "║ ███  ACCÈS AUTORISÉ  ║",
    "║ ███    OUVERTURE     ║",
    "║  ░░░░░░░░░░░░░░░░░░  ║",
    "║                      ║",
    "║  [ ACCESS GRANTED ]  ║",
    "║                      ║",
    "╚══════════════════════╝"
];

export default function ASCIIDoorLoader() {
    const [progress, setProgress] = useState(0);
    const [unlocked, setUnlocked] = useState(false);
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [showImage, setShowImage] = useState(false);

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        if (progress < 100) {
            const interval = setInterval(() => {
                setProgress((prev) => Math.min(prev + 1, 100));
            }, 30);
            return () => clearInterval(interval);
        } else {
            setUnlocked(true);
            setTimeout(() => {
                setOpen(true);
                setTimeout(() => {
                    setVisible(false);
                    setShowImage(true);
                }, 3000);
            }, 800);
        }
    }, [progress, isInView]);

    return (
        <div ref={ref}>
            {visible && (
                <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
                    <AnimatePresence>
                        {!open && (
                            <motion.div
                                key="door"
                                className="text-[12px] sm:text-[14px] md:text-[16px] leading-4 sm:leading-5 md:leading-6 font-mono text-center backdrop-blur-md bg-black/80 p-4 rounded-lg border shadow-[0_0_30px] flex flex-col items-center"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{
                                    color: unlocked ? "#22c55e" : "#ef4444",
                                    boxShadow: unlocked
                                        ? "0 0 30px #22c55e88"
                                        : "0 0 30px #ef444488",
                                    borderColor: unlocked ? "#22c55e" : "#ef4444",
                                }}
                            >
                                <div className="flex">
                                    <pre className="text-left">{asciiDoorLeft.join("\n")}</pre>
                                    <pre className="text-left">{asciiDoorRight.join("\n")}</pre>
                                </div>
                                <p className="mt-2">Chargement... {progress}%</p>
                            </motion.div>
                        )}

                        {open && (
                            <motion.div
                                key="open"
                                className="absolute inset-0 flex items-center justify-center text-green-400 font-mono text-center text-[12px] sm:text-[14px] md:text-[16px]"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <motion.div
                                    className="flex gap-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <motion.pre
                                        initial={{ x: 0 }}
                                        animate={{ x: "-150%", opacity: 0 }}
                                        transition={{ duration: 1.2 }}
                                    >
                                        {asciiDoorLeft.join("\n")}
                                    </motion.pre>
                                    <motion.pre
                                        initial={{ x: 0 }}
                                        animate={{ x: "150%", opacity: 0 }}
                                        transition={{ duration: 1.2 }}
                                    >
                                        {asciiDoorRight.join("\n")}
                                    </motion.pre>
                                </motion.div>

                                <motion.pre
                                    className="absolute"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    {asciiDoorOpened.join("\n")}
                                </motion.pre>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {showImage && (
                <>
                    {/* Dégradé haut */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-48 bg-gradient-to-t from-transparent to-black z-50 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                    />

                    {/* Image animée */}
                    <motion.img
                        src="/BgNewWays.webp"
                        alt="Accès autorisé"
                        className="absolute inset-0 w-full h-full object-cover -z-40 pointer-events-none"
                        initial={{ opacity: 0, scale: 1.1 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.8, ease: "easeOut" }}
                    />

                    {/* Dégradé bas */}
                    <motion.div
                        className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-b from-transparent to-black z-50 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                    />
                </>
            )}
        </div>
    );
}
