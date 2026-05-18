import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { getLessonEntries, getLessonSlugs, lessons } from "@/content";
import LessonPlayground from "@/components/LessonPlayground";

function getStarterCode(slug) {
  const starterPath = path.join(process.cwd(), "content", slug, "starter_code.js");
  if (!fs.existsSync(starterPath)) {
    return "";
  }

  return fs.readFileSync(starterPath, "utf-8");
}

export default async function LessonPage({ params }) {
  const { slug } = await params;
  const lesson = lessons[slug];
  if (!lesson) {
    notFound();
  }
  const Lesson = lesson.Component;
  const entries = getLessonEntries();
  const currentIndex = entries.findIndex((entry) => entry.slug === slug);
  const prevLesson = currentIndex > 0 ? entries[currentIndex - 1] : null;
  const nextLesson = currentIndex < entries.length - 1 ? entries[currentIndex + 1] : null;
  const starterCode = getStarterCode(slug);

  return (
    <main className="lesson-layout">
      <aside className="lesson-sidebar">
        <h2>Content Navigation</h2>
        <nav aria-label="Lesson navigation">
          <ul className="lesson-sidebar__list">
            {entries.map((entry) => (
              <li key={entry.slug}>
                <Link
                  href={`/lessons/${entry.slug}`}
                  className={entry.slug === slug ? "is-active" : undefined}
                >
                  {entry.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <section className="lesson-content">
        <Lesson />
        <LessonPlayground key={slug} starterCode={starterCode} />
        <div className="lesson-pagination">
          {prevLesson ? <Link href={`/lessons/${prevLesson.slug}`}>{"<"} Previous</Link> : <span />}
          {nextLesson ? <Link href={`/lessons/${nextLesson.slug}`}>Next {">"}</Link> : <span />}
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return getLessonSlugs().map((slug) => ({ slug }));
}
