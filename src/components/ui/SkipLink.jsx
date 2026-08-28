export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:border focus:border-neutral-100/30 focus:bg-neutral-950 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-neutral-100 focus:shadow-2xl focus:shadow-black/40"
    >
      Skip to main content
    </a>
  );
}