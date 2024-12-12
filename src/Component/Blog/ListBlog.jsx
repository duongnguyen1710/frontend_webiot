import React from 'react';

const ListBlog = () => {
  const categories = ['Công nghệ', 'Kinh doanh', 'Giải trí', 'Thể thao', 'Đời sống']; // Danh mục tin tức

  const blogs = [
    {
      id: 1,
      title: 'Xu hướng công nghệ năm 2024',
      date: '2024-12-01',
      description: 'Tìm hiểu những xu hướng công nghệ hàng đầu sẽ định hình thế giới trong năm 2024.',
      category: 'Công nghệ',
    },
    {
      id: 2,
      title: 'Bí quyết khởi nghiệp thành công',
      date: '2024-11-20',
      description: 'Chia sẻ các bước để xây dựng một doanh nghiệp khởi nghiệp từ con số không.',
      category: 'Kinh doanh',
    },
    {
      id: 3,
      title: 'Phim bom tấn sắp ra mắt',
      date: '2024-12-05',
      description: 'Danh sách những bộ phim đáng mong đợi nhất sẽ ra mắt vào cuối năm nay.',
      category: 'Giải trí',
    },
    {
      id: 4,
      title: 'Kết quả bóng đá tuần qua',
      date: '2024-11-28',
      description: 'Tổng hợp các trận đấu hấp dẫn nhất và kết quả từ các giải đấu lớn.',
      category: 'Thể thao',
    },
    {
      id: 5,
      title: 'Mẹo sống khỏe mùa đông',
      date: '2024-11-25',
      description: 'Những lời khuyên hữu ích giúp bạn bảo vệ sức khỏe trong mùa đông lạnh giá.',
      category: 'Đời sống',
    },
  ]; // Dữ liệu mẫu cho danh sách tin tức

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Danh sách tin tức</h1>

      <div className="flex mb-6 space-x-4">
        {categories.map((category, index) => (
          <button
            key={index}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {category}
          </button>
        ))}
      </div>

      {/* List of Blogs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
          >
            <h2 className="text-lg font-bold mb-2">{blog.title}</h2>
            <p className="text-gray-500 text-sm mb-2">Ngày đăng: {blog.date}</p>
            <p className="text-gray-700 mb-4">{blog.description}</p>
            <span className="text-sm bg-blue-100 text-blue-600 py-1 px-2 rounded">
              {blog.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListBlog;
