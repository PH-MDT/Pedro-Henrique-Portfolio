'use client'

import Link from "next/link"
import { ProjectCard } from "./project-card"
import { Project } from "@/app/types/projects"
import { motion } from 'framer-motion'
import { fadeUpAnimation } from "@/app/lib/animations"

type ProjectListProps = {
    projects: Project[]
}

export const ProjectList = ({ projects }: ProjectListProps) => {
    return (
        <section className="container py-32 grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-x-4 gap-6">
            {projects.map((project, i) => (
                <motion.div
                    key={project.title}
                    {...fadeUpAnimation}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                    <Link href={`/projects/${project.slug}`}>
                        <ProjectCard project={project} />
                    </Link>
                </motion.div>
            ))}
            
        </section>

    )

}