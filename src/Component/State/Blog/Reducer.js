import { CREATE_BLOG_FAILURE, CREATE_BLOG_REQUEST, CREATE_BLOG_SUCCESS, DELETE_BLOG_FAILURE, DELETE_BLOG_REQUEST, DELETE_BLOG_SUCCESS, GET_BLOG_DETAIL_FAILURE, GET_BLOG_DETAIL_REQUEST, GET_BLOG_DETAIL_SUCCESS, GET_BLOG_FAILURE, GET_BLOG_REQUEST, GET_BLOG_SUCCESS, GETTOP3_BLOG_FAILURE, GETTOP3_BLOG_REQUEST, GETTOP3_BLOG_SUCCESS, UPDATE_BLOG_FAILURE, UPDATE_BLOG_REQUEST, UPDATE_BLOG_SUCCESS } from "./ActionType";

const initialState = {
    blogs: [], 
    top3Blogs: [],         // Danh sách blog
    blog: null,
    blogDetail: null,         // Chi tiết blog
    currentPage: 0,     // Trang hiện tại
    totalPages: 0,      // Tổng số trang
    totalElements: 0,   // Tổng số phần tử
    loading: false,     // Trạng thái loading
    error: null,        // Lỗi
    success: false,     // Trạng thái thành công
};

// Reducer Blog
export const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        // 📌 Lấy danh sách Blog (Phân trang)
        case GET_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_BLOG_SUCCESS:
      return {
        ...state,
        blogs: action.payload.blogs,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        totalElements: action.payload.totalElements,
        loading: false,
      };
    case GET_BLOG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

        // 📌 Lấy chi tiết Blog
        case 'GET_BLOG_BY_ID_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
            };
        case 'GET_BLOG_BY_ID_SUCCESS':
            return {
                ...state,
                loading: false,
                blog: action.payload,
                success: true,
            };
        case 'GET_BLOG_BY_ID_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            };

        // 📌 Tạo Blog
        case CREATE_BLOG_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
            };
        case CREATE_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                blogs: [...state.blogs, action.payload],
                success: true,
            };
        case CREATE_BLOG_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            };

        // 📌 Cập nhật Blog
        case UPDATE_BLOG_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
            };
        case UPDATE_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                blogs: state.blogs.map((blog) =>
                    blog.id === action.payload.id ? action.payload : blog
                ),
                success: true,
            };
        case UPDATE_BLOG_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            };

        // 📌 Xóa Blog
        case DELETE_BLOG_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
            };
        case DELETE_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                blogs: state.blogs.filter((blog) => blog.id !== action.payload),
                success: true,
            };
        case DELETE_BLOG_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            };

            case GETTOP3_BLOG_REQUEST:
                return {
                    ...state,
                    loading: true,
                    error: null,
                };
            case GETTOP3_BLOG_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    top3Blogs: action.payload,
                };
            case GETTOP3_BLOG_FAILURE:
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                };
                case GET_BLOG_DETAIL_REQUEST:
                    return {
                        ...state,
                        loading: true,
                        error: null,
                    };
                case GET_BLOG_DETAIL_SUCCESS:
                    return {
                        ...state,
                        loading: false,
                        blogDetail: action.payload,
                    };
                case GET_BLOG_DETAIL_FAILURE:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload,
                    };

        default:
            return state;
    }
};