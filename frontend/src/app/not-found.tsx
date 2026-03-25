import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-main section text-center">
      <h1 className="text-6xl font-mono font-light text-text-tertiary mb-4">
        404
      </h1>
      <p className="text-text-secondary mb-4">Cette page n&apos;existe pas.</p>
      <p className="text-sm text-text-tertiary mb-8">
        Vous cherchez peut-être :
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/"
          className="text-accent-action hover:text-accent-action-hover transition-colors text-sm"
        >
          Accueil
        </Link>
        <span className="hidden sm:block text-text-tertiary">·</span>
        <Link
          href="/#services"
          className="text-accent-action hover:text-accent-action-hover transition-colors text-sm"
        >
          Tarifs
        </Link>
        <span className="hidden sm:block text-text-tertiary">·</span>
        <Link
          href="/blog"
          className="text-accent-action hover:text-accent-action-hover transition-colors text-sm"
        >
          Blog
        </Link>
        <span className="hidden sm:block text-text-tertiary">·</span>
        <Link
          href="/#contact"
          className="text-accent-action hover:text-accent-action-hover transition-colors text-sm"
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
