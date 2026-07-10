import { useState } from "react";
import { Menu, X } from "lucide-react";

import Button from "../ui/Button";
import SocialLink from "../ui/SocialLink";
import Container from "./Container";

import { mainNavigation, profile } from "../../data";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <Container>
        <div className="flex h-18 items-center justify-between sm:h-20">
          <a
            href="#home"
            onClick={closeMenu}
            className="group inline-flex min-w-0 items-center gap-3"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-sm font-bold text-cyan-200">
              {profile.initials}
            </span>

            <span className="hidden truncate text-sm font-semibold tracking-wide text-white sm:inline">
              {profile.name}
            </span>
          </a>

          <nav className="hidden items-center gap-1 xl:flex">
            {mainNavigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 xl:flex">
            {profile.contactLinks.map((link) => (
              <SocialLink key={link.label} link={link} />
            ))}

            <Button href="#contact" size="sm">
              Let&apos;s Talk
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-cyan-300/40 hover:bg-white/[0.06] xl:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>

      {isOpen && (
        <div className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-white/10 bg-slate-950/98 shadow-2xl shadow-black/30 xl:hidden">
          <Container>
            <nav className="flex flex-col gap-2 py-5">
              {mainNavigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
                >
                  {item.label}
                </a>
              ))}

              <div className="mt-4 border-t border-white/10 pt-5">
                <Button
                  href="#contact"
                  onClick={closeMenu}
                  className="w-full"
                >
                  Let&apos;s Talk
                </Button>

                <div className="mt-5 flex items-center gap-2">
                  {profile.contactLinks.map((link) => (
                    <SocialLink key={link.label} link={link} />
                  ))}
                </div>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}