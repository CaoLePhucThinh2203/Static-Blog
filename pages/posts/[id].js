import { getAllPostIds, getPostData } from '../../lib/posts';

// Bước 1: Khai báo tất cả URL cần build
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false, // URL không có trong danh sách → 404
  };
}

// Bước 2: Với mỗi URL, lấy data tương ứng
export async function getStaticProps({ params }) {
  // params.id = 'ssg-ssr' hoặc 'pre-rendering' tùy URL
  const postData = await getPostData(params.id);
  return { props: { postData } };
}

// Bước 3: Render trang
export default function Post({ postData }) {
  return (
    <article>
      <h1>{postData.title}</h1>
    </article>
  );
}

// Trong trang bài viết (pages/posts/[id].js)
import Date from '../../components/date';

<article>
  <h1>{postData.title}</h1>
  <Date dateString={postData.date} />
  <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
</article>

// Trong trang chủ (pages/index.js)
import Date from '../components/date';

<small>
  <Date dateString={date} />
</small>