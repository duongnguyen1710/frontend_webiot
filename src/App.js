
import './App.css';
import Routers from './Routers/Routers';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './Component/State/Auth/Action';
import { findCart } from './Component/State/Cart/Action';
import { useLocation, useNavigate } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const jwt = localStorage.getItem("jwt");
  const { auth, error } = useSelector((store) => store);

  useEffect(() => {
    // Chỉ gọi getUser nếu đã xác minh và không ở trang verify-email
    if (jwt && auth.user === null && location.pathname !== "/verify-email") {
      dispatch(getUser(jwt));
      dispatch(findCart(jwt));
    }
  }, [auth.jwt, location.pathname]);

  useEffect(() => {
    if (error === "Tài khoản chưa được xác minh. Vui lòng xác minh email để truy cập profile.") {
      navigate("/verify-email");
    }
  }, [error, navigate]);

  return <Routers />;
}

export default App;
