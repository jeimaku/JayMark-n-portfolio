import { assetPaths } from "./assets";

export const certifications = [
  {
    id: "installing-configuring-computer-systems",
    name: "Installing and Configuring Computer Systems",
    provider: "TESDA Online Program",
    category: "IT Systems",
    year: "2024",

    image:
      assetPaths.certifications
        .installingConfiguringComputerSystems
        .image,

    download:
      assetPaths.certifications
        .installingConfiguringComputerSystems
        .pdf,
  },

  {
    id: "introduction-to-css",
    name: "Introduction to CSS",
    provider: "TESDA Online Program",
    category: "Web Development",
    year: "2024",

    image:
      assetPaths.certifications
        .introductionToCss
        .image,

    download:
      assetPaths.certifications
        .introductionToCss
        .pdf,
  },

  {
    id: "maintaining-computer-systems-and-networks",
    name: "Maintaining Computer Systems and Networks",
    provider: "TESDA Online Program",
    category: "IT Support",
    year: "2024",

    image:
      assetPaths.certifications
        .maintainingComputerSystemsAndNetworks
        .image,

    download:
      assetPaths.certifications
        .maintainingComputerSystemsAndNetworks
        .pdf,
  },

  {
    id: "setting-up-computer-networks",
    name: "Setting Up Computer Networks",
    provider: "TESDA Online Program",
    category: "Networking",
    year: "2024",

    image:
      assetPaths.certifications
        .settingUpComputerNetworks
        .image,

    download:
      assetPaths.certifications
        .settingUpComputerNetworks
        .pdf,
  },

  {
    id: "setting-up-computer-servers",
    name: "Setting Up Computer Servers",
    provider: "TESDA Online Program",
    category: "Server Administration",
    year: "2024",

    image:
      assetPaths.certifications
        .settingUpComputerServers
        .image,

    download:
      assetPaths.certifications
        .settingUpComputerServers
        .pdf,
  },

  {
    id: "smart-android-mobile-apps-development-for-beginners",
    name:
      "SMART Android Mobile Apps Development for Beginners",
    provider: "TESDA Online Program",
    category: "Mobile Development",
    year: "2024",

    image:
      assetPaths.certifications
        .smartAndroidMobileAppsDevelopment
        .image,

    download:
      assetPaths.certifications
        .smartAndroidMobileAppsDevelopment
        .pdf,
  },

  {
    id: "smart-technopreneurship-101",
    name: "SMART Technopreneurship 101",
    provider: "TESDA Online Program",
    category: "Technopreneurship",
    year: "2024",

    image:
      assetPaths.certifications
        .smartTechnopreneurship
        .image,

    download:
      assetPaths.certifications
        .smartTechnopreneurship
        .pdf,
  },
];

/*
 * Centralized content used by the homepage
 * Certifications section.
 */
export const certificationShowcase = {
  eyebrow: "Certifications",

  title:
    "Credentials supporting my development and infrastructure experience.",

  description:
    "A collection of professional certificates covering computer systems, IT support, networking, server administration, web development, mobile applications, and technopreneurship.",

  defaultCertificationId:
    certifications[0]?.id ?? "",

  totalCertificates:
    certifications.length,

  totalProviders:
    new Set(
      certifications
        .map(
          (certification) =>
            certification.provider
        )
        .filter(Boolean)
    ).size,
};

/*
 * Generate the filters directly from the data.
 * Adding a new category later will automatically
 * make it available in the Certifications section.
 */
export const certificationCategories = [
  {
    id: "all",
    label: "All Credentials",
  },

  ...[
    ...new Set(
      certifications
        .map(
          (certification) =>
            certification.category
        )
        .filter(Boolean)
    ),
  ].map((category) => ({
    id: category
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),

    label: category,
  })),
];

/*
 * Returns a certificate by its stable ID.
 */
export function getCertificationById(
  certificationId
) {
  return (
    certifications.find(
      (certification) =>
        certification.id ===
        certificationId
    ) ?? null
  );
}

/*
 * Returns the previous and next certificates
 * for the gallery navigation controls.
 */
export function getCertificationNeighbors(
  certificationId
) {
  const currentIndex =
    certifications.findIndex(
      (certification) =>
        certification.id ===
        certificationId
    );

  if (currentIndex < 0) {
    return {
      previousCertification: null,
      nextCertification: null,
    };
  }

  const previousIndex =
    currentIndex === 0
      ? certifications.length - 1
      : currentIndex - 1;

  const nextIndex =
    currentIndex ===
    certifications.length - 1
      ? 0
      : currentIndex + 1;

  return {
    previousCertification:
      certifications[previousIndex] ??
      null,

    nextCertification:
      certifications[nextIndex] ??
      null,
  };
}

/*
 * Returns all certificates belonging to a
 * selected category. "all" returns everything.
 */
export function getCertificationsByCategory(
  categoryId
) {
  if (
    !categoryId ||
    categoryId === "all"
  ) {
    return certifications;
  }

  return certifications.filter(
    (certification) => {
      const normalizedCategory =
        certification.category
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");

      return (
        normalizedCategory ===
        categoryId
      );
    }
  );
}