import {ArrowLeftRight, BanknoteArrowDown, BanknoteArrowUp, House, Menu} from "lucide-react"
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
    <div id="sidebar-Ham" className="sidebar shadow-lg sidebarTransition md:relative">
      <img className="closeImg hover:cursor-pointer md:hidden" src={closeImage} onClick={handleHamburgerExit}/>
      <div className="w-full border-b pb-4 border-gray-300 flex justify-evenly">
        <div className=" w-[30%] my-1 flex justify-center items-center bg-blue-600 text-white font-bold text-xl rounded-xl">$</div>
        <div className="flex flex-col"><span>Expense</span><span className="text-gray-700 text-base">Tracker</span></div>
      </div>
      <Link className={`sidebarNav ${currentPath==="/"?"sidebarNavSelected":"sidebarNavHover"}`} onClick={handleHamburgerExit} to="/">
      <House/>
      <span>Home</span>
      </Link>
      <Link className={`sidebarNav ${currentPath==="/income"?"sidebarNavSelected":"sidebarNavHover"}`} onClick={handleHamburgerExit} to="/income">
      <BanknoteArrowUp/>
      <span>Income</span>
      </Link>
      <Link className={`sidebarNav ${currentPath==="/expense"?"sidebarNavSelected":"sidebarNavHover"}`} onClick={handleHamburgerExit} to="/expense">
      <BanknoteArrowDown/>
      <span>Expense</span>
      </Link>
      <Link className={`sidebarNav ${currentPath==="/view"?"sidebarNavSelected":"sidebarNavHover"}`} onClick={handleHamburgerExit} to="/view">
      <ArrowLeftRight/>
      <span>Ledger</span>
      </Link>
      {/* have to make a profile --- */}

      <div className="w-full flex flex-col justify-center border-t border-gray-300">
        <div className="w-full p-4">Profile</div>
        <button className={`border w-full bg-red-500 text-gray-200  py-2 rounded-lg hover:bg-red-600 hover:text-white`} type="button" onClick={removeTokenCookie}>LogOut</button></div>
      </div>
  )
}

export default SideBar;