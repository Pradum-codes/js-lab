import HelloWorldLesson from "./hello_world/hello_world.mdx";
import VariablesLesson from "./variables/page.mdx";

export const lessons = {
  hello_world: {
    title: "Hello World",
    Component: HelloWorldLesson,
  },
  variables: {
    title: "Variables",
    Component: VariablesLesson,
  },
};

export function getLessonSlugs() {
  return Object.keys(lessons);
}

export function getLessonEntries() {
  return getLessonSlugs().map((slug) => ({
    slug,
    title: lessons[slug].title,
  }));
}
