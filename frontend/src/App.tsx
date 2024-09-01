import { Routes,Route,Link } from "react-router-dom"

import SideBar from "./components/SideBar"
import Home from "./pages/Home"
import Income from "./pages/Income"
import Expense from "./pages/Expense"
import View from "./pages/View"
import UpdatePage from "./pages/UpdatePage"
function App() {
  
  return (
    <div className="flex w-screen bg-gray-300">
    <SideBar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/income" element={<Income/>}/>
      <Route path="/expense" element={<Expense/>}/>
      <Route path="/view" element={<View/>}/>
      <Route path="/update/:id/:value" element={<UpdatePage/>}/>
    </Routes>
    </div>
  )
}

export default App
