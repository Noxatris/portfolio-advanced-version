import { motion } from 'framer-motion'
export default function AboutMe() {

    return (
        <section className="text-white px-8 pt-20">
            <motion.div className="max-w-4xl mx-auto text-center py-48" initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 1, once: true }}
                transition={{ duration: 1, delay: 0.5 }}>
                <blockquote className="text-2xl md:text-3xl italic font-light text-[#D72631] leading-relaxed">
                    “L'imagination est le commencement de la création.<br />
                    On imagine ce qu'on désire, on veut ce qu'on imagine,<br />
                    et enfin, on crée ce que l'on veut.”
                </blockquote>
                <p className="mt-4 text-sm text-gray-400">— William Shakespeare</p>
            </motion.div>

            <motion.section
                className="relative w-full h-[100vh] overflow-hidden perspective-1000"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >

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

                {/* Portail animé */}
                <motion.div
                    className="absolute top-1/2 left-1/2 w-[200px] h-[200px] rounded-full border-[6px] border-red-500 bg-red-700/20 blur-xl"
                    style={{ translateX: "-50%", translateY: "-50%" }}
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.05, 1],
                        boxShadow: [
                            "0 0 20px rgba(255, 0, 0, 0.6)",
                            "0 0 30px rgba(255, 0, 0, 0.8)",
                            "0 0 20px rgba(255, 0, 0, 0.6)"
                        ]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
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