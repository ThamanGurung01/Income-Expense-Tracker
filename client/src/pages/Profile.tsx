import React, { useEffect } from 'react'
import { getCookie } from '../services/Authentication/cookieService';
import { useNavigate } from 'react-router-dom';

const Profile:React.FC = () => {
 const navigate=useNavigate();
  useEffect(()=>{
    const Cookie=getCookie("Token");
      if(!Cookie){
        navigate("/login",{ replace: true });
      }
    },[navigate]);
  return (
    <div>Profile</div>
  )
}

export default Profile