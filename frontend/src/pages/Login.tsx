import { Link, useNavigate } from 'react-router-dom'
import LoginSignupForm from '../components/LoginSignupForm'
import { useEffect } from 'react';
import { getCookie } from '../services/Authentication/cookieService';

const Login = () => {
  const navigate=useNavigate();
  useEffect(()=>{
    const Cookie=getCookie("Token");
      if(Cookie){
        navigate("/",{ replace: true });
      }
    },[navigate]);
  return (
    <div className='loginSignup'>
<LoginSignupForm formType="login"/>
<div className='text-xs mb-2'>
  <span>Don't have an account? </span>
<Link className='text-base text-blue-900 hover:text-green-500' to={"/signup"}>Signup</Link>
</div>
    </div>
  )
}

export default Login