"use client";

import { motion } from "framer-motion";
import WordCube from "./WordCube"

export default function HeroSection() {
    return (
        <motion.div className="w-screen items-center h-[80vh] flex relative mb-8 font-[synemono] text-[#D72631] text-[3em]" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ amount: .5 }}>

            <motion.div
                className="absolute -z-10 w-full h-full bg-red-950/20"
                style={{
                    WebkitMaskImage:
                        'linear-gradient(to bottom, transparent, white 40%, white 60%, transparent)',
                    maskImage:
                        'linear-gradient(to bottom, transparent, white 40%, white 60%, transparent)'
                }}
                initial={{ x: '99%' }}
                whileInView={{ x: '0%' }}
                transition={{ duration: 2, delay: 0.5 }}
            />


            {/* Contenu principal */}
            <div className="w-full h-full relative z-10 flex flex-col justify-around px-16">
                <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 1, }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    Au départ, il y avait un homme.
                </motion.p>

                <motion.div
                    className="flex flex-col xl:flex-row justify-between items-center w-[80%] self-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 1 }}
                    transition={{ duration: 1, delay: 0.7 }}
                >
                    <WordCube word="Écrire" />
                    <WordCube word="Dessiner" />
                    <WordCube word="Assembler" />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 1, }}
                    transition={{ duration: 1, delay: .7 }}
                >
                    Derrière tout cela, un but : raconter, voyager.
                </motion.p>
            </div>

        </motion.div>
    );
}


/*

                                Image + halo (clignotement régulier)
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-screen h-screen pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}

            >
                <div
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                        background: "radial-gradient(circle at center, rgba(94,11,11,0.15) 0%, rgba(0,0,0,0) 70%)",
                        filter: "blur(100px)",
                    }}
                />
                                Fond rouge diffus
                <div className="absolute inset-0 bg-[#5e0b0b] blur-[160px] opacity-20" />

                                Cercle d'ombre au centre
                <div className="absolute top-1/2 left-1/2 w-[50vw] h-[75vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black opacity-60 blur-[80px]" />

                                Image centrale animée en pulsation
                <div className="relative top-1/2 left-1/2 w-[50vw] h-[75vh] -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden shadow-2xl z-10">
                    <motion.img
                        src="/BgBackMan.png"
                        alt="Illustration centrale"
                        className="w-full h-full object-contain"
                        initial={{ opacity: 0.05 }}
                        animate={{ opacity: [0.05, 0.2, 0.05] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </div>
            </motion.div>







*/