import {
  Award,
  BookOpenCheck,
  Download,
  ExternalLink,
  Network,
  Server,
  Smartphone,
  Wrench,
} from "lucide-react";

import Container from "../layout/Container";
import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import MediaFrame from "../ui/MediaFrame";
import Reveal from "../animation/Reveal";
import StaggerContainer, { StaggerItem } from "../animation/StaggerContainer";

import { certifications } from "../../data";

const iconMap = {
  "IT Systems": Wrench,
  "Web Development": BookOpenCheck,
  "IT Support": Wrench,
  Networking: Network,
  "Server Administration": Server,
  "Mobile Development": Smartphone,
  Technopreneurship: Award,
};

export default function CertificationsSection() {
const displayedCertifications = certifications;

  return (
    <Section id="certifications" spacing="compact">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Certifications"
              title="Technical certifications and continuous learning."
              description="A collection of training achievements that support my background in web development, IT support, networking, servers, mobile development, and technopreneurship."
            />

            <div className="mt-8 rounded-[1.75rem] border border-neutral-100/20 bg-neutral-100/10 p-5 sm:p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-100/25 bg-neutral-950/50 text-white">
                <Award size={22} />
              </div>

              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.25em] text-white">
                Credential Focus
              </p>

              <p className="mt-4 break-safe text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Strengthening the technical foundation behind my projects.
              </p>

              <p className="mt-4 text-sm leading-7 text-neutral-400">
                These certifications show my continuous learning across core IT
                areas, from computer systems and networks to mobile applications
                and web development.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-neutral-950/40 p-4">
                  <p className="break-safe text-2xl font-semibold text-white">
                    {certifications.length}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-neutral-500">
                    Total Certificates
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-neutral-950/40 p-4">
                  <p className="break-safe text-2xl font-semibold text-white">
                    TESDA
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-neutral-500">
                    Provider
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="min-w-0">
            <StaggerContainer className="grid gap-5 sm:grid-cols-2">
              {displayedCertifications.map((certification) => {
                const Icon = iconMap[certification.category] || Award;

                return (
                  <StaggerItem key={certification.id}>
                    <Card className="h-full">
                      <MediaFrame
                        src={certification.image}
                        alt={`${certification.name} certificate preview`}
                        className="mb-6 aspect-[4/3] rounded-2xl"
                        mediaClassName="object-contain bg-white"
                      />

                      <div className="flex items-start justify-between gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-neutral-100/20 bg-neutral-100/10 text-white">
                          <Icon size={22} />
                        </div>

                        <Badge className="border-white/10 bg-white/[0.03] text-neutral-200">
                          {certification.year}
                        </Badge>
                      </div>

                      <Badge className="mt-6">{certification.category}</Badge>

                      <h3 className="mt-5 break-safe text-lg font-semibold tracking-tight text-white sm:text-xl">
                        {certification.name}
                      </h3>

                      <p className="mt-4 break-safe text-sm leading-6 text-neutral-400">
                        {certification.provider}
                      </p>

                      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        {certification.download && (
                          <Button
                            href={certification.download}
                            variant="secondary"
                            size="sm"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="w-full sm:w-auto"
                          >
                            View PDF
                            <Download size={14} />
                          </Button>
                        )}

                        {certification.image && (
                          <Button
                            href={certification.image}
                            variant="ghost"
                            size="sm"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="w-full sm:w-auto"
                          >
                            Preview Image
                            <ExternalLink size={14} />
                          </Button>
                        )}
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
  );
}