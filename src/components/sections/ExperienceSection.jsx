import {
  Award,
  BriefcaseBusiness,
  Camera,
  Code2,
  GraduationCap,
} from "lucide-react";

import Container from "../layout/Container";
import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Reveal from "../animation/Reveal";
import StaggerContainer, { StaggerItem } from "../animation/StaggerContainer";

import { experience, homepageContent } from "../../data";

const iconMap = {
  "launchpad-paysera-internship": BriefcaseBusiness,
  "talkready-team-lead": Code2,
  "ieee-apwimob-2025": Award,
  "nu-dasma-vibin-media": Camera,
  "academic-excellence": GraduationCap,
};

export default function ExperienceSection() {
  const featuredExperience = homepageContent.featuredExperienceIds
    .map((id) => experience.find((item) => item.id === id))
    .filter(Boolean);

  return (
    <Section id="experience" spacing="compact">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Experience"
              title="Practical experience across development, IT support, and research."
              description="My work experience combines full-stack systems, real IT support responsibilities, capstone leadership, and academic research recognition."
            />

            <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5 sm:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
                Main Focus
              </p>

              <p className="mt-4 break-safe text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Building useful systems for real workflows.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                From internal CRM tools and inventory systems to AI-powered
                learning platforms, my experience is centered on solving
                practical problems through clean software and reliable support.
              </p>
            </div>
          </Reveal>

          <div className="relative min-w-0">
            <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-cyan-300/50 via-white/10 to-transparent md:block" />

            <StaggerContainer className="space-y-5 sm:space-y-6">
              {featuredExperience.map((item, index) => {
                const Icon = iconMap[item.id] || BriefcaseBusiness;

                return (
                  <StaggerItem key={item.id}>
                    <div className="relative min-w-0 md:pl-16">
                      <div className="absolute left-0 top-6 hidden h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/25 bg-slate-950 text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.12)] md:flex">
                        <Icon size={22} />
                      </div>

                      <Card>
                        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                          <div className="min-w-0">
                            <div className="flex flex-wrap gap-2">
                              <Badge>{item.badge}</Badge>

                              <Badge className="border-white/10 bg-white/[0.03] text-slate-200">
                                {item.type}
                              </Badge>
                            </div>

                            <h3 className="mt-5 break-safe text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                              {item.title}
                            </h3>

                            <p className="mt-2 break-safe text-sm font-medium text-cyan-200 sm:text-base">
                              {item.organization}
                            </p>
                          </div>

                          <div className="w-fit rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-400 xl:shrink-0">
                            {item.period}
                          </div>
                        </div>

                        <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-400 md:text-base">
                          {item.description}
                        </p>

                        <div className="mt-7 grid gap-3 sm:grid-cols-2">
                          {item.highlights.slice(0, 4).map((highlight) => (
                            <div
                              key={highlight}
                              className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-sm leading-6 text-slate-300"
                            >
                              {highlight}
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
                          0{index + 1}
                        </div>
                      </Card>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </Container>
    </Section>
  );
}