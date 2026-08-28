import { useState } from "react";
import {
  Camera,
  Calendar,
  ExternalLink,
  Film,
  Image,
  Play,
  Sparkles,
} from "lucide-react";

import Container from "../layout/Container";
import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import MediaFrame from "../ui/MediaFrame";
import MediaLightbox from "../ui/MediaLightbox";
import Reveal from "../animation/Reveal";
import StaggerContainer, { StaggerItem } from "../animation/StaggerContainer";

import { activities } from "../../data";

const iconMap = {
  video: Film,
  photo: Camera,
};

export default function ActivitiesSection() {
  const [activeMedia, setActiveMedia] = useState(null);

  const openActivityMedia = (activity) => {
    const hasVideo = Boolean(activity.video);

    setActiveMedia({
      type: hasVideo ? "video" : "image",
      src: hasVideo ? activity.video : activity.preview,
      title: activity.title,
      description: activity.caption,
    });
  };

  return (
    <>
      <Section id="activities" spacing="compact">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <Reveal className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="Activities"
                title="Creative work, campus involvement, and work beyond code."
                description="Beyond software development, I have also worked on video editing, photography, event coverage, and creative media outputs for academic and campus activities."
              />

              <div className="mt-8 rounded-[1.75rem] border border-neutral-100/20 bg-neutral-100/10 p-5 sm:p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-100/25 bg-neutral-950/50 text-white">
                  <Sparkles size={22} />
                </div>

                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.25em] text-white">
                  Creative Side
                </p>

                <p className="mt-4 break-safe text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  Design, storytelling, and visual communication.
                </p>

                <p className="mt-4 text-sm leading-7 text-neutral-400">
                  These activities show the creative side of my academic journey,
                  including editing, photography, organization content, and event
                  documentation.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-neutral-950/40 p-4">
                    <p className="text-2xl font-semibold text-white">
                      {activities.length}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-neutral-500">
                      Activities
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-neutral-950/40 p-4">
                    <p className="text-2xl font-semibold text-white">Media</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-neutral-500">
                      Focus
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="min-w-0">
              <StaggerContainer className="grid gap-5">
                {activities.map((activity, index) => {
                  const Icon = iconMap[activity.type] || Image;
                  const hasVideo = Boolean(activity.video);

                  return (
                    <StaggerItem key={activity.id}>
                      <Card>
                        <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:gap-6">
                          <button
                            type="button"
                            onClick={() => openActivityMedia(activity)}
                            className="group relative block text-left"
                          >
                            <MediaFrame
                              src={activity.preview}
                              alt={`${activity.title} preview`}
                              className="aspect-[16/10] rounded-2xl"
                            />

                            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-neutral-950/10 transition group-hover:bg-neutral-950/20">
                              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-neutral-950/70 text-white shadow-2xl backdrop-blur">
                                {hasVideo ? (
                                  <Play size={22} fill="currentColor" />
                                ) : (
                                  <Image size={22} />
                                )}
                              </div>
                            </div>

                            <div className="absolute left-4 top-4 rounded-full border border-neutral-100/20 bg-neutral-950/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-100 backdrop-blur">
                              {hasVideo ? "Play in page" : "View in page"}
                            </div>
                          </button>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge>{activity.type}</Badge>

                              <Badge className="gap-2 border-white/10 bg-white/[0.03] text-neutral-200">
                                <Calendar size={13} />
                                {activity.date}
                              </Badge>

                              <Badge className="border-white/10 bg-white/[0.03] text-neutral-200">
                                0{index + 1}
                              </Badge>
                            </div>

                            <div className="mt-5 flex items-start gap-4">
                              <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-neutral-100/20 bg-neutral-100/10 text-white sm:flex">
                                <Icon size={22} />
                              </div>

                              <div className="min-w-0">
                                <h3 className="break-safe text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                                  {activity.title}
                                </h3>

                                <p className="mt-4 text-sm leading-7 text-neutral-400 md:text-base">
                                  {activity.caption}
                                </p>
                              </div>
                            </div>

                            {activity.credits && (
                              <p className="mt-5 break-safe rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-sm leading-6 text-neutral-300">
                                {activity.credits}
                              </p>
                            )}

                            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                              <Button
                                type="button"
                                onClick={() => openActivityMedia(activity)}
                                size="sm"
                                variant="secondary"
                                className="w-full sm:w-auto"
                              >
                                {hasVideo ? "Play Media" : "View Media"}
                                {hasVideo ? (
                                  <Play size={14} />
                                ) : (
                                  <ExternalLink size={14} />
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </div>
        </Container>
      </Section>

      <MediaLightbox
        media={activeMedia}
        onClose={() => setActiveMedia(null)}
      />
    </>
  );
}