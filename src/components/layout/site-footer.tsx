export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--divider)]/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 py-10 text-[11px] uppercase tracking-[0.3em] text-[var(--text-secondary)] md:px-10 lg:px-24">
        <span>© {new Date().getFullYear()} duskroom — built for quiet, creator-owned studios.</span>
        <div className="flex gap-4">
          <a href="mailto:hello@duskroom.app" className="hover:text-[var(--text-primary)]">
            contact
          </a>
          <a href="https://github.com" className="hover:text-[var(--text-primary)]">
            github
          </a>
        </div>
      </div>
    </footer>
  );
}
