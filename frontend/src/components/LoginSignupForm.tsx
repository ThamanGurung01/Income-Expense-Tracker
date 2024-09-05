import React, { ChangeEvent, useEffect, useState } from 'react'
import { LoginSignupFormProps } from './components-types';
import { postService } from '../services/Api/postService';
import { loginService } from '../services/Authentication/loginService';
import { cookieService, getCookie } from '../services/Authentication/cookieService';

import { useNavigate,Navigate} from 'react-router-dom';
const LoginSignupForm: React.FC<LoginSignupFormProps> = ({ formType }) => {
  const navigate=useNavigate();
  const Cookie=getCookie("Token");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState<{ msg: string, error: string }>({
    msg: "",
    error: "",
  });
  const emailPattern = /^[A-Za-z]+[A-Za-z0-9]*@gmail.com$/;



  useEffect(()=>{
    if(Cookie){
      navigate("/",{ replace: true });
    }
  },[])

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  }
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }
  const handleSubmit = async () => {
    if (formType === "signup") {
      if (userName === "" || email === "" || password === "") {
        setResponse({ msg: "", error: "Input all fields" });
      } else {
        if (emailPattern.test(email)) {
          if (password.length >= 6) {
            const response = await postService({
              name: userName,
              email: email,
              password: password,
            }, "user");

            setResponse(response);
            setUserName("");
            setEmail("");
            setPassword("");

            setTimeout(() => {
              setResponse({
                msg: "",
                error: "",
              });

            }, 2000);
            <Navigate to="/" replace/>
          } else {
            setResponse({ msg: "", error: "Password length must be greater than 6" });
          }
        } else {
          setResponse({ msg: "", error: "Input valid email" });
        }
      }
    } else if (formType === "login") {
      if (email === "" || password === "") {
        setResponse({ msg: "", error: "Input all fields" });
      } else {
        if (emailPattern.test(email)) {
          if (password.length >= 6) {
            const response = await loginService({
              email: email,
              password: password,
            }, "login");
            if (!response.error) {
            cookieService(response);
              setResponse({
                msg: "login successfull",
                error: "",
              });
            }else{
              setResponse({
                msg: "Incorrect email or password",
                error: "",
              });
            }
            setEmail("");
            setPassword("");
            setTimeout(() => {
              setResponse({
                msg: "",
                error: "",
              });

            }, 2000);
            navigate("/");

          } else {
            setResponse({ msg: "", error: "Password length must be greater than 6" });
          }
        } else {
          setResponse({ msg: "", error: "Input valid email" });
        }
      }
    } else {
      console.log("give formType props to LoginSignupForm");
    }
  }
  return (
    <div className='flex flex-col'>
      {response.error ? (<span className='text-red-600'>{response.error}</span>) : ""}
      {formType === "signup" ? (<input type="text" placeholder='Name' onChange={(e) => handleName(e)} value={userName} />) : ""}
      <input type="email" placeholder='Email' onChange={(e) => handleEmail(e)} value={email} />
      <input type="password" placeholder='Password' onChange={(e) => handlePassword(e)} value={password} />
      <button type='button' onClick={handleSubmit}>{formType === "signup" ? "Sign Up" : "Log In"} </button>
      {response.msg ? (<span className='text-green-600'>{response.msg}</span>) : ""}
    </div>
  )
}

export default LoginSignupForm