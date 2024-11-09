import React, { ChangeEvent, useState } from 'react'
import { LoginSignupFormProps } from './components-types';
import { postService } from '../services/Api/postService';
import { loginService } from '../services/Authentication/loginService';
import { cookieService } from '../services/Authentication/cookieService';

import { useNavigate} from 'react-router-dom';
const LoginSignupForm: React.FC<LoginSignupFormProps> = ({ formType }) => {
  const navigate=useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("thaman@gmail.com");
  const [password, setPassword] = useState("thamangrg");
  const [response, setResponse] = useState<{ msg: string, error: string }>({
    msg: "",
    error: "",
  });
  const [isProcessing,setIsProcessing]=useState(false);
  const emailPattern = /^[A-Za-z]+[A-Za-z0-9]*@gmail.com$/;

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
    setIsProcessing(true);
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
              setIsProcessing(false);
            }, 2000);
            navigate("/login",{replace:true});
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
           await cookieService(response);
              setResponse({
                msg: "login successfull",
                error: "",
              });
            }else{
              setResponse({
                msg: "",
                error: "Incorrect email or password",
              });
            }
            setEmail("");
            setPassword("");
            setTimeout(() => {
              setResponse({
                msg: "",
                error: "",
              });
            setIsProcessing(false);
            window.location.reload();
            }, 2000);

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
    <div className='flex flex-col items-center text-xl sm:text-2xl'>
<span className='mt-5 mb-5 font-bold text-lg sm:text-xl md:text-2xl lg:text-4xl lg:mb-10'>Income Expense Tracker</span>
      {response.error ? (<span className='text-rose-700 font-bold'>{(response.error).toUpperCase()}!</span>) : ""}
      {response.msg ? (<span className='text-green-400 font-bold'>{(response.msg).toUpperCase()}</span>) : ""}
      {formType === "signup" ? (<input className='inputForm' type="text" placeholder='Name' onChange={(e) => handleName(e)} value={userName} />) : ""}
      <input className='inputForm' type="email" placeholder='Email' onChange={(e) => handleEmail(e)} value={email} />
      <input className='inputForm' type="password" placeholder='Password' onChange={(e) => handlePassword(e)} value={password} />
      <button className='buttonForm buttonFormHover' disabled={isProcessing} type='button' onClick={handleSubmit}>{formType === "signup" ? "Sign Up" : "Log In"} </button>
    </div>
  )
}

export default LoginSignupForm
