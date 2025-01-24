import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBlogDetail } from '../State/Blog/Action';

const BlogDetail = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const dispatch = useDispatch();
    const { blogDetail, loading, error } = useSelector((state) => state.blog);

    // Gọi API lấy chi tiết bài viết
    useEffect(() => {
        dispatch(getBlogDetail(id));
    }, [dispatch, id]);

    if (loading) return <p className="text-center text-gray-500">Đang tải...</p>;
    if (error) return <p className="text-center text-red-500">Lỗi: {error}</p>;
    if (!blogDetail) return <p className="text-center text-gray-500">Không tìm thấy bài viết.</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-4">{blogDetail.title}</h1>
                <p className="text-gray-500 mb-2">
                    Ngày đăng: {new Date(blogDetail.createdAt).toLocaleDateString('vi-VN')}
                </p>
                <p className="text-gray-700 mb-6">{blogDetail.content}</p>
                <div className="mb-4">
                    <span className="text-sm bg-blue-100 text-blue-600 py-1 px-2 rounded">
                        {blogDetail.category}
                    </span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {blogDetail.images?.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`blog-${index}`}
                            className="w-32 h-32 object-cover rounded-md"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
