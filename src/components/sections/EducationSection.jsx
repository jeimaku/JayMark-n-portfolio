import { BookOpen, GraduationCap, Sparkles } from "lucide-react";

import Container from "../layout/Container";
import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Reveal from "../animation/Reveal";
import StaggerContainer, { StaggerItem } from "../animation/StaggerContainer";

import { education } from "../../data";

const iconMap = {
  "senior-high-school": BookOpen,
  college: GraduationCap,
};

export default function EducationSection() {
  return (
    <Section id="education" spacing="compact">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Education"
              title="Academic foundation in IT, mobile, and web applications."
              description="My education shaped my foundation in programming, systems, databases, mobile development, web applications, and AI-powered project development."
            />

            <div className="mt-8 rounded-[1.75rem] border border-neutral-100/20 bg-neutral-100/10 p-5 sm:p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-100/25 bg-neutral-950/50 text-white">
                <Sparkles size={22} />
              </div>

              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.25em] text-white">
                Academic Focus
              </p>

              <p className="mt-4 break-safe text-xl font-semibold tracking-tight text-white sm:text-2xl">
                From ICT fundamentals to full-stack and mobile development.
              </p>

              <p className="mt-4 text-sm leading-7 text-neutral-400">
                My academic journey helped me build a strong technical base,
                starting from programming and databases, then growing into
                modern web, mobile, AI, and software project development.
              </p>
            </div>
          </Reveal>

          <StaggerContainer className="space-y-5 sm:space-y-6">
            {education.map((item, index) => {
              const Icon = iconMap[item.id] || GraduationCap;

              return (
                <StaggerItem key={item.id}>
                  <Card>
                    <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                      <div className="flex min-w-0 flex-col gap-5 sm:flex-row">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-neutral-100/20 bg-white p-2 text-white">
                          {item.logo ? (
                            <img
                              src={item.logo}
                              alt={`${item.school} logo`}
                              loading="lazy"
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <Icon size={24} />
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap gap-2">
                            <Badge>{item.status}</Badge>

                            <Badge className="border-white/10 bg-white/[0.03] text-neutral-200">
                              {item.year}
                            </Badge>
                          </div>

                          <h3 className="mt-5 break-safe text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                            {item.level}
                          </h3>

                          <p className="mt-2 break-safe text-sm font-medium text-white sm:text-base">
                            {item.degree}
                          </p>

                          {item.specialization && (
                            <p className="mt-2 break-safe text-sm leading-6 text-neutral-300">
                              Specialization: {item.specialization}
                            </p>
                          )}

                          <p className="mt-3 break-safe text-sm leading-6 text-neutral-500">
                            {item.school}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-semibold text-neutral-600 xl:shrink-0">
                        0{index + 1}
                      </span>
                    </div>

                    <p className="mt-7 text-sm leading-7 text-neutral-400 md:text-base">
                      {item.description}
                    </p>

                    <div className="mt-7">
                      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-neutral-500">
                        Achievements
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.achievements.map((achievement) => (
                          <Badge
                            key={achievement}
                            className="border-white/10 bg-white/[0.03] text-neutral-200"
                          >
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-7">
                      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-neutral-500">
                        Skills Developed
                      </p>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {item.skills.slice(0, 8).map((skill) => (
                          <div
                            key={skill}
                            className="break-safe rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-sm leading-6 text-neutral-300"
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
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