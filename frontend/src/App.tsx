import { Routes,Route,useLocation, Navigate } from "react-router-dom"

import SideBar from "./components/SideBar"
import Home from "./pages/Home"
import Income from "./pages/Income"
import Expense from "./pages/Expense"
import View from "./pages/View"
import UpdatePage from "./pages/UpdatePage"
import Login from "./pages/Login"
import Signup from "./pages/Signup";

import { getCookie } from "./services/Authentication/cookieService"

function App() {
  const Location=useLocation()
  const showSideBar=!["/login","/signup"].includes(Location.pathname);
  const Cookie=getCookie("Token");

  return (
    <div className="flex w-screen bg-gray-300">
    {showSideBar&&<SideBar/>}
    <div>
<Routes>
      <Route path="/" element={Cookie?<Home/>:<Navigate to={"/login"} replace />}/>
      <Route path="/income" element={Cookie?<Income/>:<Navigate to={"/login"} replace />}/>
      <Route path="/expense" element={Cookie?<Expense/>:<Navigate to={"/login"} replace />}/>
      <Route path="/view" element={Cookie?<View/>:<Navigate to={"/login"} replace />}/>
      <Route path="/update/:id/:value" element={Cookie?<UpdatePage/>:<Navigate to={"/login"} replace />}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="*" element={Cookie?(<Navigate to={"/"} replace />):(<Navigate to={"/login"} replace />)} />
    </Routes>
</div>    
</div>
  )
}

export default App
