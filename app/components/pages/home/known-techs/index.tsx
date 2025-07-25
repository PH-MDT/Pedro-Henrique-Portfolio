'use client'

import { SectionTitle } from "@/app/components/section-title";
import { KnownTeach } from "./known-tech";
import { KnownTech as IKnownTech } from "@/app/types/projects";
import { motion } from 'framer-motion'

type KnownTeachsProps = {
  techs: IKnownTech[];
};

export const KnownTeachs = ({ techs }: KnownTeachsProps) => {
  return (
    <section className="container py-16">
      <SectionTitle subtitle="competências" title="Conhecimentos" />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(264px,1fr))] gap-3 mt-[60px] ">
        {techs?.map((tech, i) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.15, delay: i * 0.1 }}
            >
          <KnownTeach
            tech={tech}
          />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
