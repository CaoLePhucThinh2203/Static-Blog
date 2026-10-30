import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // 1. Lấy tên tất cả file trong thư mục /posts
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    // 2. Dùng tên file làm ID bài viết (bỏ đuôi .md)
    const id = fileName.replace(/\.md$/, '');

    // 3. Đọc nội dung file
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // 4. Dùng gray-matter tách front-matter
    //    matterResult.data = { title: '...', date: '...' }
    //    matterResult.content = nội dung markdown
    const matterResult = matter(fileContents);

    return { id, ...matterResult.data };
    // → { id: 'ssg-ssr', title: '...', date: '...' }
  });

  // 5. Sắp xếp từ mới nhất đến cũ nhất
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// lib/posts.js — trả về danh sách id của tất cả bài viết
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, ''), // bỏ đuôi .md
    },
  }));
}
// Kết quả: [
//   { params: { id: 'ssg-ssr' } },
//   { params: { id: 'pre-rendering' } }
// ]

import { remark } from 'remark';
import html from 'remark-html';

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  // Chuyển Markdown → HTML
  const processedContent = await remark()
    .use(html)                          // plugin chuyển đổi
    .process(matterResult.content);     // xử lý nội dung markdown

  const contentHtml = processedContent.toString();
  // contentHtml = "<p><strong>Next.js</strong> has two forms..."

  return {
    id,
    contentHtml,
    ...matterResult.data, // title, date
  };
}