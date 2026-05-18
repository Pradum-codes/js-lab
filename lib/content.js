import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

function isDirectory(entryPath) {
  return fs.statSync(entryPath).isDirectory();
}

function getMdxFilesInDir(dirPath) {
  return fs
    .readdirSync(dirPath)
    .filter((file) => file.toLowerCase().endsWith(".mdx"))
    .sort();
}

export function getLessonTopics() {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((entry) => isDirectory(path.join(CONTENT_DIR, entry)))
    .map((slug) => {
      const lessonDir = path.join(CONTENT_DIR, slug);
      const mdxFiles = getMdxFilesInDir(lessonDir);

      return {
        slug,
        title: slug.replaceAll("_", " "),
        mdxFiles,
        assets: fs.readdirSync(lessonDir).filter((name) => !name.toLowerCase().endsWith(".mdx")),
      };
    })
    .filter((topic) => topic.mdxFiles.length > 0)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getLessonBySlug(slug) {
  const lessonDir = path.join(CONTENT_DIR, slug);
  if (!fs.existsSync(lessonDir) || !isDirectory(lessonDir)) {
    return null;
  }

  const mdxFiles = getMdxFilesInDir(lessonDir);
  if (mdxFiles.length === 0) {
    return null;
  }

  const preferredFile = mdxFiles.includes("page.mdx") ? "page.mdx" : mdxFiles[0];

  return {
    slug,
    mdxFile: preferredFile,
    mdxImportPath: `@/content/${slug}/${preferredFile}`,
  };
}
