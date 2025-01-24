import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTop3Blogs, getBlogById } from '../State/Blog/Action';
import { useNavigate } from 'react-router-dom';

export default function Blogs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { top3Blogs, loading, error, blogDetail } = useSelector((state) => state.blog);

  // Fetch Top 3 Blogs khi component mount
  useEffect(() => {
    dispatch(getTop3Blogs());
  }, [dispatch]);

  // Hàm điều hướng đến trang chi tiết blog
  const handleBlogClick = (id) => {
    dispatch(getBlogById(id)); // Gọi API lấy chi tiết blog
    navigate(`/blog/${id}`); // Điều hướng đến URL chi tiết blog
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Blog</h2>
        </div>
        
        {/* Hiển thị Loading */}
        {loading && (
          <div className="text-center mt-10 text-gray-600">Đang tải...</div>
        )}

        {/* Hiển thị lỗi */}
        {error && (
          <div className="text-center mt-10 text-red-500">Lỗi: {error}</div>
        )}

        {/* Hiển thị danh sách blog */}
        {!loading && !error && (
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {top3Blogs.map((post) => (
              <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.createdAt} className="text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                  </time>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                    <a onClick={() => handleBlogClick(post.id)}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{post.content}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  {post.images?.[0] ? (
                    <img
                      alt=""
                      src={post.images[0]}
                      className="size-10 rounded-full bg-gray-50"
                    />
                  ) : (
                    <div className="size-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                      No Image
                    </div>
                  )}
                  <div className="text-sm/6">
                    <p className="font-semibold text-gray-900">
                      <a>
                        <span className="absolute inset-0" />
                        {post.category || 'Chưa có danh mục'}
                      </a>
                    </p>
                    <p className="text-gray-600">Ngày tạo: {new Date(post.createdAt).toLocaleDateString('vi-VN')}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Nút Xem Tất Cả */}
        <div className="mt-10 flex justify-center">
          <a
            href="/blog"
            className="inline-block rounded-md bg-gray-900 px-6 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-700"
          >
            Xem tất cả
          </a>
        </div>
      </div>
    </div>
  );
}
