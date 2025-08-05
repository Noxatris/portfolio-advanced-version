'use client';

import { useEffect, useRef, useState } from 'react';
import NextImage from 'next/image';
import { motion } from 'framer-motion';
import { Image as LucidImage, ClipboardList, Layers, Home, Laptop } from 'lucide-react'
import Link from 'next/link'

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface Project {
    slug: string;
    title: string;
    description: string;
    cover: string;
    stack: string[];
    features: string[];
    images: string[];
    url: string;
}

const projects: Project[] = [
    {
        slug: "interfaceJdr",
        title: "Interface de Jeu de rôle",
        description: "Un programme permettant le lancer de dé ainsi que la modification d'une fiche personnage sur une instance groupé",
        cover: "/bgProjet/interfaceJDR.png",
        stack: [
            "React",
            "Vite.js",
            "TypeScript",
            "Tailwind",
            "Node.js",
            "express.js",
            "Socket.IO",
            "SQLite"
        ],
        features: [
            "Lancé de Dé Genesys",
            "Base de donnée en SQLite",
            "Gestion d'instance multi-utilisateur"
        ],
        images: [
            "/screens/interfaceJDR1.png",
            "/screens/interfaceJDR2.png"
        ],
        url: "https://github.com/Noxatris/deepintheabyss"
    },
    {
        slug: "eternalys",
        title: "Interface de Jeu de rôle",
        description: "Un programme permettant le lancer de dé ainsi que la modification d'une fiche personnage sur une instance groupé",
        cover: "/bgProjet/eternalys.png",
        stack: [
            "React",
            "Vite.js",
            "TypeScript",
            "Tailwind",
            "Node.js",
            "express.js",
            "Socket.IO",
            "SQLite"
        ],
        features: [
            "Lancé de Dé Genesys",
            "Base de donnée en SQLite",
            "Gestion d'instance multi-utilisateur"
        ],
        images: [
            "/screens/interfaceJDR1.png",
            "/screens/interfaceJDR2.png"
        ],
        url: "https://github.com/Noxatris/deepintheabyss"
    },
    {
        slug: "dimensionAnime",
        title: "Interface de Jeu de rôle",
        description: "Un programme permettant le lancer de dé ainsi que la modification d'une fiche personnage sur une instance groupé",
        cover: "/bgProjet/dimensionAnime.png",
        stack: [
            "React",
            "Vite.js",
            "TypeScript",
            "Tailwind",
            "Node.js",
            "express.js",
            "Socket.IO",
            "SQLite"
        ],
        features: [
            "Lancé de Dé Genesys",
            "Base de donnée en SQLite",
            "Gestion d'instance multi-utilisateur"
        ],
        images: [
            "/screens/interfaceJDR1.png",
            "/screens/interfaceJDR2.png"
        ],
        url: "https://github.com/Noxatris/deepintheabyss"
    },
    {
        slug: "gwadaResto",
        title: "Interface de Jeu de rôle",
        description: "Un programme permettant le lancer de dé ainsi que la modification d'une fiche personnage sur une instance groupé",
        cover: "/bgProjet/gwadaResto.png",
        stack: [
            "React",
            "Vite.js",
            "TypeScript",
            "Tailwind",
            "Node.js",
            "express.js",
            "Socket.IO",
            "SQLite"
        ],
        features: [
            "Lancé de Dé Genesys",
            "Base de donnée en SQLite",
            "Gestion d'instance multi-utilisateur"
        ],
        images: [
            "/screens/interfaceJDR1.png",
            "/screens/interfaceJDR2.png"
        ],
        url: "https://github.com/Noxatris/deepintheabyss"
    },
    // Tu peux ajouter d'autres projets ici.
]

