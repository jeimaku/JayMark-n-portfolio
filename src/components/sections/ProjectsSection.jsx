import { useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  ExternalLink,
  Layers,
  Palette,
  Play,
  Smartphone,
} from "lucide-react";

import Container from "../layout/Container";
import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import MediaFrame from "../ui/MediaFrame";
import MediaLightbox from "../ui/MediaLightbox";
import PhoneMockup from "../ui/PhoneMockup";
import LazyVideo from "../ui/LazyVideo";
import Reveal from "../animation/Reveal";
import StaggerContainer, { StaggerItem } from "../animation/StaggerContainer";

import {
  featuredProjects,
  internshipSystems,
  mobileProjects,
  designProjects,
  homepageContent,
  assetPaths,
} from "../../data";

export default function ProjectsSection() {
  const [activeMedia, setActiveMedia] = useState(null);

  const featuredProject = featuredProjects.find((project) =>
    homepageContent.featuredProjectIds.includes(project.id)
  );

  const internshipSystemPreviews = homepageContent.internshipSystemPreviewIds
    .map((id) => internshipSystems.systems.find((system) => system.id === id))
    .filter(Boolean);

  const mobileProjectPreviews = homepageContent.mobileProjectPreviewIds
    .map((id) => mobileProjects.find((project) => project.id === id))
    .filter(Boolean);

  const figmaDesigns = designProjects.figma;
  const photoshopWorks = designProjects.photoshop;

  const caseStudyLinks = {
    internshipSystems: "/projects/internship-systems",
    talkready: "/projects/talkready",
    mobileApplications: "/projects/mobile-applications",
    uiUxDesigns: "/projects/ui-ux-designs",
  };

  const mobileDemoMap = {
    "talkready-mobile": [
      {
        label: "Student Dashboard",
        src:
          assetPaths.projects.mobileApps?.talkreadyMobile
            ?.studentDashboardVideo ||
          assetPaths.projects.talkreadyMobile?.studentDashboardVideo,
      },
      {
        label: "Trainer Dashboard",
        src:
          assetPaths.projects.mobileApps?.talkreadyMobile
            ?.trainerDashboardVideo ||
          assetPaths.projects.talkreadyMobile?.trainerDashboardVideo,
      },
    ],

    "eborrw-nu": [
      {
        label: "Borrower Interface",
        src:
          assetPaths.projects.mobileApps?.eborrwNu?.borrowerInterfaceVideo ||
          assetPaths.projects.eborrwNu?.borrowerInterfaceVideo,
      },
      {
        label: "IT Admin Panel",
        src:
          assetPaths.projects.mobileApps?.eborrwNu?.itAdminPanelVideo ||
          assetPaths.projects.eborrwNu?.itAdminPanelVideo,
      },
    ],
  };

  const getMobileDemos = (project) => {
    const demos = mobileDemoMap[project.id];

    if (demos?.length) {
      return demos.filter((demo) => demo.src);
    }

    return project.media?.video
      ? [
          {
            label: "Demo Video",
            src: project.media.video,
          },
        ]
      : [];
  };

  return (
    <>
      <Section id="projects" spacing="compact">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Projects"
                title="Systems, applications, and digital product work."
                description="A focused collection of real internship systems, full-stack platforms, mobile applications, UI/UX designs, and creative outputs."
              />

              <Button
                href="#contact"
                variant="secondary"
                className="w-full sm:w-fit"
              >
                Discuss a Project
                <ArrowRight size={16} />
              </Button>
            </div>
          </Reveal>

          {/* Internship Systems — Primary Showcase */}
          <Reveal className="mt-12 lg:mt-14">
            <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/[0.06] p-5 sm:p-6 lg:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <Badge>
                    <BriefcaseBusiness size={14} />
                    Internship Systems Suite
                  </Badge>

                  <h3 className="mt-5 break-safe text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                    Real company systems built during internship.
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base md:text-lg md:leading-8">
                    These systems were developed for actual company workflows,
                    including CRM pipeline tracking, virtual office management,
                    ticket support, and inventory monitoring. Because these were
                    built for real operational use, they are given a stronger
                    showcase in this portfolio.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
                    <p className="text-3xl font-semibold text-white">
                      {internshipSystemPreviews.length}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">
                      Systems Developed
                    </p>
                  </div>

                  <Button
                    href={caseStudyLinks.internshipSystems}
                    variant="secondary"
                    className="w-full sm:w-auto lg:w-full"
                  >
                    View Case Study
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </div>

              <StaggerContainer className="mt-8 grid gap-5 lg:grid-cols-2">
                {internshipSystemPreviews.map((system) => (
                  <StaggerItem key={system.id}>
                    <Card className="h-full p-0">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveMedia({
                            type: "video",
                            src: system.media?.video,
                            title: system.name,
                            description:
                              system.tagline || system.description,
                          })
                        }
                        className="group block w-full text-left"
                      >
                        <div className="relative overflow-hidden rounded-t-[1.75rem] border-b border-white/10 bg-black">
                          {system.media?.video ? (
                            <LazyVideo
                              src={system.media.video}
                              poster={system.media?.cover}
                              className="aspect-video w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload="metadata"
                              lazy
                            />
                          ) : (
                            <MediaFrame
                              src={system.media?.cover}
                              alt={`${system.name} system preview`}
                              className="aspect-video rounded-none border-0"
                            />
                          )}

                          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20 opacity-100 transition group-hover:bg-slate-950/10">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-slate-950/70 text-white shadow-2xl backdrop-blur">
                              <Play size={24} fill="currentColor" />
                            </div>
                          </div>

                          <div className="absolute left-4 top-4 rounded-full border border-cyan-300/20 bg-slate-950/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100 backdrop-blur">
                            Click to expand
                          </div>
                        </div>

                        <div className="p-5 sm:p-6">
                          <div className="flex flex-wrap gap-2">
                            <Badge>{system.category}</Badge>
                            <Badge className="border-white/10 bg-white/[0.03] text-slate-200">
                              {system.type}
                            </Badge>
                          </div>

                          <h4 className="mt-5 break-safe text-2xl font-semibold tracking-tight text-white">
                            {system.name}
                          </h4>

                          <p className="mt-3 text-sm leading-7 text-cyan-100/80">
                            {system.tagline}
                          </p>

                          <p className="mt-4 text-sm leading-7 text-slate-400">
                            {system.description}
                          </p>

                          {system.keyFeatures?.length > 0 && (
                            <div className="mt-5 grid gap-2 sm:grid-cols-2">
                              {system.keyFeatures.slice(0, 4).map((feature) => (
                                <div
                                  key={feature}
                                  className="rounded-2xl border border-white/10 bg-white/[0.025] p-3 text-sm leading-6 text-slate-300"
                                >
                                  {feature}
                                </div>
                              ))}
                            </div>
                          )}

                          {system.tech?.length > 0 && (
                            <div className="mt-5 flex flex-wrap gap-2">
                              {system.tech.slice(0, 5).map((tech) => (
                                <Badge
                                  key={tech}
                                  className="border-white/10 bg-white/[0.03] text-slate-200"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </button>
                    </Card>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </Reveal>

          {/* TalkReady — Secondary Featured Project */}
          {featuredProject && (
            <StaggerContainer className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <StaggerItem>
                <Card className="flex h-full flex-col">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                      <Layers size={22} />
                    </div>

                    <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
                      Capstone Project
                    </p>

                    <h3 className="mt-4 break-safe text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      {featuredProject.title}
                    </h3>

                    <p className="mt-3 text-lg font-medium text-cyan-200">
                      {featuredProject.subtitle}
                    </p>

                    <p className="mt-5 text-sm leading-7 text-slate-400">
                      {featuredProject.description}
                    </p>

                    {featuredProject.results?.length > 0 && (
                      <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                        {featuredProject.results.map((result) => (
                          <div
                            key={result.label}
                            className="rounded-2xl border border-white/10 bg-white/[0.025] p-4"
                          >
                            <p className="break-safe text-xl font-semibold text-white">
                              {result.value}
                            </p>
                            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                              {result.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {featuredProject.highlights?.length > 0 && (
                      <div className="mt-7 grid gap-3">
                        {featuredProject.highlights
                          .slice(0, 4)
                          .map((highlight) => (
                            <div
                              key={highlight}
                              className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-sm leading-6 text-slate-300"
                            >
                              {highlight}
                            </div>
                          ))}
                      </div>
                    )}

                    <div className="mt-7 flex flex-wrap gap-2">
                      {featuredProject.tech.map((tech) => (
                        <Badge
                          key={tech}
                          className="border-white/10 bg-white/[0.03] text-slate-200"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:flex-wrap">
                    {featuredProject.links?.live && (
                      <Button
                        href={featuredProject.links.live}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="w-full sm:w-auto"
                      >
                        View Live
                        <ExternalLink size={16} />
                      </Button>
                    )}

                    {featuredProject.links?.github && (
                      <Button
                        href={featuredProject.links.github}
                        variant="secondary"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="w-full sm:w-auto"
                      >
                        Source Code
                        <ArrowRight size={16} />
                      </Button>
                    )}

                    <Button
                      href={caseStudyLinks.talkready}
                      variant="ghost"
                      className="w-full sm:w-auto"
                    >
                      View Case Study
                      <ArrowRight size={16} />
                    </Button>

                  </div>
                </Card>
              </StaggerItem>

              <StaggerItem>
                <Card className="h-full p-0">
                  <div className="relative h-full overflow-hidden rounded-[1.75rem]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_28rem)]" />

                    <div className="relative z-10 flex h-full flex-col p-5 sm:p-6">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveMedia({
                            type: "image",
                            src: featuredProject.media?.cover,
                            title: `${featuredProject.title} landing page`,
                          })
                        }
                        className="block text-left"
                      >
                      <MediaFrame
                        src={featuredProject.media?.cover}
                        alt={`${featuredProject.title} project cover`}
                        className="aspect-[16/10]"
                        eager
                      />
                      </button>

                      {featuredProject.media?.gallery?.length > 0 && (
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          {featuredProject.media.gallery
                            .slice(0, 4)
                            .map((item) => (
                              <button
                                key={item.src}
                                type="button"
                                onClick={() =>
                                  setActiveMedia({
                                    type: "image",
                                    src: item.src,
                                    title: item.alt,
                                  })
                                }
                                className="group block text-left"
                              >
                                <MediaFrame
                                  src={item.src}
                                  alt={item.alt}
                                  className="aspect-[4/3] rounded-2xl"
                                />
                              </button>
                            ))}
                        </div>
                      )}

                      <p className="mt-5 rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-sm leading-6 text-slate-400">
                        Click any TalkReady preview to view it in a larger
                        in-page preview.
                      </p>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerContainer>
          )}

          {/* Mobile Applications — Phone Mockup Showcase */}
          <Reveal className="mt-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6 lg:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <Badge>
                    <Smartphone size={14} />
                    Mobile Applications
                  </Badge>

                  <h3 className="mt-5 break-safe text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                    Mobile app previews inside interactive phone mockups.
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base md:text-lg md:leading-8">
                    These mobile projects are displayed through autoplay phone
                    mockups so visitors can immediately see the app flow,
                    interface structure, and user experience without leaving the
                    portfolio.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
                    <p className="text-3xl font-semibold text-white">
                      {mobileProjectPreviews.length}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">
                      Mobile Projects
                    </p>
                  </div>

                  <Button
                    href={caseStudyLinks.mobileApplications}
                    variant="secondary"
                    className="w-full sm:w-auto lg:w-full"
                  >
                    View Case Study
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </div>

              <StaggerContainer className="mt-8 grid gap-6">
                {mobileProjectPreviews.map((project) => {
                  const demos = getMobileDemos(project);

                  return (
                    <StaggerItem key={project.id}>
                      <Card className="h-full p-0">
                        <div className="flex h-full flex-col p-5 sm:p-6 lg:p-7">
                          <div className="min-w-0">
                            <div className="flex flex-wrap gap-2">
                              <Badge>{project.category}</Badge>
                              <Badge className="border-white/10 bg-white/[0.03] text-slate-200">
                                {project.type}
                              </Badge>
                            </div>

                            <h4 className="mt-5 break-safe text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                              {project.title}
                            </h4>

                            {project.subtitle && (
                              <p className="mt-3 text-sm font-medium leading-6 text-cyan-200 sm:text-base">
                                {project.subtitle}
                              </p>
                            )}

                            <p className="mt-4 text-sm leading-7 text-slate-400">
                              {project.description}
                            </p>

                            {project.highlights?.length > 0 && (
                              <div className="mt-5 grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                                {project.highlights
                                  .slice(0, 3)
                                  .map((highlight) => (
                                    <div
                                      key={highlight}
                                      className="rounded-2xl border border-white/10 bg-white/[0.025] p-3 text-sm leading-6 text-slate-300"
                                    >
                                      {highlight}
                                    </div>
                                  ))}
                              </div>
                            )}

                            {project.tech?.length > 0 && (
                              <div className="mt-5 flex flex-wrap gap-2">
                                {project.tech.map((tech) => (
                                  <Badge
                                    key={tech}
                                    className="border-white/10 bg-white/[0.03] text-slate-200"
                                  >
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="mt-8 border-t border-white/10 pt-8">
                            <div className="grid gap-6 sm:grid-cols-2 sm:items-start sm:justify-items-center">
                              {demos.map((demo) => (
                                <PhoneMockup
                                  key={demo.label}
                                  title={project.title}
                                  label={demo.label}
                                  videoSrc={demo.src}
                                  className="max-w-[16rem] sm:max-w-[18rem] md:max-w-[20rem] lg:max-w-[21rem]"
                                  onClick={() =>
                                    setActiveMedia({
                                      type: "video",
                                      src: demo.src,
                                      title: `${project.title} — ${demo.label}`,
                                      description: project.description,
                                    })
                                  }
                                />
                              ))}
                            </div>

                            <p className="mt-5 text-center text-xs uppercase tracking-[0.22em] text-slate-600">
                              Tap a phone preview to expand
                            </p>
                          </div>
                        </div>
                      </Card>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </Reveal>

          {/* UI/UX & Creative Work — Showcase Upgrade */}
          <Reveal className="mt-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6 lg:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <Badge>
                    <Palette size={14} />
                    UI/UX & Creative Work
                  </Badge>

                  <h3 className="mt-5 break-safe text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                    UI/UX designs and creative visuals made more visible.
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base md:text-lg md:leading-8">
                    This section highlights interface design, visual layout,
                    creative direction, and Photoshop-based outputs. UI/UX
                    designs are shown as larger previews, while Photoshop works
                    are displayed as a complete clickable gallery.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
                    <p className="text-3xl font-semibold text-white">
                      {figmaDesigns.length + photoshopWorks.length}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">
                      Design Works
                    </p>
                  </div>

                  <Button
                    href={caseStudyLinks.uiUxDesigns}
                    variant="secondary"
                    className="w-full sm:w-auto lg:w-full"
                  >
                    View Case Study
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </div>

              {/* Featured UI/UX Designs */}
              <StaggerContainer className="mt-8 grid gap-6 lg:grid-cols-2">
                {figmaDesigns.map((project) => (
                  <StaggerItem key={project.id}>
                    <Card className="h-full p-0">
                      <div className="flex h-full flex-col p-5 sm:p-6">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveMedia({
                              type: "image",
                              src: project.image,
                              title: project.title,
                              description: project.description,
                            })
                          }
                          className="group block text-left"
                        >
                          <MediaFrame
                            src={project.image}
                            alt={`${project.title} design preview`}
                            className="aspect-[16/10] rounded-2xl"
                          />
                        </button>

                        <div className="mt-6 flex flex-wrap gap-2">
                          <Badge>{project.category}</Badge>
                          <Badge className="border-white/10 bg-white/[0.03] text-slate-200">
                            {project.type}
                          </Badge>
                        </div>

                        <h4 className="mt-5 break-safe text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                          {project.title}
                        </h4>

                        <p className="mt-4 text-sm leading-7 text-slate-400">
                          {project.description}
                        </p>

                        {project.tools?.length > 0 && (
                          <div className="mt-5 flex flex-wrap gap-2">
                            {project.tools.map((tool) => (
                              <Badge
                                key={tool}
                                className="border-white/10 bg-white/[0.03] text-slate-200"
                              >
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {project.gallery?.length > 0 && (
                          <div className="mt-6 border-t border-white/10 pt-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                              Design Screens
                            </p>

                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                              {project.gallery.map((item) => (
                                <button
                                  key={item.src}
                                  type="button"
                                  onClick={() =>
                                    setActiveMedia({
                                      type: "image",
                                      src: item.src,
                                      title: item.alt,
                                      description: project.description,
                                    })
                                  }
                                  className="group block text-left"
                                >
                                  <MediaFrame
                                    src={item.src}
                                    alt={item.alt}
                                    className="aspect-[4/3] rounded-xl"
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* Photoshop Gallery */}
              <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
                      Photoshop Works
                    </p>

                    <h4 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                      Complete creative artwork gallery.
                    </h4>
                  </div>

                  <p className="text-sm text-slate-500">
                    {photoshopWorks.length} artworks
                  </p>
                </div>

                <StaggerContainer className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {photoshopWorks.map((project) => (
                    <StaggerItem key={project.id}>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveMedia({
                            type: "image",
                            src: project.image,
                            title: project.title,
                            description: project.description,
                          })
                        }
                        className="group block w-full text-left"
                      >
                        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition duration-300 group-hover:-translate-y-1 group-hover:border-cyan-300/30 group-hover:bg-white/[0.045]">
                          <MediaFrame
                            src={project.image}
                            alt={`${project.title} preview`}
                            className="aspect-[4/3] rounded-xl"
                          />

                          <div className="mt-4 flex flex-wrap gap-2">
                            <Badge className="border-white/10 bg-white/[0.03] text-slate-200">
                              {project.category}
                            </Badge>
                          </div>

                          <h5 className="mt-3 break-safe font-semibold text-white">
                            {project.title}
                          </h5>

                          <p className="mt-2 text-sm leading-6 text-slate-400">
                            {project.description}
                          </p>
                        </div>
                      </button>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <MediaLightbox
        media={activeMedia}
        onClose={() => setActiveMedia(null)}
      />
    </>
  );
}