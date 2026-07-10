import { useEffect } from "react";

const SITE_NAME = "Jay Mark Apelado Portfolio";
const DEFAULT_TITLE = "Jay Mark Apelado | Full-Stack Developer Portfolio";
const DEFAULT_DESCRIPTION =
  "Portfolio of Jay Mark Apelado, showcasing internship systems, capstone projects, mobile applications, UI/UX designs, certifications, and creative works.";

const DEFAULT_IMAGE =
  "/old-portfolio-assets/projects/talkready_web/talkready_landingpage.png";

const DEFAULT_URL = "https://jeimaku.onrender.com";

function setMetaAttribute(selector, attribute, value) {
  if (!value) return;

  let element = document.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");

    if (selector.includes("property=")) {
      const property = selector.match(/property="([^"]+)"/)?.[1];
      element.setAttribute("property", property);
    } else {
      const name = selector.match(/name="([^"]+)"/)?.[1];
      element.setAttribute("name", name);
    }

    document.head.appendChild(element);
  }

  element.setAttribute(attribute, value);
}

function setLinkAttribute(selector, rel, value) {
  if (!value) return;

  let element = document.querySelector(selector);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", value);
}

export default function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  path = "",
  type = "website",
}) {
  useEffect(() => {
    const fullTitle = title.includes("Jay Mark Apelado")
      ? title
      : `${title} | Jay Mark Apelado`;

    const url = `${DEFAULT_URL}${path}`;

    document.title = fullTitle;

    setMetaAttribute('meta[name="description"]', "content", description);
    setMetaAttribute('meta[name="robots"]', "content", "index, follow");

    setMetaAttribute('meta[property="og:title"]', "content", fullTitle);
    setMetaAttribute(
      'meta[property="og:description"]',
      "content",
      description
    );
    setMetaAttribute('meta[property="og:type"]', "content", type);
    setMetaAttribute('meta[property="og:url"]', "content", url);
    setMetaAttribute('meta[property="og:image"]', "content", image);
    setMetaAttribute('meta[property="og:site_name"]', "content", SITE_NAME);

    setMetaAttribute(
      'meta[name="twitter:card"]',
      "content",
      "summary_large_image"
    );
    setMetaAttribute('meta[name="twitter:title"]', "content", fullTitle);
    setMetaAttribute(
      'meta[name="twitter:description"]',
      "content",
      description
    );
    setMetaAttribute('meta[name="twitter:image"]', "content", image);

    setLinkAttribute('link[rel="canonical"]', "canonical", url);
  }, [title, description, image, path, type]);

  return null;
}