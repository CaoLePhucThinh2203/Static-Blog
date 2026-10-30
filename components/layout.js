import styles from './layout.module.css';
import Link from 'next/link';

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>

      {/* Header: hiển thị khác nhau tùy trang chủ hay trang con */}
      <header>
        {home ? (
          <h1>Tên lớn — đang ở trang chủ</h1>
        ) : (
          <Link href="/">Tên nhỏ hơn — có thể click về trang chủ</Link>
        )}
      </header>

      {/* Nội dung chính — được truyền vào từ bên ngoài */}
      <main>{children}</main>

      {/* Chỉ hiện nút "Back to home" khi không phải trang chủ */}
      {!home && <Link href="/">← Back to home</Link>}
    </div>
  );
}