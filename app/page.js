import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container">
      <h1>Js Lab</h1>
      <p>Interactive JavaScript lessons powered by MDX.</p>
      <Link href="/lessons">Go to lessons</Link>
    </main>
  );
}
