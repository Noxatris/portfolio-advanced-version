import { motion } from 'framer-motion'
import FloatingWhispersBackground from './FloatingWhispersBackground'

export default function SeventhPart() {
    return (
        <motion.div className="w-screen h-screen flex justify-center items-center relative mb-8 font-[synemono] text-[#D72631] text-[3em]" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ amount: .5 }}>
            <FloatingWhispersBackground />
            <div>
                <p>Un univers qui <span className='text-violet-800'>murmure</span> une histoire</p>
                <p>à ceux qui prennent le temps de l&apos;écouter.</p>
            </div>
        </motion.div>
    )
}