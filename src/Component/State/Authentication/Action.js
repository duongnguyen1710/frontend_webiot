import { api } from "../../Config/Api";
import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, SET_JWT } from "./ActionType";

export const registerUser = (reqData) => {
    return async (dispatch) => {
      dispatch({ type: REGISTER_REQUEST });
      try {
        const response = await api.post("/auth/signup", reqData.userData); // Gửi API đăng ký
        const data = response.data;
  
        // Lưu JWT vào localStorage
        localStorage.setItem("jwt", data.jwt);
  
        dispatch({
          type: REGISTER_SUCCESS,
          payload: data,
        });
  
        // Dispatch action lưu JWT vào Redux state
        dispatch({
          type: SET_JWT,
          payload: data.jwt,
        });
  
        if (data.role === "ROLE_CUSTOMER") {
          // Chuyển sang trang xác thực email
          reqData.navigate("/verify-email", { state: { email: reqData.userData.email } });
        } else {
          reqData.navigate("/dashboard");
        }
      } catch (error) {
        dispatch({
          type: REGISTER_FAILURE,
          payload: error.response?.data || "Đăng ký thất bại",
        });
        alert(error.response?.data?.message || "Có lỗi xảy ra khi đăng ký.");
      }
    };
  };