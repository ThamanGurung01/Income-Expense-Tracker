import { Routes,Route,useLocation, Navigate } from "react-router-dom"

import SideBar from "../components/SideBar" 
import Home from "./Home" 
import Income from "./Income" 
import Expense from "./Expense" 
import View from "./View" 
import UpdatePage from "./UpdatePage" 
import { getCookie } from "../services/Authentication/cookieService" 
import hamburger from "../assets/hamburger.png";
import { useEffect, useState } from "react"

function Dashboard(){
  const location=useLocation()
  const showSideBar=!["/login","/signup"].includes(location.pathname);
  const Cookie=getCookie("Token");
  const [isHamburger,setIsHamburger]=useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const HamburgerHandler=()=>{
    setIsHamburger(true);
  }
  return (
    <div className="flex bg-orange-500 text-gray-200">
    <img className="hamburger md:hidden" onClick={HamburgerHandler} src={hamburger}/>
    {(showSideBar&&isMobile)?<div className={`${isHamburger?"block":"hidden"}`}><SideBar setIsHamburger={setIsHamburger} /></div>:<SideBar setIsHamburger={setIsHamburger} />}
<Routes>
      <Route path="/" element={Cookie?<Home/>:<Navigate to={"/login"} replace />}/>
      <Route path="/income" element={Cookie?<Income/>:<Navigate to={"/login"} replace />}/>
      <Route path="/expense" element={Cookie?<Expense/>:<Navigate to={"/login"} replace />}/>
      <Route path="/view" element={Cookie?<View/>:<Navigate to={"/login"} replace />}/>
      <Route path="/update/:id/:value" element={Cookie?<UpdatePage/>:<Navigate to={"/login"} replace />}/>
    </Routes>
</div>
  )
}

export default Dashboard
