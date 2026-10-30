const nextConfig = {
  output: 'export',       // Bảo Next.js xuất ra file HTML tĩnh
  images: {
    unoptimized: true,    // Tắt tối ưu hóa ảnh (cần server để xử lý)
  },
};

module.exports = nextConfig;