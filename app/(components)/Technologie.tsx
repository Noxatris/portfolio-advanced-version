'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Techno {
    name: string;
    icon: string;
    project: string[];
    color: string;
}

const technoList: Techno[] = [
    {
        name: "Github",
        icon: "/icons/github.svg",
        project: ["Projet A", "Projet B"],
        color: "bg-yellow-500 shadow-yellow-500/20",
    },
    {
        name: "Linkedin",
        icon: "/icons/linkedin.svg",
        project: ["Projet C"],
        color: "bg-green-500 shadow-green-500/20",
    },
    {
        name: "MongoDB",
        icon: "/icons/mongodb.svg",
        project: ["Projet D"],
        color: "bg-green-700 shadow-green-700/20",
    },
    {
        name: "Next.js",
        icon: "/icons/nextjs.svg",
        project: ["Projet E", "Projet F"],
        color: "bg-stone-500 shadow-stone-500/20",
    },
    {
        name: "Node.js",
        icon: "/icons/nodejs.svg",
        project: ["Projet G"],
        color: "bg-orange-300 shadow-orange-300/20",
    },
    {
        name: "PostgreSQL",
        icon: "/icons/postgresql.svg",
        project: [""],
        color: "bg-purple-600 shadow-purple-600/20",
    },
    {
        name: "Prisma",
        icon: "/icons/prisma.svg",
        project: [""],
        color: "bg-red-500 shadow-red-500/20",
    },
    {
        name: "React.js",
        icon: "/icons/react.svg",
        project: [""],
        color: "bg-blue-600 shadow-blue-600/20",
    },
    {
        name: "Socket.io",
        icon: "/icons/socketio.svg",
        project: [""],
        color: "bg-cyan-500 shadow-cyan-500/20",
    },
    {
        name: "TailwindCSS",
        icon: "/icons/tailwindcss.svg",
        project: [""],
        color: "bg-pink-500 shadow-pink-500/20",
    },
    {
        name: "TypeScript",
        icon: "/icons/typescript.svg",
        project: [""],
        color: "bg-emerald-500 shadow-emerald-500/20",
    },
]

export default function Technologie() {
    const [selectedTech, setSelectedTech] = useState<Techno | null>(null)
    const socketRef = useRef<HTMLDivElement | null>(null)

    const handleDragEnd = (
        event: MouseEvent | TouchEvent,
        tech: Techno
    ) => {
        let clientX = 0;
        let clientY = 0;

        if ("touches" in event && event.touches.length > 0) {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        } else if ("clientX" in event) {
            clientX = event.clientX;
            clientY = event.clientY;
        }

        const socketBounds = socketRef.current?.getBoundingClientRect();

        if (
            socketBounds &&
            clientX >= socketBounds.left &&
            clientX <= socketBounds.right &&
            clientY >= socketBounds.top &&
            clientY <= socketBounds.bottom
        ) {
            setSelectedTech(tech);
        } else {
            setSelectedTech((prev) => (prev?.name === tech.name ? null : prev));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black to-[#0f1a2b] text-white p-8 flex flex-col lg:flex-row gap-12 items-center justify-center">
            {/* Liste des technos */}
            <div className="flex flex-col gap-4 w-full max-w-xs bg-white/5 rounded-xl p-4 border border-white/10">
                <h2 className="text-xl font-bold mb-2 text-cyan-300">Technos disponibles</h2>
                <div className="grid grid-cols-3 gap-4">
                    {technoList
                        .filter(t => selectedTech?.name !== t.name)
                        .map((tech) => (
                            <motion.div
                                key={tech.name}
                                drag
                                dragMomentum={false}
                                dragSnapToOrigin
                                onDragEnd={(event) => handleDragEnd(event, tech)}
                                whileHover={{
                                    rotate: [0, -5, 5, -5, 0],
                                    transition: {
                                        duration: 0.6,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    },
                                }}
                                className={`w-20 h-20 p-2 z-10 rounded-xl flex items-center justify-center cursor-pointer shadow-xl ${tech.color}`}
                            >
                                <div className='w-full h-full bg-black/20 rounded-xl flex items-center justify-center'>
                                    <Image
                                        src={tech.icon}
                                        alt={tech.name}
                                        width={30}
                                        height={30}
                                        className="pointer-events-none"
                                    />
                                </div>
                            </motion.div>
                        ))}
                </div>
            </div>

            {/* Zone centrale */}
            <div className="flex flex-col items-center justify-center gap-8">
                {/* SOCKET */}
                <div
                    ref={socketRef}
                    className="w-44 h-44 rounded-3xl bg-[#111827] border-2 border-cyan-500 relative shadow-inner-card flex items-center justify-center overflow-hidden hover:ring-2 ring-cyan-400 transition-all duration-300"
                >
                    {selectedTech && (
                        <div className={`w-full h-full flex justify-center items-center rounded-2xl ${selectedTech.color}`}>
                            <Image
                                src={selectedTech.icon}
                                alt={selectedTech.name}
                                width={50}
                                height={50}
                                className="pointer-events-none"
                            />
                        </div>
                    )}
                </div>

                {/* Info Panel */}
                <div className="w-full max-w-md p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                    <p className="text-lg font-semibold text-cyan-200 mb-4">
                        {selectedTech ? `Technologie : ${selectedTech.name}` : "🧩 Glisse une techno dans le socket"}
                    </p>
                    {selectedTech && (
                        <div>
                            <p className="text-sm text-gray-300 mb-2">Projets associés :</p>
                            <ul className="list-disc list-inside text-sm text-white/90">
                                {selectedTech.project.map((proj, index) => (
                                    <li key={index}>{proj || "Aucun projet défini"}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}