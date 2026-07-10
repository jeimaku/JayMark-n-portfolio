import { assetPaths } from "./assets";

export const activities = [
  {
    id: "bs-it-christmas-entry",
    type: "video",
    title: 'BS IT Christmas Entry - "Ngiti ng Pasko"',
    date: "December 18, 2022",
    url: "https://www.facebook.com/share/v/1FjyKnpWic/",
    preview: assetPaths.activities.xmasIt,
    video:
      "https://res.cloudinary.com/dy19jfrdb/video/upload/v1762954217/XmasIT_qw3aqo.mp4",
    caption:
      "BS Information Technology Christmas video entry featuring festive celebrations and student creativity.",
    credits: "Editors: Jay Mark Apelado & Aaron Dennis Laberinto",
  },

  {
    id: "nu-d-vibin-campus-tour",
    type: "video",
    title: "NU-D Vibin' Virtual Campus Tour",
    date: "August 11, 2023",
    url: "https://www.facebook.com/share/v/1CHzF3QWXu/",
    preview: assetPaths.activities.salubongVibin,
    video:
      "https://res.cloudinary.com/dy19jfrdb/video/upload/v1762954222/Salubong_Vibin_s8whks.mp4",
    caption:
      "An upbeat virtual tour inside National University - Dasmariñas featuring NU-D Vibin' dance group, welcoming students for A.Y. 2023-2024.",
    credits: "Video Editors: Jay Mark Apelado",
  },

  {
    id: "behind-the-scenes-nationalians",
    type: "video",
    title: "Behind the Scenes: Nationalians Are You Down?",
    date: "August 23, 2023",
    url: "https://www.facebook.com/share/v/1A5a9NhgCE/",
    preview: assetPaths.activities.btsSalubong,
    video:
      "https://res.cloudinary.com/dy19jfrdb/video/upload/v1762954224/BTS_Salubong_oemdmq.mp4",
    caption:
      "Behind-the-scenes video showing the effort, hard work, and training behind NU-D Vibin's performance.",
    credits: "Edited by: Jay Mark Apelado",
  },

  {
    id: "buwan-ng-wika-traditional-dances",
    type: "photo",
    title: "Buwan ng Wika: Traditional Filipino Dances",
    date: "August 31, 2023",
    url: "https://www.facebook.com/share/p/1AEGat2fS6/",
    preview: assetPaths.activities.wikangFilipino,
    video: "",
    caption:
      "NU-D Vibin' showcased traditional Filipino dances during Buwan ng Wika celebration, featuring Pandanggo sa Ilaw, Sayaw sa Bangko, and OPM Hiphop in traditional attire.",
    credits: "Photo: Jay Mark Apelado",
  },

  {
    id: "pandanggo-sayaw-sa-bangko",
    type: "video",
    title: "Pandanggo sa Ilaw & Sayaw sa Bangko",
    date: "August 31, 2023",
    url: "https://www.facebook.com/share/v/17Nm14bkwU/",
    preview: assetPaths.activities.buwanNgWika,
    video:
      "https://res.cloudinary.com/dy19jfrdb/video/upload/v1762954220/BuwanNgWika_yvtqko.mp4",
    caption:
      "Two iconic Filipino folk dances performed in celebration of Buwan ng Wika.",
    credits: "Video Editors: Jay Mark Apelado",
  },

  {
    id: "open-training-take-all-the-love",
    type: "video",
    title: "Open Training Session: Take All The Love",
    date: "September 6, 2023",
    url: "https://www.facebook.com/share/v/1A5a9NhgCE/",
    preview: assetPaths.activities.danceClass,
    video:
      "https://res.cloudinary.com/dy19jfrdb/video/upload/v1762954220/DanceClass_b2oi7u.mp4",
    caption:
      "Open training session at the school gymnasium featuring Nationalians and NU-D Vibin dancing to Blu Totanes' choreography with 'Take all the Love' by Arthur Nery.",
    credits: "Edited by: Jay Mark Apelado",
  },
].sort((a, b) => new Date(b.date) - new Date(a.date));