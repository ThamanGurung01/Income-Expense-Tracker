
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "../services/Authentication/cookieService";
import closeImage from "../assets/close.png";
import { useState } from "react";
import { SidebarProps } from "./components-types";
const SideBar:React.FC<SidebarProps> = ({isHamburger,setIsHamburger}) => {
  const navigate=useNavigate();
  const removeTokenCookie=()=>{
    removeCookie("Token");
    navigate("/login");
  }
  const [option,setOption]=useState("option1");
  const handleOptions=(option:string)=>{
setOption(option);
  }
  const handleHamburgerExit=()=>{
const sidebarHam:any=document.getElementById("sidebar-Ham");
sidebarHam.style.opacity="0";
setIsHamburger(false);
  }
  return (
    <div id="sidebar-Ham" className="sidebar sidebarTransition">
<div className="flex justify-between">  
<Link className={`${option==="option1"?"text-blue-700 underline":""}`} onClick={()=>handleOptions("option1")} to="/">Home</Link>
<img className="closeImg hover:cursor-pointer" src={closeImage} onClick={handleHamburgerExit}/>
</div>
      <Link className={`${option==="option2"?"text-blue-700 underline":""}`} onClick={()=>handleOptions("option2")} to="/income">Income</Link>
      <Link className={`${option==="option3"?"text-blue-700 underline":""}`} onClick={()=>handleOptions("option3")} to="/expense">Expense</Link>
      <Link className={`${option==="option4"?"text-blue-700 underline":""}`} onClick={()=>handleOptions("option4")} to="/view">View</Link>
      <button className="w-16" type="button" onClick={removeTokenCookie}>LogOut</button>
    </div>
  )
}

export default SideBar;