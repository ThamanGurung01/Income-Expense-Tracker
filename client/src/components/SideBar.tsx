import {ArrowLeftRight, BanknoteArrowDown, BanknoteArrowUp, House, User} from "lucide-react"
import {Link, useLocation} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "../services/Authentication/cookieService";
import closeImage from "../assets/close.png";
import { SidebarProps } from "./components-types";
import { useEffect, useState } from "react";
import { getService } from "../services/Api/getService";
const SideBar:React.FC<SidebarProps> = ({setIsHamburger}) => {
  const [UserData,setUserData]=useState<{
    id:String,
    name:String,
    email:String,
  }>();
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
  const getUserData=async()=>{
    const userData= await getService("userAuth");
    setUserData(userData);
  }
  useEffect(()=>{
  getUserData();
  },[])

  return (
    <div id="sidebar-Ham" className="sidebar border 2xl:z-10 shadow-lg sidebarTransition md:relative">
      <div className="flex flex-col gap-10">
        <div className="w-full border-b pb-4 border-gray-300 flex justify-evenly">
    <div className="w-full flex gap-4"><div className=" w-[30%] my-1 flex justify-center items-center bg-blue-600 text-white font-bold text-xl rounded-xl">$</div>
        <div className="flex flex-col"><span>Expense</span><span className="text-gray-700 text-base">Tracker</span></div></div>
        <img className="closeImg hover:cursor-pointer md:hidden" src={closeImage} onClick={handleHamburgerExit}/>
      </div>
      <div className="flex flex-col items-center gap-y-7 md:gap-y-10">
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
      </div>
      </div>

      <div className="flex flex-col gap-4 justify-center border-t border-gray-300 w-[170px]">
        <Link to={'/profile'} className="group w-full py-4 border border-gray-100 px-2 rounded-xl transition-all duration-150 flex mt-4 gap-2 shadow-xl cursor-pointer hover:bg-gray-100 text-base text-gray-600 hover:text-black ">
          <User className="min-w-fit border border-blue-500 rounded-full group-hover:bg-blue-700 group-hover:text-white bg-blue-500 text-gray-200"/>
          <span className="block truncate">{UserData?UserData.name:"User"}</span></Link>
        <button className={`border w-full bg-red-500 text-gray-200  py-2 rounded-lg hover:bg-red-600 hover:text-white`} type="button" onClick={removeTokenCookie}>LogOut</button></div>
      </div>
  )
}

export default SideBar;