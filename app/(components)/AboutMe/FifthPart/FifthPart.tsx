import { motion } from 'framer-motion'
import ASCIIDoorLoader from './ASCIIDoorLoader'
export default function FifthPart() {
    return (
        <motion.div className="w-screen h-screen flex justify-center items-center relative mb-8 font-[synemono] text-[#D72631] text-[3em]" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ amount: .5 }}>
            <ASCIIDoorLoader />
            <motion.div initial={{opacity: 0, y: 50}} whileInView={{opacity: 1, y: 0}} transition={{duration: 1, delay: 9}} viewport={{once: true}}>
                <p>Je l&apos;avais atteint.</p>
                <p>Le niveau qui m&apos;offrait enfin la liberté.</p>
                <p>Celle de raconter, sans aucune limite.</p>
            </motion.div>
        </motion.div>
    )
}