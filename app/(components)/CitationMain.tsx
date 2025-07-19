import { motion } from 'framer-motion';

export default function CitationMain() {
    return (
        <motion.div className="max-w-4xl mx-auto text-center py-48" initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 1, once: true }}
            transition={{ duration: 1, delay: 0.5 }}>
            <blockquote className="text-2xl md:text-3xl italic font-light text-[#D72631] leading-relaxed">
                “L&apos;imagination est le commencement de la création.<br />
                On imagine ce qu&apos;on désire, on veut ce qu&apos;on imagine,<br />
                et enfin, on crée ce que l&apos;on veut.”
            </blockquote>
            <p className="mt-4 text-sm text-gray-400">— William Shakespeare</p>
        </motion.div>
    )
}