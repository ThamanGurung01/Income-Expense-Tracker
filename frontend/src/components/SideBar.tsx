
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
<img className="closeImg hover:cursor-pointer md:hidden" src={closeImage} onClick={handleHamburgerExit}/>
<Link className={`sidebarNav ${currentPath==="/"?"text-green-300 underline":""}`} onClick={handleHamburgerExit} to="/">Home</Link>
      <Link className={`sidebarNav ${currentPath==="/income"?"text-green-300 underline":""}`} onClick={handleHamburgerExit} to="/income">Income</Link>
      <Link className={`sidebarNav ${currentPath==="/expense"?"text-green-300 underline":""}`} onClick={handleHamburgerExit} to="/expense">Expense</Link>
      <Link className={`sidebarNav ${currentPath==="/view"?"text-green-300 underline":""}`} onClick={handleHamburgerExit} to="/view">View</Link>
      <button className={`w-16 font-bold hover:text-red-600 ${currentPath==="/expense"?"text-red-300 underline":""}`} type="button" onClick={removeTokenCookie}>LogOut</button>
    </div>
  )
}

export default SideBar;