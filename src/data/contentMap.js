export const homepageContent = {
  heroSkillLimit: 8,

  featuredProjectIds: ["talkready"],

  internshipSystemPreviewIds: [
    "crm-pipeline",
    "virtual-office",
    "ticket-support",
    "paysera-inventory",
  ],

  mobileProjectPreviewIds: ["talkready-mobile", "eborrw-nu"],

  designProjectPreviewLimit: 4,

  featuredExperienceIds: [
    "launchpad-paysera-internship",
    "talkready-team-lead",
    "ieee-apwimob-2025",
  ],

  featuredCertificationIds: [
    "installing-configuring-computer-systems",
    "introduction-to-css",
    "maintaining-computer-systems-and-networks",
    "setting-up-computer-networks",
  ],

  featuredActivityIds: [
    "nu-d-vibin-campus-tour",
    "buwan-ng-wika-traditional-dances",
    "pandanggo-sayaw-sa-bangko",
  ],
};

export const contentHierarchy = [
  {
    level: "Primary Homepage Feature",
    purpose: "Shown immediately and given the strongest visual treatment.",
    items: ["Hero identity", "TalkReady", "Internship Systems Suite"],
  },
  {
    level: "Homepage Supporting Sections",
    purpose: "Shown on the homepage but with cleaner summarized layouts.",
    items: [
      "Skills",
      "Experience",
      "Education",
      "Certifications",
      "Activities",
    ],
  },
  {
    level: "Dedicated Detail Pages Later",
    purpose: "Used for deeper project storytelling and case studies.",
    items: [
      "TalkReady Case Study",
      "Internship Systems Case Study",
      "Individual system pages",
    ],
  },
  {
    level: "Archive / Expanded Content Later",
    purpose: "Used for additional works without overcrowding the homepage.",
    items: [
      "All certificates",
      "All activities",
      "All Photoshop works",
      "All Figma works",
      "Smaller school projects",
    ],
  },
];