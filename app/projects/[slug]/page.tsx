import { ProjectDetails } from "@/app/components/pages/home/project/project-details";
import { ProjectSections } from "@/app/components/pages/home/project/project-details/project-sections";
import { ProjectsPageData, ProjectsPagesStaticData } from "@/app/types/page-info";
import { fetchHygraphQuery } from "@/app/utils/fetch-hygraph-query";
import { Metadata } from "next";

type ProjectProps = {
    params: {
        slug: string;
    }
}

export const metadata = {
    title: 'Project',
}

const getProjectDetails = async (slug: string): Promise<ProjectsPageData> => {
    const query = `
    query ProjectQuery {
        project(where: {slug: "${slug}"}) {
        pageThumbnail {
            url
        }
        thumbnail {
            url
        }
        sections {
            title
            image {
            url
            }
        }
        title
        shortDescription
        description {
            raw
            text
        }
        technologies {
            name
        }
        liveProjectUrl
        githubUrl
        }
    }
    `
    
    return fetchHygraphQuery(
        query,
        60 * 60 * 24
    )
}

export default async function Project({ params: { slug } }:ProjectProps) {
    const { project } = await getProjectDetails(slug)
    return (
        <>
            <ProjectDetails project={project} />
            <ProjectSections  sections={project.sections}/>
        </>
    )

}

export async function generateStaticParams() {
    const query = `
        query ProjectsSlugsQuery {
            projects(first: 100) {
                slug
            }
        }
    `

    const { projects } = await fetchHygraphQuery<ProjectsPagesStaticData>(query)
    
    return projects
}

export async function generateMetadata({
    params: { slug }
}: ProjectProps): Promise<Metadata> {
    const data = await getProjectDetails(slug)
    const project = data.project;
    
    return {
        title: project.title,
        description: project.description.text,
        openGraph: {
            images: [
                {
                    url: project.thumbnail.url,
                    width:1200,
                    height:630,
                }
            ]
        }
    }
}