export default function PsMenu() {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const targetRef = useRef<HTMLDivElement | null>(null);
    const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [projectSub, setProjectSub] = useState<"default" | "stack" | "feature" | "galerie">("default");
    const [closestProject, setClosestProject] = useState<Project | null>(null);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const renderProjectSub = () => {
        if (!closestProject) return null;

        switch (projectSub) {
            case "default":
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-white max-w-2xl px-6"
                    >
                        <h2 className="text-3xl font-bold mb-4">{closestProject.title}</h2>
                        <p className="text-lg text-white/80">{closestProject.description}</p>
                    </motion.div>
                );
            case "stack":
                return (
                    <motion.ul
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-2 gap-4 text-white text-center"
                    >
                        {closestProject.stack.map((stack, index) => (
                            <li key={index} className="bg-sky-600/30 p-2 rounded-lg">{stack}</li>
                        ))}
                    </motion.ul>
                );
            case "feature":
                return (
                    <motion.ul
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-3 text-white text-left max-w-md"
                    >
                        {closestProject.features.map((feature, index) => (
                            <li key={index} className="bg-emerald-600/30 p-3 rounded-md">{feature}</li>
                        ))}
                    </motion.ul>
                );
            case "galerie":
                return (
                    <div>
                        <div className="flex gap-4 flex-wrap justify-center">
                            {closestProject?.images.map((imageUrl, index) => (
                                <div
                                    key={index}
                                    onClick={() => setLightboxIndex(index)}
                                    className="w-[300px] h-[180px] relative rounded-xl overflow-hidden shadow-md cursor-pointer"
                                >
                                    <NextImage fill src={imageUrl} alt={closestProject.title} className="object-cover" />
                                </div>
                            ))}
                        </div>

                        <Lightbox
                            open={lightboxIndex !== null}
                            close={() => setLightboxIndex(null)}
                            index={lightboxIndex ?? 0}
                            slides={closestProject.images.map((src) => ({ src }))}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    // Fonction pour mettre à jour le projet le plus proche
    const updateClosest = () => {
        if (!targetRef.current || !projectRefs.current.length) return;

        const targetRect = targetRef.current.getBoundingClientRect();
        const targetCenter = targetRect.top + targetRect.height / 2;

        let closest: Project | null = null;
        let minDistance = Infinity;

        projectRefs.current.forEach((el, i) => {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const center = rect.top + rect.height / 2;
            const distance = Math.abs(center - targetCenter);

            if (distance < minDistance) {
                minDistance = distance;
                closest = projects[i] as Project;
            }
        });

        // ⚠️ Vérification : mise à jour uniquement si le projet a changé
        if (closest && closest.slug !== closestProject?.slug) {
            setProjectSub("default");
            setClosestProject(closest);
        }
    };

    // Attacher scroll + resize
    useEffect(() => {
        const handleScrollOrResize = () => {
            requestAnimationFrame(updateClosest);
        };

        const container = scrollRef.current;
        if (container) {
            container.addEventListener('scroll', handleScrollOrResize);
        }
        window.addEventListener('resize', handleScrollOrResize);

        updateClosest(); // initial run

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScrollOrResize);
            }
            window.removeEventListener('resize', handleScrollOrResize);
        };
    }, [projects]);

    const lastSnappedSlug = useRef<string | null>(null);

    useEffect(() => {
        if (
            !closestProject ||
            !targetRef.current ||
            !scrollRef.current ||
            lastSnappedSlug.current === closestProject.slug
        )
            return;

        const index = projects.findIndex((p) => p.slug === closestProject.slug);
        const projectEl = projectRefs.current[index];
        if (!projectEl) return;

        const targetRect = targetRef.current.getBoundingClientRect();
        const projectRect = projectEl.getBoundingClientRect();

        const offset = projectRect.top - targetRect.top;

        scrollRef.current.scrollBy({
            top: offset,
            behavior: 'smooth',
        });

        lastSnappedSlug.current = closestProject.slug;
    }, [closestProject, projects]);

    return (
        <div className="relative z-10 w-screen h-[120vh]">

            <div className='h-screen flex flex-col items-center justify-end'>
                {closestProject && (
                    renderProjectSub()
                )}

                {/* Affichage dynamique */}
                {closestProject && (
                    <div className="flex gap-4 mt-12 z-50 bg-black/80 p-4 rounded-4xl">
                        <motion.button
                            onClick={() => setProjectSub("default")}
                            className="w-16 h-16 md:w-20 md:h-20 flex justify-center items-center rounded-full shadow-md shadow-fuchsia-400 hover:scale-110 transition-all duration-200 text-white bg-gradient-to-b from-fuchsia-500 to-fuchsia-800"
                        >
                            <Home className='bg-black/10 rounded-full p-2 w-1/2 h-1/2' />
                        </motion.button>

                        <motion.button
                            onClick={() => setProjectSub("stack")}
                            className="w-16 h-16 md:w-20 md:h-20 flex justify-center items-center rounded-full shadow-md shadow-sky-400 hover:scale-110 transition-transform duration-200 text-white bg-gradient-to-b from-sky-500 to-sky-800"
                        >
                            <Layers className='bg-black/10 rounded-full p-2 w-1/2 h-1/2'/>
                        </motion.button>

                        <motion.button
                            onClick={() => setProjectSub("feature")}
                            className="w-16 h-16 md:w-20 md:h-20 flex justify-center items-center rounded-full shadow-md shadow-emerald-400 hover:scale-110 transition-transform duration-200 text-white bg-gradient-to-b from-emerald-500 to-emerald-800"
                        >
                            <ClipboardList className='bg-black/10 rounded-full p-2 w-1/2 h-1/2'/>
                        </motion.button>

                        <motion.button
                            onClick={() => setProjectSub("galerie")}
                            className="w-16 h-16 md:w-20 md:h-20 flex justify-center items-center rounded-full shadow-md shadow-amber-400 hover:scale-110 transition-transform duration-200 text-white bg-gradient-to-b from-amber-500 to-amber-800"
                        >
                            <LucidImage className='bg-black/10 rounded-full p-2 w-1/2 h-1/2'/>
                        </motion.button>

                        <Link
                            href={closestProject.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-16 h-16 md:w-20 md:h-20 flex justify-center items-center rounded-full shadow-md shadow-red-400 hover:scale-110 transition-transform duration-200 text-white bg-gradient-to-b from-red-500 to-red-800"
                        >
                            <Laptop className='bg-black/10 rounded-full p-2 w-1/2 h-1/2'/>
                        </Link>
                    </div>
                )}
            </div>

            {/* Carrousel Vertical */}
            <motion.div
                ref={scrollRef}
                className="relative flex flex-col gap-12 px-10 overflow-x-auto no-scrollbar snap-x snap-mandatory justify-center items-end py-8"
                drag="y"
                dragConstraints={{ top: -(projects.length + 2) * 192, bottom: (projects.length - 5) * 192 }}
                whileTap={{ cursor: 'grabbing' }}
                onUpdate={updateClosest} // 🔥 ceci déclenche à chaque frame pendant le drag
            >
                {projects.map((project, index) => (
                    <motion.div
                        key={project.slug}
                        ref={(el: HTMLDivElement | null) => {
                            projectRefs.current[index] = el;
                        }}
                        className="w-48 h-48 shadow-xl rounded-3xl snap-center flex-shrink-0 backdrop-blur-md transform hover:-translate-y-4 hover:rotate-y-[10deg] transition duration-300 ease-out cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div aria-label={`/projets/${project.slug}`} className="w-full h-full pointer-events-none">
                            <div className="relative w-full h-full rounded-xl overflow-hidden mb-4">
                                <NextImage
                                    src={project.cover}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>


            {closestProject && (
                <motion.div
                    key={closestProject.cover} // important pour déclencher l'animation
                    className="absolute inset-0 -z-50 pointer-events-none"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Dégradé haut */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-48 bg-gradient-to-t from-transparent to-black z-50 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                    />
                    <div className="relative w-full h-full pointer-events-none">
                        <NextImage
                            src={closestProject.cover}
                            alt={closestProject.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    {/* Dégradé bas */}
                    <motion.div
                        className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-b from-transparent to-black z-50 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                    />
                </motion.div>
            )}


            <div
                ref={targetRef}
                className="absolute bottom-[20%] right-[1.7%] w-52 h-52 bg-green-400/70  rounded-2xl -z-10 pointer-events-none"
            />

        </div>
    );
}