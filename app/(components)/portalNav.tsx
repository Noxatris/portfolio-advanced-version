import { motion, easeOut, useInView, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

const runeVariants = {
    initial: {
        opacity: 0,
        scale: 0,
        x: 0,
        y: 0
    },
    animate: (i: number) => ({
        opacity: 1,
        scale: 1,
        x: 200 * Math.cos((i / 5) * 2 * Math.PI),
        y: 200 * Math.sin((i / 5) * 2 * Math.PI),
        transition: {
            delay: i * 0.2 + 0.5,
            duration: 1.2,
            ease: easeOut
        }
    }),
    placed: (i: number) => ({
        x: 520,
        y: i * 60,
        scale: 1,
        rotate: 0,
        transition: {
            delay: 1.8 + i * 0.1,
            duration: 0.8,
            ease: easeOut
        }
    })
}
export default function AboutMe() {
    const portalRef = useRef(null);
    const isInView = useInView(portalRef, { once: true, amount: 0.8 }); // 80% visible
    const [menuVisible, setMenuVisible] = useState(false);
    const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

    const destinations = [
        { label: "Présentation", rune: "ᚠ", image: "/placeholder1.png" },
        { label: "Projets", rune: "ᚢ", image: "/placeholder2.png" },
        { label: "Technologies", rune: "ᚦ", image: "/placeholder3.png" },
        { label: "Services", rune: "ᚨ", image: "/placeholder4.png" },
        { label: "Contact", rune: "ᛃ", image: "/placeholder5.png" },
    ];

    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => {
                setMenuVisible(true);
            }, 3000); // délai après début d'animation des runes
            return () => clearTimeout(timer);
        }
    }, [isInView]);

    return (
        <section className="text-white pt-20">
            <motion.section
                ref={portalRef}
                className="relative w-full h-[100vh] overflow-hidden perspective-1000 mt-48"
                initial={{ opacity: 0, y: 100 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            >
                <AnimatePresence mode="wait">
                    {hoveredLabel && (
                        <motion.img
                            key={hoveredLabel}
                            src={
                                destinations.find((d) => d.label === hoveredLabel)?.image || ""
                            }
                            alt="image de destination"
                            className="absolute w-[600px] h-[600px] object-cover top-[55%] left-[50%] -z-5"
                            style={{ translateX: "-50%", translateY: "-50%" }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                        />
                    )}
                </AnimatePresence>

                {/* Image animée derrière le portail */}
                <motion.div
                    className="absolute w-[600px] h-[600px]"
                    style={{
                        backgroundImage: 'url(/portailZone.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        top: '27%',
                        left: '35%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: -10,
                    }}
                    animate={{
                        rotate: [0, 360],
                        x: [0, 2, -2, 0], // décalage gauche-droite
                        y: [0, 1, -1, 0], // décalage haut-bas
                    }}
                    transition={{
                        rotate: {
                            duration: 40,
                            repeat: Infinity,
                            ease: "linear"
                        },
                        x: {
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        },
                        y: {
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                />

                {/* Background image avec dégradé fondu */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: 'url(/bgPortal.webp)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%)',
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%)',
                    }}
                />


                {/* Fireflies (tu peux en faire plusieurs comme ça) */}
                <div className="pointer-events-none z-10">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-[4px] h-[4px] bg-yellow-500 rounded-full opacity-80 animate-firefly"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                            }}
                        />
                    ))}
                </div>

                <motion.div className="absolute top-1/2 left-1/2 z-30"
                    style={{ translateX: "-50%", translateY: `-${(destinations.length - 1) * 30}px` }}
                >
                    {destinations.map(({ label, rune }, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            initial="initial"
                            animate={isInView ? ["animate", "placed"] : "initial"}
                            variants={runeVariants}
                            className="absolute flex items-center gap-4"
                        >
                            <span className="text-4xl font-[rune] text-neon-animated leading-none">
                                {rune}
                            </span>

                            {menuVisible && (
                                <motion.button
                                    onMouseEnter={() => setHoveredLabel(label)}
                                    onMouseLeave={() => setHoveredLabel(null)}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-2xl text-neon-animated hover:scale-105 transition"
                                >
                                    {label}
                                </motion.button>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </motion.section>
        </section>
    )
}


/*
    <FairySvg />
    <motion.div initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} transition={{delay: 2.2, duration: 2}} className='border-t-4 border-[#D72631] mb-4 self-start origin-right w-[84.7%]'></motion.div>
    <div>
        <motion.div initial={{ opacity: 0, translateY: -50 }} whileInView={{ opacity: 1, translateY: 0 }} transition={{ duration: 1, delay: 4.2 }}>
            <p className='text-4xl md:text-6xl font-bold text-[#D72631] mt-4'>
                Bienvenue
            </p>
        </motion.div>
    </div>
*/