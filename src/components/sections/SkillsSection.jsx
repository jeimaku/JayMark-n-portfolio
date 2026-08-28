import {
  Brain,
  Code2,
  Cpu,
  Database,
  GitBranch,
  HardDrive,
  Layers,
  Network,
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

const simpleIconBase = "https://cdn.simpleicons.org";

const skillIconMap = {
  "React.js": `${simpleIconBase}/react/67E8F9`,
  JavaScript: `${simpleIconBase}/javascript/67E8F9`,
  HTML5: `${simpleIconBase}/html5/67E8F9`,
  CSS3: `${simpleIconBase}/css/67E8F9`,
  "Tailwind CSS": `${simpleIconBase}/tailwindcss/67E8F9`,

  "Node.js": `${simpleIconBase}/nodedotjs/67E8F9`,
  "Express.js": `${simpleIconBase}/express/67E8F9`,
  MySQL: `${simpleIconBase}/mysql/67E8F9`,
  SQL: `${simpleIconBase}/mysql/67E8F9`,
  Firebase: `${simpleIconBase}/firebase/67E8F9`,
  Supabase: `${simpleIconBase}/supabase/67E8F9`,

  Flutter: `${simpleIconBase}/flutter/67E8F9`,
  Dart: `${simpleIconBase}/dart/67E8F9`,

  "OpenAI API": `${simpleIconBase}/openai/67E8F9`,
  "Azure AI": `${simpleIconBase}/microsoftazure/67E8F9`,

  "Windows Server & AD": `${simpleIconBase}/windows/67E8F9`,

  Git: `${simpleIconBase}/git/67E8F9`,
  GitHub: `${simpleIconBase}/github/67E8F9`,
  "VS Code": `${simpleIconBase}/visualstudiocode/67E8F9`,
  npm: `${simpleIconBase}/npm/67E8F9`,
  Render: `${simpleIconBase}/render/67E8F9`,

  Figma: `${simpleIconBase}/figma/67E8F9`,
  "Adobe Photoshop": `${simpleIconBase}/adobephotoshop/67E8F9`,
  "Adobe Premiere Pro": `${simpleIconBase}/adobepremierepro/67E8F9`,
};

const fallbackSkillIcons = {
  "Speech Assessment": Cpu,
  "AI Feedback Systems": Brain,
  "Network Troubleshooting": Network,
  "Hardware Troubleshooting": HardDrive,
  "RAID Setup": Server,
  "Technical Support": Wrench,
  "IT Support": Wrench,
  "UI/UX Design": Palette,
  "Graphic Design": Palette,
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

            <div className="mt-8 rounded-[1.75rem] border border-neutral-100/20 bg-neutral-100/10 p-5 sm:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white">
                Core Stack
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {primarySkills.map((skill) => (
                  <SkillBadge key={skill} skill={skill} featured />
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500">
                Skill Direction
              </p>

              <p className="mt-4 text-sm leading-7 text-neutral-400">
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
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-neutral-100/20 bg-neutral-100/10 text-white">
                        <Icon size={22} />
                      </div>

                      <span className="text-xs font-semibold text-neutral-600">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-6 break-safe text-xl font-semibold tracking-tight text-white sm:text-2xl">
                      {category.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-neutral-400">
                      {category.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <SkillBadge key={skill} skill={skill} />
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

function SkillBadge({ skill, featured = false }) {
  const iconUrl = skillIconMap[skill];
  const FallbackIcon = fallbackSkillIcons[skill];

  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold leading-none transition duration-300",
        featured
          ? "border-neutral-100/30 bg-neutral-100/10 text-neutral-50"
          : "border-white/10 bg-white/[0.03] text-neutral-200",
      ].join(" ")}
    >
      {iconUrl ? (
        <img
          src={iconUrl}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-3.5 w-3.5 shrink-0"
        />
      ) : FallbackIcon ? (
        <FallbackIcon className="h-3.5 w-3.5 shrink-0 text-white" />
      ) : null}

      <span>{skill}</span>
    </span>
  );
}