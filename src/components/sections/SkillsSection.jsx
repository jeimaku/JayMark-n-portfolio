import {
  Brain,
  Code2,
  Database,
  Layers,
  Palette,
  Server,
  Smartphone,
  Wrench,
} from "lucide-react";

import Container from "../layout/Container";
import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Reveal from "../animation/Reveal";
import StaggerContainer, { StaggerItem } from "../animation/StaggerContainer";

import { skillCategories, primarySkills } from "../../data";

const iconMap = {
  frontend: Code2,
  backend: Database,
  mobile: Smartphone,
  ai: Brain,
  "it-support": Server,
  tools: Wrench,
  creative: Palette,
};

export default function SkillsSection() {
  return (
    <Section id="skills" spacing="compact">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Skills"
              title="A technical toolkit built across real projects."
              description="My skills are shaped by academic projects, internship systems, AI integration, IT support work, and creative design activities."
            />

            <div className="mt-8 rounded-[1.75rem] border border-cyan-300/20 bg-cyan-300/10 p-5 sm:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
                Core Stack
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {primarySkills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                Skill Direction
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                I focus on connecting software development, IT support, AI
                tools, and interface design into practical systems that are
                usable, maintainable, and visually clean.
              </p>
            </div>
          </Reveal>

          <StaggerContainer className="grid gap-5 sm:grid-cols-2">
            {skillCategories.map((category, index) => {
              const Icon = iconMap[category.id] || Layers;

              return (
                <StaggerItem key={category.id}>
                  <Card className="h-full min-h-[15rem]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                        <Icon size={22} />
                      </div>

                      <span className="text-xs font-semibold text-slate-600">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-6 break-safe text-xl font-semibold tracking-tight text-white sm:text-2xl">
                      {category.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      {category.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <Badge
                          key={skill}
                          className="border-white/10 bg-white/[0.03] text-slate-200"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </Container>
    </Section>
  );
}