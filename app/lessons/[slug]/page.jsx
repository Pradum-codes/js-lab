import { notFound } from "next/navigation";
import variableLesson from "../variable/page.mdx";

const lessons = {
  variable: variableLesson,
};

export default async function LessonPage({ params }) {
  const { slug } = await params;
  const Lesson = lessons[slug];

  if (!Lesson) {
    notFound();
  }

  return <Lesson />;
}
