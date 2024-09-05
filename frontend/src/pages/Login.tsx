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
    <div>
<span>Login</span><Link to={"/signup"}>SignUp</Link>
<LoginSignupForm formType="login"/>
    </div>
  )
}

export default Login