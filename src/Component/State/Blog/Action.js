
import { api } from "../../Config/Api";
import { GET_BLOG_DETAIL_FAILURE } from "./ActionType";
import { GET_BLOG_DETAIL_SUCCESS } from "./ActionType";
import { GET_BLOG_DETAIL_REQUEST } from "./ActionType";
import { CREATE_BLOG_FAILURE, CREATE_BLOG_REQUEST, CREATE_BLOG_SUCCESS, DELETE_BLOG_FAILURE, DELETE_BLOG_REQUEST, DELETE_BLOG_SUCCESS, GET_BLOG_FAILURE, GET_BLOG_REQUEST, GET_BLOG_SUCCESS, GETTOP3_BLOG_FAILURE, GETTOP3_BLOG_REQUEST, GETTOP3_BLOG_SUCCESS, UPDATE_BLOG_FAILURE, UPDATE_BLOG_REQUEST, UPDATE_BLOG_SUCCESS } from "./ActionType";

const getAuthHeader = () => {
    const jwt = localStorage.getItem('jwt'); // Giả sử JWT được lưu trong localStorage
    return {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    };
};

/** 📌 1. Lấy Blog theo ID */
export const getBlogById = (id) => async (dispatch) => {
    dispatch({ type: GET_BLOG_REQUEST });
    try {
        const response = await api.get(`/blog/${id}`);
        dispatch({ type: GET_BLOG_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_BLOG_FAILURE, payload: error.message });
    }
};

/** 📌 2. Thêm Blog mới */
export const createBlog = (blogData) => async (dispatch) => {
    dispatch({ type: CREATE_BLOG_REQUEST });
    try {
        const response = await api.post(`/api/admin/blog`, blogData, getAuthHeader());
        dispatch({ type: CREATE_BLOG_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_BLOG_FAILURE, payload: error.message });
    }
};

/** 📌 3. Cập nhật Blog */
export const updateBlog = (id, blogData) => async (dispatch) => {
    dispatch({ type: UPDATE_BLOG_REQUEST });
    try {
        const response = await api.put(`/api/admin/blog/${id}`, blogData, getAuthHeader());
        dispatch({ type: UPDATE_BLOG_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_BLOG_FAILURE, payload: error.message });
    }
};

/** 📌 4. Xóa Blog */
export const deleteBlog = (id) => async (dispatch) => {
    dispatch({ type: DELETE_BLOG_REQUEST });
    try {
        await api.delete(`/api/admin/blog/${id}`, getAuthHeader());
        dispatch({ type: DELETE_BLOG_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: DELETE_BLOG_FAILURE, payload: error.message });
    }
};

/** 📌 5. Phân trang Blog */
export const getBlogsPaginated = (page = 0, size = 5) => async (dispatch) => {
    dispatch({ type: GET_BLOG_REQUEST });
    try {
        const response = await api.get(`/blog/page?page=${page}&size=${size}`);
        dispatch({ type: GET_BLOG_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_BLOG_FAILURE, payload: error.message });
    }
};

export const getTop3Blogs = () => async (dispatch) => {
    dispatch({ type: GETTOP3_BLOG_REQUEST });
    try {
        const response = await api.get('/blog/latest');
        dispatch({ type: GETTOP3_BLOG_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GETTOP3_BLOG_FAILURE, payload: error.message });
    }
};

export const getBlogDetail = (id) => async (dispatch) => {
    dispatch({ type: GET_BLOG_DETAIL_REQUEST });
    try {
        const response = await api.get(`/blog/${id}`);
        dispatch({ type: GET_BLOG_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_BLOG_DETAIL_FAILURE, payload: error.message });
    }
};