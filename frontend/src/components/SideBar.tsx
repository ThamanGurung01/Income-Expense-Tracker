
import {Link, useLocation} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "../services/Authentication/cookieService";
import closeImage from "../assets/close.png";
import { SidebarProps } from "./components-types";
const SideBar:React.FC<SidebarProps> = ({setIsHamburger}) => {
  const navigate=useNavigate();
  const removeTokenCookie=()=>{
    removeCookie("Token");
    navigate("/login");
  }
  const location = useLocation();
  const currentPath = location.pathname;
  const handleHamburgerExit=()=>{
setIsHamburger(false);
  }
  return (
    <div id="sidebar-Ham" className="sidebar sidebarTransition md:relative">
<div className="flex justify-between">  
<Link className={`${currentPath==="/"?"text-green-300 underline":""}`} onClick={handleHamburgerExit} to="/">Home</Link>
<img className="closeImg hover:cursor-pointer md:hidden" src={closeImage} onClick={handleHamburgerExit}/>
</div>
      <Link className={`${currentPath==="/income"?"text-green-300 underline":""}`} onClick={handleHamburgerExit} to="/income">Income</Link>
      <Link className={`${currentPath==="/expense"?"text-green-300 underline":""}`} onClick={handleHamburgerExit} to="/expense">Expense</Link>
      <Link className={`${currentPath==="/view"?"text-green-300 underline":""}`} onClick={handleHamburgerExit} to="/view">View</Link>
      <button className="w-16" type="button" onClick={removeTokenCookie}>LogOut</button>
    </div>
  )
}

export default SideBar;