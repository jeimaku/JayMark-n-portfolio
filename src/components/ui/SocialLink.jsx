import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

const iconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
  facebook: FaFacebook,
  instagram: FaInstagram,
  email: Mail,
};

export default function SocialLink({ link, className = "" }) {
  const Icon = iconMap[link.type] || Mail;
  const isExternal = link.href.startsWith("http");

  return (
    <a
      href={link.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer noopener" : undefined}
      aria-label={link.label}
      className={
        className ||
        "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition hover:border-neutral-100/40 hover:bg-neutral-100/10 hover:text-white"
      }
    >
      <Icon size={18} />
    </a>
  );
}