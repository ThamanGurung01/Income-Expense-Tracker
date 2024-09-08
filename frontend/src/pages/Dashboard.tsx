import { Routes,Route,useLocation, Navigate } from "react-router-dom"

import SideBar from "../components/SideBar" 
import Home from "./Home" 
import Income from "./Income" 
import Expense from "./Expense" 
import View from "./View" 
import UpdatePage from "./UpdatePage" 
import { getCookie } from "../services/Authentication/cookieService" 

function Dashboard(){
  const location=useLocation()
  const showSideBar=!["/login","/signup"].includes(location.pathname);
  const Cookie=getCookie("Token");

  return (
    <div className="flex bg-gray-300">
    {showSideBar&&<SideBar/>}
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
