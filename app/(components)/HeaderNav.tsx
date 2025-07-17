import NeonLink from "./NeonLink"
import { motion } from "framer-motion";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full p-4 z-50">
            <nav className="mt-2">
                <ul className="flex flex-1 place-self-end justify-around w-[50vw] font-[synemono] text-4xl hover:cursor-none" >
                    <motion.li initial={{ opacity: 0, translateY: -100 }} animate={{ opacity: 1, translateY: 0 }} transition={{ duration: 1.2, delay: 0.5 }}><NeonLink href="/">Technique</NeonLink></motion.li>
                    <motion.li initial={{ opacity: 0, translateY: -100 }} animate={{ opacity: 1, translateY: 0 }} transition={{ duration: 1.2, delay: 0.7 }}><NeonLink href="/">Service</NeonLink></motion.li>
                    <motion.li initial={{ opacity: 0, translateY: -100 }} animate={{ opacity: 1, translateY: 0 }} transition={{ duration: 1.2, delay: 0.9 }}><NeonLink href="/">Projet</NeonLink></motion.li>
                </ul>
            </nav>
        </header>
    )
}