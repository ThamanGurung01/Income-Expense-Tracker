// import React from 'react'
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "../services/Authentication/cookieService";
const SideBar = () => {
  const navigate=useNavigate();
  const removeTokenCookie=()=>{
    removeCookie("Token");
    navigate("/login");
  }
  return (
    <div className="border-4 flex flex-col text-center px-2 md:w-36">
      <span>SideBar</span>
      <Link to="/">Home</Link>
      <Link to="/income">Income</Link>
      <Link to="/expense">Expense</Link>
      <Link to="/view">View</Link>
      <button type="button" onClick={removeTokenCookie}>Log Out</button>
    </div>
  )
}

export default SideBar;