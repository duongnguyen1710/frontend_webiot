
import './App.css';
import Routers from './Routers/Routers';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './Component/State/Auth/Action';

function App() {
  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt")
  const {auth}=useSelector(store=>store)
  useEffect(()=>{
    dispatch(getUser(auth.jwt || jwt))
    
  },[auth.jwt]);
  return (
    
        <Routers/>
    
  );
}

export default App;
