import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import { getBlogsPaginated } from '../State/Blog/Action';
import { useNavigate } from 'react-router-dom';

const ListBlog = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error, totalPages } = useSelector((state) => state.blog);

  const [page, setPage] = useState(1); // Trang hiện tại
  const [selectedCategory, setSelectedCategory] = useState('Tất Cả'); // Danh mục hiện tại (mặc định là "Tất Cả")

  // Danh mục cố định với "Tất Cả"
  const categories = ['Tất Cả', 'Tài liệu học tập', 'Hướng dẫn thực hành', 'Khác'];

  // Gọi API khi page thay đổi
  useEffect(() => {
    dispatch(getBlogsPaginated(page - 1, 5)); // Backend page bắt đầu từ 0
  }, [dispatch, page]);

  const navigate = useNavigate();

  const handleViewDetail = (id) => {
    navigate(`/blog/${id}`);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1); // Reset về trang đầu tiên khi đổi danh mục
  };

  // Lọc blogs theo danh mục (nếu chọn)
  const filteredBlogs =
    selectedCategory === 'Tất Cả'
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6 text-center">Danh sách Blog</h1>

      {/* Layout Flexbox */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Danh mục bên trái */}
        <div className="lg:w-1/4 bg-white shadow rounded-lg p-4 h-fit lg:sticky lg:top-20">
          <h2 className="text-lg font-bold mb-4">Danh mục</h2>
          <div className="flex lg:flex-col gap-2">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 text-left rounded w-full ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Danh sách Blog */}
        <div className="flex-1">
          {loading && <p className="text-center text-gray-500">Đang tải...</p>}
          {error && <p className="text-center text-red-500">Lỗi: {error}</p>}
          {!loading && !error && filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog) => (
                <div
                  key={blog.id}
                  onClick={() => handleViewDetail(blog.id)}
                  className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
                >
                  <h2 className="text-lg font-bold mb-2">{blog.title}</h2>
                  <p className="text-gray-500 text-sm mb-2">
                    Ngày đăng: {new Date(blog.createdAt).toLocaleDateString('vi-VN')}
                  </p>
                  <p className="text-gray-700 mb-4">{blog.content}</p>
                  <span className="text-sm bg-blue-100 text-blue-600 py-1 px-2 rounded">
                    {blog.category}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Không có bài viết nào.</p>
          )}

          {/* Phân Trang */}
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListBlog;
