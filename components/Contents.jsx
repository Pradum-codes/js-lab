import Link from "next/link";
import { getLessonTopics } from "@/lib/content";

export default function Contents() {
  const topics = getLessonTopics();

  return (
    <main className="container">
      <p className="eyebrow">Curriculum</p>
      <h1>Lessons</h1>
      {topics.length === 0 ? (
        <p>No lessons found. Add a folder in `content/` with at least one `.mdx` file.</p>
      ) : (
        <ul className="lesson-list">
          {topics.map((topic) => (
            <li key={topic.slug} className="lesson-list__item">
              <Link href={`/lessons/${topic.slug}`}>{topic.title}</Link>
              {topic.assets.length > 0 && <p>Assets: {topic.assets.join(", ")}</p>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
