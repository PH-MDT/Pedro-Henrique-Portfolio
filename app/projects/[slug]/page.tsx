import { ProjectDetails } from "@/app/components/pages/home/project/project-details";
import { ProjectSections } from "@/app/components/pages/home/project/project-details/project-sections";
import { ProjectPageData, ProjectsPagesStaticData } from "@/app/types/page-info";
import { fetchHygraphQuery } from "@/app/utils/fetch-hygraph-query";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type ProjectProps = {
  params: { slug: string };
  searchParams: { lang: string };
};

// =========================================================
// FUNÇÃO getProjectDetails CORRIGIDA
// =========================================================
const getProjectDetails = async (
  slug: string,
  lang: string
): Promise<ProjectPageData> => {
  // 1. As variáveis ($slug, $locale) foram removidas da definição da query
  // 2. As variáveis foram injetadas diretamente na string (ex: "${slug}")
  const query = `
    query ProjectDetailsQuery {
      project(where: {slug: "${slug}"}, locales: ["${lang}"]) {
        pageThumbnail { url }
        thumbnail { url }
        sections {
          title
          image { url }
        }
        title
        shortDescription
        description {
          raw
          text
        }
        technologies(first: 100) {
          name
          category
        }
        liveProjectUrl
        githubUrl
      }
    }
  `;

  // 3. A chamada da função foi corrigida para ter apenas 2 argumentos:
  // (query, revalidateTime)
  return fetchHygraphQuery(query, 0);
};

export default async function Project({ params, searchParams }: ProjectProps) {
  const lang = searchParams.lang || "en";
  const data = await getProjectDetails(params.slug, lang);

  // Corrigi a verificação para ser mais segura
  if (!data?.project) {
    // Você pode usar notFound() ou um componente customizado
    notFound();
    // return <h2>Projeto não encontrado.</h2>;
  }

  return (
    <>
      <ProjectDetails project={data.project} />
      <ProjectSections sections={data.project.sections} />
    </>
  );
}

// =======================================================================
// A função generateStaticParams está corretamente comentada,
// já que você está usando `export const dynamic = "force-dynamic";`
// =======================================================================
/*
export async function generateStaticParams() {
  const query = `
    query ProjectsSlugsQuery() {
      projects(first: 100){
        slug
      }
    }
  `
  const { projects } = await fetchHygraphQuery<ProjectsPageStaticData>(query)

  return projects
}
*/
// =======================================================================

export async function generateMetadata({
  params,
  searchParams,
}: ProjectProps): Promise<Metadata> {
  const lang = searchParams.lang || "en";
  const data = await getProjectDetails(params.slug, lang);

  if (!data || !data.project) {
    return { title: "Projeto não encontrado" };
  }

  const { project } = data;

  return {
    title: project.title,
    // Adicionado 'optional chaining' (?.), caso a descrição seja nula
    description: project.description?.text,
    openGraph: {
      images: [
        // Sua lógica para verificar se a thumbnail existe está ótima!
        ...(project.thumbnail
          ? [
              {
                url: project.thumbnail.url,
                width: 1200,
                height: 630,
              },
            ]
          : []),
      ],
    },
  };
}