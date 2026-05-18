import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container home">
      <p className="eyebrow">JavaScript Learning Lab</p>
      <h1>Learn by reading, running, and experimenting</h1>
      <p className="lead">Interactive lessons with MDX theory, starter code, and live output.</p>
      <Link className="button-link" href="/lessons">
        Start lessons
      </Link>
    </main>
  );
}
