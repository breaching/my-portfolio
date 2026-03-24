import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-main section text-center">
      <h1 className="text-6xl font-mono font-light text-text-tertiary mb-4">
        404
      </h1>
      <p className="text-text-secondary mb-8">Cette page n&apos;existe pas.</p>
      <Link
        href="/"
        className="text-accent-action hover:text-accent-action-hover transition-colors"
      >
        Retour &agrave; l&apos;accueil &rarr;
      </Link>
    </div>
  );
}
