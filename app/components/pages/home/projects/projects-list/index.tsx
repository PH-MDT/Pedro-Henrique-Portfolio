import Link from "next/link"
import { ProjectCard } from "./project-card"
import { Project } from "@/app/types/projects"

type ProjectListProps = {
    projects: Project[]
}

export const ProjectList = ({ projects }: ProjectListProps) => {
    return (
        <section className="container py-32 grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-x-4 gap-6">
            {projects.map(project => (
                <Link key={project.title} href={`/projects/${project.slug}`}> 
                    <ProjectCard project={project} />
                </Link>
            ))}
            
        </section>

    )

}