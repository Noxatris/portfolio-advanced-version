import { motion } from 'framer-motion'
import FirstPart from './AboutMe/FirstPart/FirstPart'
import SecondPart from './AboutMe/SecondPart/SecondPart'
import ThirdPart from './AboutMe/ThirdPart/ThirdPart'
import FifthPart from './AboutMe/FifthPart/FifthPart'
import SixthPart from './AboutMe/SixthPart/SixthPart'
import SeventhPart from './AboutMe/SeventhPart/SeventhPart'
import CreateFloodTransition from './AboutMe/CreateFloodTransition'

export default function AboutMe() {
    return (
        <section className="w-screen text-white flex flex-col items-center justify-center mt-48">
            <FirstPart />
            <motion.div className="mb-8 min-h-[30vh] font-[synemono] text-[#D72631] text-[3em] mt-[20vh]" initial={{ opacity: 0, y: 200 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: .8 }} transition={{ duration: 1.2, delay: .4 }}>
                <p>Toujours en quête de savoir, porté par une curiosité insatiable,</p>
                <p>Il découvrit un nouvel univers : <span className='text-green-400'>le développement.</span></p>
            </motion.div>
            <SecondPart />
            <ThirdPart />
            <motion.div className="mb-8 font-[synemono] text-[#D72631] text-[3em] mt-16" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ amount: .5 }}>
                <p>Un jour, ce monde s&apos;est dévoilé sous un nouveau jour.</p>
                <p>Comme une révélation.</p>
            </motion.div>
            <FifthPart />
            <SixthPart />
            <SeventhPart />
            <div className="mb-8 font-[synemono] text-[#D72631] text-[3em] mt-16">
                <div>
                    <p>Il ne me restait plus qu&apos;une chose à faire :</p>
                </div>
                <div>

                </div>
            </div>
            <motion.div className="w-screen h-screen flex justify-center items-center relative font-[synemono] text-[#D72631] text-[3em] mt-16" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ amount: .5 }}>
                <CreateFloodTransition />
                <div>
                    Créer.
                </div>
            </motion.div>
        </section>
    )
}