import { Routes,Route,Link } from "react-router-dom"

import SideBar from "./components/SideBar"
import Home from "./pages/Home"
import Income from "./pages/Income"
import Expense from "./pages/Expense"
import View from "./pages/View"
function App() {
  const options=["home","income","expense"];
  
  return (
    <div className="flex w-screen bg-gray-300">
    <SideBar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/income" element={<Income/>}/>
      <Route path="/expense" element={<Expense/>}/>
      <Route path="/view" element={<View/>}/>
    </Routes>
    </div>
  )
}

export default App
