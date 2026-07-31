export const caseStudyPages = [
  {
    id: "talkready",
    title: "TalkReady",
    eyebrow: "AI-Assisted Learning Platform",
    description:
      "A role-based language and speaking platform combining AI-assisted assessment, administration, evaluation, and research.",
    href: "/projects/talkready",
  },
  {
    id: "internship-systems",
    title: "Internship Systems Suite",
    eyebrow: "Operational Systems",
    description:
      "Four internal applications supporting CRM, virtual-office, support-ticket, and inventory workflows.",
    href: "/projects/internship-systems",
  },
];

export function getCaseStudyNeighbors(currentId) {
  const currentIndex = caseStudyPages.findIndex(
    (project) => project.id === currentId
  );

  if (currentIndex === -1 || caseStudyPages.length <= 1) {
    return {
      previousProject: null,
      nextProject: null,
    };
  }

  /*
   * With only two rebuilt case studies, displaying both a
   * previous and next card would produce the same destination.
   * Show only one continuation card until more projects are rebuilt.
   */
  if (caseStudyPages.length === 2) {
    return {
      previousProject: null,
      nextProject:
        caseStudyPages[
          currentIndex === 0 ? 1 : 0
        ],
    };
  }

  return {
    previousProject:
      caseStudyPages[
        (currentIndex - 1 + caseStudyPages.length) %
          caseStudyPages.length
      ],

    nextProject:
      caseStudyPages[
        (currentIndex + 1) %
          caseStudyPages.length
      ],
  };
}