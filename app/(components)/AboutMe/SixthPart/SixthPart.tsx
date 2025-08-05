import { motion } from 'framer-motion'

export default function SixthPart() {
    return (
        <motion.div className="w-screen h-screen flex justify-center items-center relative mb-8 font-[synemono] text-[#D72631] text-[3em]" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ amount: .5 }}>
            <div>
                <p>J&apos;étais au sommet.</p>
                <p>Et de là-haut, j&apos;ai aperçu un nouvel horizon.</p>
                <p>Un univers encore plus vaste, plus libre.</p>
                <p>Où l&apos;imagination règne,</p>
                <p>où l&apos;unicité est maîtresse.</p>
            </div>
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
                    src="/bgDarkLandscape.png"
                    alt="Accès autorisé"
                    className="absolute inset-0 w-full h-full object-cover -z-40 pointer-events-none"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1}}
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
        </motion.div>
    )
}