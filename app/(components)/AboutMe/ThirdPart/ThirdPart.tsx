import { motion } from 'framer-motion'
import BinaryTunnelBackground from './BinaryTunnelBackground'

export default function ThirdPart() {
    return (
        <motion.div className="relative w-screen h-screen flex justify-center items-center mb-8 font-[synemono] text-[#D72631] text-[3em]" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ amount: .5 }}>
            <BinaryTunnelBackground />
            <div>
                <p>Et pourtant…</p>
                <p>Quelque chose m&apos;attirait.</p>
                <p>Pas le vide, mais la liberté cachée derrière la façade.</p>
            </div>
        </motion.div>
    )
}