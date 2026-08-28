import {
  ArrowRight,
  Download,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  Sparkles,
} from "lucide-react";

import Container from "../layout/Container";
import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import SocialLink from "../ui/SocialLink";
import Reveal from "../animation/Reveal";
import StaggerContainer, { StaggerItem } from "../animation/StaggerContainer";

import { profile } from "../../data";

const contactCards = [
  {
    label: "Personal Email",
    value: profile.emails.personal,
    href: `mailto:${profile.emails.personal}`,
    icon: Mail,
  },
  {
    label: "School Email",
    value: profile.emails.school,
    href: `mailto:${profile.emails.school}`,
    icon: Mail,
  },
  {
    label: "Location",
    value: profile.location,
    href: "https://maps.google.com/?q=Dasmarinas+City+Cavite",
    icon: MapPin,
  },
];

export default function ContactSection() {
  return (
    <Section id="contact" spacing="compact" className="pb-24 sm:pb-28">
      <Container>
        <Reveal>
          <Card className="p-0">
            <div className="relative overflow-hidden rounded-[1.75rem]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_28rem)]" />

              <div className="relative z-10 grid gap-8 p-5 sm:p-6 md:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:p-10">
                <div className="min-w-0">
                  <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-neutral-100/20 bg-neutral-100/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white sm:tracking-[0.28em]">
                    <Sparkles size={14} />
                    Contact
                  </div>

                  <SectionHeading
                    title="Let’s build something practical and meaningful."
                    description="Interested in reviewing my work, discussing a project, or connecting professionally? You can reach me through email, GitHub, or LinkedIn."
                  />

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Button
                      href={`mailto:${profile.emails.personal}`}
                      className="w-full sm:w-auto"
                    >
                      Send Email
                      <Send size={16} />
                    </Button>

                    <Button
                      href={profile.resume.primary}
                      target="_blank"
                      rel="noreferrer noopener"
                      variant="secondary"
                      className="w-full sm:w-auto"
                    >
                      View Resume
                      <Download size={16} />
                    </Button>

                    <Button
                      href="#projects"
                      variant="ghost"
                      className="w-full sm:w-auto"
                    >
                      View Work
                      <ArrowRight size={16} />
                    </Button>
                  </div>

                  <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-neutral-950/40 p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white">
                      Current Focus
                    </p>

                    <p className="mt-3 text-sm leading-7 text-neutral-400">
                      I’m currently focused on improving my full-stack
                      development, IT systems, AI integration, and clean UI/UX
                      skills through practical projects and real workflow-based
                      systems.
                    </p>
                  </div>
                </div>

                <div className="min-w-0 space-y-5">
                  <StaggerContainer className="grid gap-4" delay={0.15}>
                    {contactCards.map((item) => {
                      const Icon = item.icon;
                      const isExternal = item.href.startsWith("http");

                      return (
                        <StaggerItem key={item.label}>
                          <a
                            href={item.href}
                            target={isExternal ? "_blank" : undefined}
                            rel={
                              isExternal ? "noreferrer noopener" : undefined
                            }
                            className="group block rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-5 transition hover:border-neutral-100/30 hover:bg-white/[0.05]"
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-neutral-100/20 bg-neutral-100/10 text-white">
                                <Icon size={21} />
                              </div>

                              <div className="min-w-0">
                                <p className="text-sm font-medium text-neutral-500">
                                  {item.label}
                                </p>

                                <p className="break-safe mt-1 font-semibold text-white">
                                  {item.value}
                                </p>
                              </div>
                            </div>
                          </a>
                        </StaggerItem>
                      );
                    })}
                  </StaggerContainer>

                  <Reveal delay={0.2}>
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-5">
                      <div className="flex items-start gap-3 sm:items-center">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-neutral-100/20 bg-neutral-100/10 text-white">
                          <MessageSquare size={21} />
                        </div>

                        <div className="min-w-0">
                          <p className="font-semibold text-white">
                            Professional Links
                          </p>
                          <p className="mt-1 text-sm leading-6 text-neutral-400">
                            Connect with me or review my work online.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-3">
                        {profile.contactLinks.map((link) => (
                          <SocialLink key={link.label} link={link} />
                        ))}
                      </div>
                    </div>
                  </Reveal>

                  <Reveal delay={0.25}>
                    <div className="flex flex-wrap gap-2">
                      {profile.highlights.slice(0, 4).map((highlight) => (
                        <Badge
                          key={highlight}
                          className="border-white/10 bg-white/[0.03] text-neutral-200"
                        >
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </Card>
        </Reveal>
      </Container>
    </Section>
  );
}