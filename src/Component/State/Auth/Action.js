import axios from "axios"


import {GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, RESEND_EMAIL_FAILURE, RESEND_EMAIL_REQUEST, RESEND_EMAIL_SUCCESS, VERIFY_USER_FAILURE, VERIFY_USER_REQUEST, VERIFY_USER_SUCCESS } from "./ActionType"
import { api, API_URL } from "../../Config/Api"


export const registerUser = (reqData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    if (!reqData || !reqData.userData) {
      throw new Error("Dữ liệu đăng ký không hợp lệ");
    }

    const { fullName = "", email = "", password = "", role = "ROLE_CUSTOMER" } = reqData.userData;
    if (!email) {
      throw new Error("Email không được để trống");
    }

    const { data } = await axios.post(`${API_URL}/auth/signup`, {
      fullName,
      email,
      password,
      role,
    });

    if (data?.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }

    if (data?.role === "ROLE_CUSTOMER" && email) {
      reqData.navigate("/verify-email", { state: { email } });
    }

    dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
    console.log("Đăng ký thành công", data);
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response?.data || "Đăng ký thất bại",
    });
  }
};


export const loginUser = (reqData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const { data } = await api.post(`/auth/signin`, reqData.userData);
  
      // Kiểm tra JWT token
      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
        console.log("Login success:", data);
  
        // Kiểm tra vai trò và điều hướng
        if (data.role === "ROLE_CUSTOMER") {
          reqData.navigate("/");
        } else if (data.role === "ROLE_ADMIN") {
          reqData.navigate("/admin/dashboard");
        }
      } else {
        throw new Error("JWT token not found in response");
      }
    } catch (error) {
      // Xử lý lỗi một cách rõ ràng
      let errorMessage = "Đã xảy ra lỗi. Vui lòng thử lại!";
      if (error.response) {
        errorMessage = error.response.data.message || error.response.statusText;
      } else if (error.request) {
        errorMessage = "Không thể kết nối đến server.";
      } else {
        errorMessage = error.message;
      }
  
      console.error("Login failed:", errorMessage);
      dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
    }
  };

export const getUser=(jwt)=>async(dispatch)=>{
    dispatch({type:GET_USER_REQUEST})
    try {
        const {data} = await api.get(`${API_URL}/api/users/profile`,{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        })
       
        dispatch({type: GET_USER_SUCCESS, payload:data})
        console.log("user profile",data)
    } catch (error) {
        dispatch({type:GET_USER_FAILURE,payload:error})
        console.log("error", error)
    }
}




export const logout=()=>async(dispatch)=>{
    
    try {
        
        localStorage.clear();
        dispatch({type: LOGOUT})
        console.log("logout success")
    } catch (error) {
        console.log("error", error)
    }
}

export const verifyUser = (email, otp) => {
  return async (dispatch) => {
    dispatch({ type: VERIFY_USER_REQUEST });

    try {
      const response = await api.post("/auth/verified", { email, opt: otp });
      const message = response.data;

      if (message === "Email đã được xác thực thành công!") {
        dispatch({ type: VERIFY_USER_SUCCESS, payload: message });
      } else {
        dispatch({ type: VERIFY_USER_FAILURE, payload: message });
      }
    } catch (error) {
      dispatch({
        type: VERIFY_USER_FAILURE,
        payload: error.response?.data || "Đã xảy ra lỗi trong quá trình xác thực",
      });
    }
  };
};

export const resendOtp = (email) => async (dispatch) => {
  dispatch({ type: RESEND_EMAIL_REQUEST });

  try {
    // Gửi yêu cầu API tới backend
    const response = await api.post("/auth/resend", { email });

    // Thành công
    dispatch({
      type: RESEND_EMAIL_SUCCESS,
      payload: response.data, // Nội dung phản hồi từ backend
    });
  } catch (error) {
    // Lỗi
    dispatch({
      type: RESEND_EMAIL_FAILURE,
      payload: error.response?.data || "Đã xảy ra lỗi khi gửi lại OTP",
    });
  }
};