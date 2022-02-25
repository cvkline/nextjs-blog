import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface PostData {
  id: string;
  contentHTML?: string;
  date: string;
  title: string;
}

const postsDirectory = path.join(process.cwd(), 'posts');

export async function getPostData(id: string, withContent: boolean = true): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  if (withContent) {
    const processedContent = await remark().use(html).process(matterResult.content);
    const contentHTML = processedContent.toString();
    return {
      id,
      contentHTML,
      ...(matterResult.data as {date: string, title: string})
    };
  }

  // Just return id and metadata if no content requested
  return {
    id, ...(matterResult.data as {date: string, title: string})
  };
}

export async function getSortedPostsData(): Promise<Array<PostData>> {
  // Get post ids under /posts
  const ids: Array<string> = fs.readdirSync(postsDirectory).map(fn => fn.replace(/\.md$/, ''));
  const allPostsData: Array<PostData> = await Promise.all(ids.map(id => getPostData(id, false)));

  // Sort posts descending by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else if (a.date > b.date) {
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
