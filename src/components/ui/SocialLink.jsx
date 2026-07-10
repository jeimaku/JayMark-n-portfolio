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
        "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-cyan-200"
      }
    >
      <Icon size={18} />
    </a>
  );
}