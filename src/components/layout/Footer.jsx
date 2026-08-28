import Container from "./Container";
import SocialLink from "../ui/SocialLink";
import { footerNavigation, profile } from "../../data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-10">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <a href="#home" className="text-lg font-semibold text-white">
              {profile.name}
            </a>

            <p className="mt-2 max-w-md text-sm leading-6 text-neutral-400">
              {profile.headline}
            </p>
          </div>

          <div className="flex flex-col gap-5 md:items-end">
            <nav className="flex flex-wrap gap-x-5 gap-y-2">
              {footerNavigation.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-neutral-400 transition hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {profile.contactLinks.map((link) => (
                <SocialLink key={link.label} link={link} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-sm text-neutral-500">
          © {currentYear} {profile.name}. Built with React.
        </div>
      </Container>
    </footer>
  );
}