import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export async function getPostData(id, withContent = true) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  if (withContent) {
    const processedContent = await remark().use(html).process(matterResult.content);
    const contentHTML = processedContent.toString();
    return { id, contentHTML, ...matterResult.data };
  }

  // Just return id and metadata if no content requested
  return { id, ...matterResult.data };
}

export async function getSortedPostsData() {
  // Get post ids under /posts
  const ids = fs.readdirSync(postsDirectory).map(fn => fn.replace(/\.md$/, ''));
  const allPostsData = await Promise.all(ids.map(id => getPostData(id, false)));

  // Sort posts descending by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map(fileName => {
    return {
      params: { // `params` is important to getStaticPaths!
        id: fileName.replace(/\.md$/, '')
      }
    }
  });
}
