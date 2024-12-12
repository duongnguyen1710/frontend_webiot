import React from 'react';

const Category = () => {
  const categories = [
    'Công nghệ',
    'Kinh doanh',
    'Giải trí',
    'Thể thao',
    'Đời sống',
    'Sức khỏe',
  ]; // Danh sách danh mục

  return (
    <div className="relative group">
      {/* Dropdown Button */}
      <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-l-md hover:bg-blue-600">
        Danh mục
      </button>

      {/* Dropdown Menu */}
      <div className="absolute left-0 top-full bg-white shadow-md rounded-md w-48 hidden group-hover:block">
        <ul className="py-2">
          {categories.map((category, index) => (
            <li key={index} className="hover:bg-gray-100">
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-blue-500"
              >
                {category}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
