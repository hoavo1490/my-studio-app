export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--card-border)] bg-[var(--bg-secondary)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-xs text-[var(--text-secondary)] md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} duskroom. Built for late-night creators.</span>
        <div className="flex gap-3">
          <a href="mailto:hello@duskroom.app" className="hover:text-[var(--text-primary)]">
            Contact
          </a>
          <a href="https://github.com" className="hover:text-[var(--text-primary)]">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
