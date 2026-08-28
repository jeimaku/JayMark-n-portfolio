import {
  ArrowRight,
  Code2,
  Cpu,
  Download,
  Server,
  Sparkles,
} from "lucide-react";

import Container from "../layout/Container";
import Section from "../layout/Section";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import Card from "../ui/Card";
import Reveal from "../animation/Reveal";
import StaggerContainer, { StaggerItem } from "../animation/StaggerContainer";

import { assetPaths, homepageContent, primarySkills, profile } from "../../data";

const focusAreas = [
  {
    label: "Full-Stack Systems",
    description: "React, Node.js, databases, dashboards, and admin workflows.",
    icon: Code2,
  },
  {
    label: "AI-Powered Platforms",
    description: "OpenAI, Azure AI, learning tools, and intelligent features.",
    icon: Cpu,
  },
  {
    label: "IT Support & Infrastructure",
    description: "Computer systems, troubleshooting, networks, and support work.",
    icon: Server,
  },
];

export default function HeroSection() {
  return (
    <Section
      id="home"
      spacing="hero"
      className="flex items-center pt-28 sm:pt-32 lg:pt-36"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] xl:gap-16">
          <div className="relative min-w-0 max-w-4xl">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-6 z-0 h-[36rem] overflow-hidden rounded-[3rem] border border-neutral-100/10 bg-neutral-950/40 opacity-90 shadow-2xl shadow-black/30 sm:h-[38rem] lg:hidden"
            >
              <img
                src={assetPaths.personal.heroPhoto}
                alt=""
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="h-full w-full scale-110 object-cover object-center opacity-28"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/20 via-neutral-950/75 to-neutral-950/95" />
              <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/35 to-neutral-950" />
              <div className="absolute inset-0 bg-neutral-100/10 mix-blend-screen" />
            </div>
            <div
              aria-hidden="true"
className="pointer-events-none absolute -left-60 top-1/2 hidden h-[42rem] w-[31rem] -translate-y-1/2 overflow-hidden rounded-[4rem] border 
border-neutral-100/10 bg-neutral-950/30 opacity-80 shadow-2xl shadow-black/30 lg:block xl:-left-64"
            >
              <img
                src={assetPaths.personal.heroPhoto}
                alt=""
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="h-full w-full scale-110 object-cover opacity-30"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/10 via-neutral-950/75 to-neutral-950" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/70" />
              <div className="absolute inset-0 bg-neutral-100/10 mix-blend-screen" />
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-28 top-16 hidden h-72 w-72 rounded-full bg-neutral-100/10 blur-3xl lg:block xl:-left-36"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-8 top-12 hidden h-32 w-24 overflow-hidden rounded-[2rem] border border-neutral-100/20 bg-neutral-950/60 p-1 shadow-2xl shadow-black/40 backdrop-blur lg:block xl:-left-12"
            >
              <img
                src={assetPaths.personal.heroPhoto}
                alt=""
                loading="eager"
                decoding="async"
                className="h-full w-full rounded-[1.65rem] object-cover opacity-75"
              />
            </div>

            <Reveal direction="up">
              <div className="relative z-10 rounded-[2.5rem] lg:rounded-none">
                <Badge className="mb-6">
                  <Sparkles size={14} />
                  {profile.role}
                </Badge>

                <h1 className="break-safe text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[0.95]">
                  Building practical systems with clean digital experiences.
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-400 sm:text-lg md:text-xl">
                  I&apos;m {profile.name}, a full-stack developer and IT systems
                  builder focused on creating useful web systems, AI-powered
                  platforms, and polished digital products.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button
                    href="#projects"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    View Projects
                    <ArrowRight size={18} />
                  </Button>

                  <Button
                    href={profile.resume.primary}
                    variant="secondary"
                    size="lg"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="w-full sm:w-auto"
                  >
                    View Resume
                    <Download size={18} />
                  </Button>

                  <Button
                    href="#contact"
                    variant="ghost"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Contact Me
                  </Button>
                </div>

                <StaggerContainer
                  className="mt-9 flex flex-wrap gap-2.5 sm:gap-3"
                  delay={0.25}
                >
                  {primarySkills
                    .slice(0, homepageContent.heroSkillLimit)
                    .map((skill) => (
                      <StaggerItem key={skill}>
                        <Badge>{skill}</Badge>
                      </StaggerItem>
                    ))}
                </StaggerContainer>

                <StaggerContainer
                  className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-12 xl:grid-cols-4"
                  delay={0.35}
                >
                  {profile.quickStats.map((stat) => (
                    <StaggerItem key={stat.label}>
                      <div className="rounded-2xl border border-white/10 bg-neutral-950/60 p-4 backdrop-blur">
                        <p className="break-safe text-xl font-semibold text-white sm:text-2xl">
                          {stat.value}
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-[0.22em] text-neutral-500">
                          {stat.label}
                        </p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.15} className="relative min-w-0">
            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-neutral-100/10 blur-3xl"
              />

              <Card className="relative z-10 p-0 motion-safe:animate-[floatSoft_7s_ease-in-out_infinite]">
                <div className="relative overflow-hidden rounded-[1.75rem]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_24rem)]" />

                  <div className="relative z-10 p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                      <div className="flex min-w-0 items-center gap-4">
                        <img
                          src={profile.avatar}
                          alt={`${profile.name} profile preview`}
                          loading="lazy"
                          decoding="async"
                          className="h-12 w-12 shrink-0 rounded-2xl border border-neutral-100/20 bg-neutral-950 object-cover"
                        />

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-white">
                            Developer Workspace
                          </p>
                          <p className="mt-1 text-xs text-neutral-500">
                            Systems • AI • UI/UX
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      {focusAreas.map((item) => {
                        const Icon = item.icon;

                        return (
                          <div
                            key={item.label}
                            className="rounded-2xl border border-white/10 bg-neutral-950/45 p-4"
                          >
                            <div className="flex gap-4">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-neutral-100/20 bg-neutral-100/10 text-white">
                                <Icon size={20} />
                              </div>

                              <div className="min-w-0">
                                <p className="font-semibold text-white">
                                  {item.label}
                                </p>
                                <p className="mt-1 text-sm leading-6 text-neutral-400">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-5 rounded-2xl border border-neutral-100/20 bg-neutral-100/10 p-4">
                      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white">
                        Signature Project
                      </p>

                      <p className="mt-3 text-2xl font-semibold tracking-tight text-white">
                        TalkReady
                      </p>

                      <p className="mt-2 text-sm leading-6 text-neutral-400">
                        AI-powered English proficiency platform accepted for
                        IEEE APWiMob 2025.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
