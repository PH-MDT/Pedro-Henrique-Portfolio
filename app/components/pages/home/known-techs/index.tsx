import { SectionTitle } from "@/app/components/section-title";
import { KnownTeach } from "./known-tech";
import { KnownTech as IKnownTech } from "@/app/types/projects";

type KnownTeachsProps = {
  techs: IKnownTech
};

export const KnownTeachs = ({ techs }: KnownTeachsProps) => {
  return (
    <section className="container py-16">
      <SectionTitle subtitle="competências" title="Conhecimentos" />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(264px,1fr))] gap-3 mt-[60px] ">
        {techs?.map((tech) => (
          <KnownTeach
            key={tech.name}
            tech={tech}
          />
        ))}
      </div>
    </section>
  );
};
