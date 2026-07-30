export const homepageSections = [
  {
    id: "about",
    label: "About",
    eyebrow: "About Me",
  },
  {
    id: "skills",
    label: "Skills",
    eyebrow: "Capabilities",
  },
  {
    id: "projects",
    label: "Projects",
    eyebrow: "Selected Work",
  },
  {
    id: "experience",
    label: "Experience",
    eyebrow: "Professional Journey",
  },
  {
    id: "contact",
    label: "Contact",
    eyebrow: "Let’s Connect",
  },
];

export const homepageSectionIds = homepageSections.map(
  (section) => section.id
);

export function getHomepageSection(sectionId) {
  return (
    homepageSections.find(
      (section) => section.id === sectionId
    ) ?? null
  );
}