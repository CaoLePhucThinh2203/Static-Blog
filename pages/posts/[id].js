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