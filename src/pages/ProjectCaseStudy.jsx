import { useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Image as ImageIcon,
  Layers,
  Lightbulb,
  MonitorPlay,
  Palette,
  Smartphone,
  Sparkles,
  Target,
  UserRound,
} from "lucide-react";


import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import MediaFrame from "../components/ui/MediaFrame";
import MediaLightbox from "../components/ui/MediaLightbox";
import PhoneMockup from "../components/ui/PhoneMockup";
import Reveal from "../components/animation/Reveal";
import StaggerContainer, {
  StaggerItem,
} from "../components/animation/StaggerContainer";

import { caseStudies } from "../data";
import Seo from "../components/effects/Seo";

export default function ProjectCaseStudy() {
  const { projectId } = useParams();
  const [activeMedia, setActiveMedia] = useState(null);
  const [isPageReady, setIsPageReady] = useState(false);

  const project = caseStudies.find((item) => item.id === projectId);

    useLayoutEffect(() => {
    let frameOne;
    let frameTwo;

    setIsPageReady(false);
    window.scrollTo(0, 0);

    frameOne = requestAnimationFrame(() => {
      frameTwo = requestAnimationFrame(() => {
        setIsPageReady(true);
      });
    });

    return () => {
      cancelAnimationFrame(frameOne);
      cancelAnimationFrame(frameTwo);
    };
  }, [projectId]);


  if (!project) {
    return (
      <main
        key={project.id}
        id="main-content"
        tabIndex={-1}
        className="min-h-screen bg-transparent text-slate-50 focus:outline-none"
      >
        <Section spacing="hero">
          <Container>
            <Card>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
                Case Study Not Found
              </p>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
                This project page does not exist.
              </h1>

              <p className="mt-4 text-slate-400">
                The project may have been moved, renamed, or not added yet.
              </p>

              <Button href="/" className="mt-8">
                Back to Home
                <ArrowLeft size={16} />
              </Button>
            </Card>
          </Container>
        </Section>
      </main>
    );
  }

  if (!isPageReady) {
    return <CaseStudyLoading title={project.title} />;
  }

  const isMobileCaseStudy = project.id === "mobile-applications";
  const isDesignCaseStudy = project.id === "ui-ux-designs";

  const currentIndex = caseStudies.findIndex((item) => item.id === project.id);

  const previousProject =
    caseStudies[(currentIndex - 1 + caseStudies.length) % caseStudies.length];

  const nextProject = caseStudies[(currentIndex + 1) % caseStudies.length];

  const otherProjects = caseStudies.filter((item) => item.id !== project.id);

  const scanCards = [
    {
      label: "Problem",
      icon: Target,
      body: project.problem,
    },
    {
      label: "My Role",
      icon: UserRound,
      body: project.role,
    },
    {
      label: "Solution",
      icon: Lightbulb,
      body: project.solution,
    },
    {
      label: "Impact",
      icon: Sparkles,
      body: project.impact?.[0],
    },
  ];

  const openMedia = (media, title, description) => {
    setActiveMedia({
      type: media.type,
      src: media.src,
      title,
      description,
    });
  };

  return (
    <>
      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-screen bg-transparent text-slate-50 focus:outline-none"
      >
      
      <Seo
        title={`${project.title} Case Study`}
        description={project.summary}
        image={project.heroMedia?.src}
        path={`/projects/${project.id}`}
        type="article"
      />

        {/* Hero */}
        <Section spacing="compact" className="pt-32">
          <Container>
            <Reveal>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-cyan-200"
              >
                <ArrowLeft size={16} />
                Back to Portfolio
              </Link>
            </Reveal>

            <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <Reveal>
                <div>
                  <div className="flex flex-wrap gap-2">
                    <Badge>{project.eyebrow}</Badge>
                    <Badge className="border-white/10 bg-white/[0.03] text-slate-200">
                      {project.category}
                    </Badge>
                  </div>

                  <h1 className="mt-6 break-safe text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
                    {project.title}
                  </h1>

                  <p className="mt-6 text-base leading-8 text-slate-400 sm:text-lg">
                    {project.summary}
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="flex items-center gap-2 text-cyan-200">
                        <Calendar size={16} />
                        <p className="text-sm font-semibold">Year</p>
                      </div>
                      <p className="mt-2 text-slate-300">{project.year}</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="flex items-center gap-2 text-cyan-200">
                        <CheckCircle2 size={16} />
                        <p className="text-sm font-semibold">Status</p>
                      </div>
                      <p className="mt-2 text-slate-300">{project.status}</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal direction="left">
                <Card className="p-0">
                  <div className="relative overflow-hidden rounded-[1.75rem] p-4">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_26rem)]" />

                    <div className="relative z-10 flex justify-center">
                      {isMobileCaseStudy ? (
                        <PhoneMockup
                          videoSrc={project.heroMedia.src}
                          title={project.title}
                          label="Featured Demo"
                          className="max-w-[18rem] sm:max-w-[21rem]"
                          onClick={() =>
                            openMedia(
                              project.heroMedia,
                              project.title,
                              project.summary
                            )
                          }
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            openMedia(
                              project.heroMedia,
                              project.title,
                              project.summary
                            )
                          }
                          className="group block w-full text-left"
                        >
                          <MediaFrame
                            src={project.heroMedia.src}
                            type={project.heroMedia.type}
                            alt={project.heroMedia.alt}
                            className="aspect-video"
                          />
                        </button>
                      )}
                    </div>
                  </div>
                </Card>
              </Reveal>
            </div>
          </Container>
        </Section>

        {/* Recruiter Snapshot */}
        <Section spacing="compact" className="pt-0">
          <Container>
            <Reveal>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
                    Recruiter Snapshot
                  </p>

                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    The important points at a glance.
                  </h2>
                </div>

                <p className="max-w-xl text-sm leading-7 text-slate-400">
                  A quick overview of the project’s problem, my contribution,
                  solution, and value before going into the detailed previews.
                </p>
              </div>
            </Reveal>

            <StaggerContainer className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {scanCards.map((item) => {
                const Icon = item.icon;

                return (
                  <StaggerItem key={item.label}>
                    <Card className="h-full">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                        <Icon size={20} />
                      </div>

                      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
                        {item.label}
                      </p>

                      <p className="mt-4 line-clamp-5 text-sm leading-7 text-slate-400">
                        {item.body}
                      </p>
                    </Card>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </Container>
        </Section>

        {/* Context and Tech */}
        <Section spacing="compact" className="pt-0">
          <Container>
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <Reveal>
                <Card className="h-full">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
                    Project Context
                  </p>

                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                    Why this project was built
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-slate-400">
                    {project.overview}
                  </p>
                </Card>
              </Reveal>

              <Reveal delay={0.08}>
                <Card className="h-full">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
                    Technologies Used
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        className="border-white/10 bg-white/[0.03] text-slate-200"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </Reveal>
            </div>
          </Container>
        </Section>

        {/* Problem and Solution */}
        <Section spacing="compact" className="pt-0">
          <Container>
            <div className="grid gap-6 lg:grid-cols-2">
              <Reveal>
                <Card className="h-full">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
                    Problem
                  </p>

                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                    What needed to be solved
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-slate-400">
                    {project.problem}
                  </p>
                </Card>
              </Reveal>

              <Reveal delay={0.08}>
                <Card className="h-full">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
                    Solution
                  </p>

                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                    How the project approached it
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-slate-400">
                    {project.solution}
                  </p>
                </Card>
              </Reveal>
            </div>
          </Container>
        </Section>

        {/* Screens / Gallery */}
        <Section spacing="compact" className="pt-0">
          <Container>
            <Reveal>
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
                    {isDesignCaseStudy ? "Design Gallery" : "Key Screens"}
                  </p>

                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {isMobileCaseStudy
                      ? "Mobile previews in realistic phone mockups."
                      : isDesignCaseStudy
                      ? "A creative wall of interface and visual design work."
                      : "Screens and system previews."}
                  </h2>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-2xl font-semibold text-white">
                    {project.systems.length}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                    {isDesignCaseStudy ? "Works" : "Previews"}
                  </p>
                </div>
              </div>
            </Reveal>

            {isMobileCaseStudy ? (
              <MobileCaseStudyShowcase
                systems={project.systems}
                openMedia={openMedia}
              />
            ) : isDesignCaseStudy ? (
              <DesignCaseStudyShowcase
                systems={project.systems}
                openMedia={openMedia}
              />
            ) : (
              <DefaultCaseStudyShowcase
                systems={project.systems}
                openMedia={openMedia}
              />
            )}
          </Container>
        </Section>

        {/* Impact and Supporting Notes */}
        <Section spacing="compact" className="pt-0">
          <Container>
            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <Reveal>
                <Card className="h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                    <Layers size={22} />
                  </div>

                  <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
                    Impact
                  </p>

                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                    What this project demonstrates.
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-slate-400">
                    A quick summary of the project’s value, what it proves, and why it
                    matters in my portfolio.
                  </p>
                </Card>
              </Reveal>

              <div className="grid gap-6">
                <StaggerContainer className="grid gap-3">
                  {project.impact.map((item) => (
                    <StaggerItem key={item}>
                      <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-slate-300">
                        <CheckCircle2
                          size={18}
                          className="mt-1 shrink-0 text-cyan-200"
                        />
                        <span>{item}</span>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>

                {project.sections?.length > 0 && (
                  <StaggerContainer className="grid gap-4 sm:grid-cols-2">
                    {project.sections.map((section) => (
                      <StaggerItem key={section.title}>
                        <Card className="h-full">
                          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
                            {section.title}
                          </p>

                          <p className="mt-5 text-sm leading-7 text-slate-400">
                            {section.body}
                          </p>
                        </Card>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                )}
              </div>
            </div>

            <Reveal>
              <div className="mt-10 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/[0.06] p-6 sm:p-8">
                <div className="text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
                    Continue Exploring
                  </p>

                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                    Explore more project case studies.
                  </h2>

                  <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400">
                    Browse another project or return to the main portfolio to continue
                    exploring my work, experience, certifications, and activities.
                  </p>
                </div>

                <div className="mt-8 grid gap-4 lg:grid-cols-2">
                  <CaseStudyNavCard
                    label="Previous Case Study"
                    project={previousProject}
                    direction="previous"
                  />

                  <CaseStudyNavCard
                    label="Next Case Study"
                    project={nextProject}
                    direction="next"
                  />
                </div>

                <div className="mt-8 border-t border-white/10 pt-8">
                  <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                    More Case Studies
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {otherProjects.map((item) => (
                      <Link
                        key={item.id}
                        to={`/projects/${item.id}`}
                        className="group rounded-2xl border border-white/10 bg-slate-950/40 p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/[0.05]"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
                          {item.eyebrow}
                        </p>

                        <h3 className="mt-3 break-safe text-lg font-semibold tracking-tight text-white">
                          {item.title}
                        </h3>

                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
                          {item.summary}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button href="/">
                    Back to Portfolio
                    <ArrowLeft size={16} />
                  </Button>

                  <Button href="/#contact" variant="secondary">
                    Contact Me
                    <ExternalLink size={16} />
                  </Button>
                </div>
              </div>
            </Reveal>
          </Container>
        </Section>
      </main>

      <MediaLightbox
        media={activeMedia}
        onClose={() => setActiveMedia(null)}
      />
    </>
  );
}

function MobileCaseStudyShowcase({ systems, openMedia }) {
  return (
    <StaggerContainer className="mt-8 grid gap-6 lg:grid-cols-2">
      {systems.map((system) => (
        <StaggerItem key={system.name}>
          <Card className="h-full p-0">
            <div className="grid h-full gap-6 p-5 sm:p-6 xl:grid-cols-[0.8fr_1.2fr] xl:items-center">
              <div className="min-w-0">
                <Badge>
                  <Smartphone size={14} />
                  Mobile Preview
                </Badge>

                <h3 className="mt-5 break-safe text-2xl font-semibold tracking-tight text-white">
                  {system.name}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-400">
                  {system.description}
                </p>

                <p className="mt-5 rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-sm leading-6 text-slate-300">
                  Presented inside a phone mockup to better reflect the actual
                  mobile app experience.
                </p>
              </div>

              <div className="flex justify-center">
                <PhoneMockup
                  videoSrc={system.media.src}
                  title={system.name}
                  label="Tap to Expand"
                  className="max-w-[16rem] sm:max-w-[18rem] xl:max-w-[20rem]"
                  onClick={() =>
                    openMedia(system.media, system.name, system.description)
                  }
                />
              </div>
            </div>
          </Card>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

function DesignCaseStudyShowcase({ systems, openMedia }) {
  const figmaWorks = systems.filter((item) =>
    item.category?.toLowerCase().includes("figma")
  );

  const photoshopWorks = systems.filter((item) =>
    item.category?.toLowerCase().includes("photoshop")
  );

  return (
    <div className="mt-8">
      <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/[0.06] p-5 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge>
              <Palette size={14} />
              Featured UI/UX Designs
            </Badge>

            <h3 className="mt-5 text-3xl font-semibold tracking-tight text-white">
              Interface design studies.
            </h3>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
              These works highlight interface layout, user flow, visual
              hierarchy, and product presentation.
            </p>
          </div>

          <p className="text-sm text-slate-500">{figmaWorks.length} screens</p>
        </div>

        <StaggerContainer className="mt-8 grid gap-5 lg:grid-cols-2">
          {figmaWorks.map((work, index) => (
            <StaggerItem key={work.name}>
              <button
                type="button"
                onClick={() =>
                  openMedia(work.media, work.name, work.description)
                }
                className="group block w-full text-left"
              >
                <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/50 p-4 transition duration-300 group-hover:-translate-y-1 group-hover:border-cyan-300/35">
                  <MediaFrame
                    src={work.media.src}
                    type={work.media.type}
                    alt={`${work.name} preview`}
                    className={
                      index === 0
                        ? "aspect-[16/9] rounded-2xl lg:aspect-[21/9]"
                        : "aspect-[16/10] rounded-2xl"
                    }
                  />

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Badge>{work.category}</Badge>
                    <Badge className="border-white/10 bg-white/[0.03] text-slate-200">
                      0{index + 1}
                    </Badge>
                  </div>

                  <h4 className="mt-4 break-safe text-2xl font-semibold tracking-tight text-white">
                    {work.name}
                  </h4>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {work.description}
                  </p>
                </div>
              </button>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge>
              <ImageIcon size={14} />
              Photoshop Artwork Wall
            </Badge>

            <h3 className="mt-5 text-3xl font-semibold tracking-tight text-white">
              Creative editing and visual outputs.
            </h3>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
              A complete artwork wall showing Photoshop outputs, creative
              editing, image treatment, and visual communication.
            </p>
          </div>

          <p className="text-sm text-slate-500">
            {photoshopWorks.length} artworks
          </p>
        </div>

        <StaggerContainer className="mt-8 columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3">
          {photoshopWorks.map((work, index) => (
            <StaggerItem key={work.name} className="break-inside-avoid">
              <button
                type="button"
                onClick={() =>
                  openMedia(work.media, work.name, work.description)
                }
                className="group block w-full text-left"
              >
                <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/50 p-4 transition duration-300 group-hover:-translate-y-1 group-hover:border-cyan-300/35">
                  <MediaFrame
                    src={work.media.src}
                    type={work.media.type}
                    alt={`${work.name} preview`}
                    className={
                      index % 2 === 0
                        ? "aspect-[4/3] rounded-2xl"
                        : "aspect-[3/4] rounded-2xl"
                    }
                  />

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Badge>{work.category}</Badge>
                  </div>

                  <h4 className="mt-4 break-safe text-xl font-semibold tracking-tight text-white">
                    {work.name}
                  </h4>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {work.description}
                  </p>
                </div>
              </button>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}

function DefaultCaseStudyShowcase({ systems, openMedia }) {
  return (
    <StaggerContainer className="mt-8 grid gap-6 lg:grid-cols-2">
      {systems.map((system) => (
        <StaggerItem key={system.name}>
          <Card className="h-full p-0">
            <div className="p-5 sm:p-6">
              <button
                type="button"
                onClick={() =>
                  openMedia(system.media, system.name, system.description)
                }
                className="group block w-full text-left"
              >
                <MediaFrame
                  src={system.media.src}
                  type={system.media.type}
                  alt={`${system.name} preview`}
                  className="aspect-video rounded-2xl"
                />
              </button>

              <div className="mt-6 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                  <MonitorPlay size={22} />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-white">
                    {system.name}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {system.description}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

function CaseStudyNavCard({ label, project, direction }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="group flex h-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/[0.05]"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
          {label}
        </p>

        <h3 className="mt-3 break-safe text-2xl font-semibold tracking-tight text-white">
          {project.title}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">
          {project.summary}
        </p>
      </div>

      <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white transition group-hover:text-cyan-200">
        {direction === "previous" ? (
          <>
            <ArrowLeft size={16} />
            View previous
          </>
        ) : (
          <>
            View next
            <ExternalLink size={16} />
          </>
        )}
      </div>
    </Link>
  );
}

function CaseStudyLoading({ title }) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-transparent text-slate-50 focus:outline-none"
    >
      <Section spacing="hero">
        <Container>
          <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-cyan-200 border-t-transparent" />
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
              Loading Case Study
            </p>

            <h1 className="mt-4 break-safe text-3xl font-semibold tracking-tight text-white">
              {title}
            </h1>

            <p className="mt-4 text-sm leading-7 text-slate-400">
              Preparing the project layout and media previews.
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}