import { getSortedPostsData } from '../lib/posts';
import Date from '../components/date'; // Import component Date

// Next.js gọi hàm này lúc build, KHÔNG phải lúc user request
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: { allPostsData }, // → truyền vào Home component qua props
  };
}

// Component nhận data đã được chuẩn bị sẵn qua props
export default function Home({ allPostsData }) {
  return (
    <ul>
      {allPostsData.map(({ id, date, title }) => (
        <li key={id}>
          {title}
          <br />
          <small>
            <Date dateString={date} /> {/* Sử dụng component Date */}
          </small>
        </li>
      ))}
    </ul>
  );
}