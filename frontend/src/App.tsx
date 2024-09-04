import { Routes,Route,useLocation } from "react-router-dom"

import SideBar from "./components/SideBar"
import Home from "./pages/Home"
import Income from "./pages/Income"
import Expense from "./pages/Expense"
import View from "./pages/View"
import UpdatePage from "./pages/UpdatePage"
import Login from "./pages/Login"
import Signup from "./pages/Signup";
function App() {
  const Location=useLocation()
  const showSideBar=!["/login","/signup"].includes(Location.pathname);
  return (
    <div className="flex w-screen bg-gray-300">
    {showSideBar&&<SideBar/>}
    <div>
<Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/income" element={<Income/>}/>
      <Route path="/expense" element={<Expense/>}/>
      <Route path="/view" element={<View/>}/>
      <Route path="/update/:id/:value" element={<UpdatePage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>

    </Routes>
</div>    
</div>
  )
}

export default App
