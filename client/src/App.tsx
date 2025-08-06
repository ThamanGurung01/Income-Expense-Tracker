import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { getCookie } from "./services/Authentication/cookieService";
import Profile from "./pages/Profile";




function App(){
  const Cookie=getCookie("Token");
return (
<Routes>
  <Route path="*" element={Cookie?<Dashboard/>:<Navigate to={"/login"} replace />}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/signup" element={<Signup/>}/>
  <Route path="/profile" element={<Profile/>}/>
</Routes>
);

}
export default App;








































// import { Routes,Route,useLocation, Navigate } from "react-router-dom"

// import SideBar from "./components/SideBar"
// import Home from "./pages/Home"
// import Income from "./pages/Income"
// import Expense from "./pages/Expense"
// import View from "./pages/View"
// import UpdatePage from "./pages/UpdatePage"
// import Login from "./pages/Login"
// import Signup from "./pages/Signup";

// import { getCookie } from "./services/Authentication/cookieService"

// function App() {
//   const location=useLocation()
//   const showSideBar=!["/login","/signup"].includes(location.pathname);
//   const Cookie=getCookie("Token");

//   return (
//     <div className="flex w-screen bg-gray-300">
//     {showSideBar&&<SideBar/>}
//     <div className="flex-1">
// <Routes>
//       <Route path="/home" element={Cookie?<Home/>:<Navigate to={"/login"} replace />}/>
//       <Route path="/income" element={Cookie?<Income/>:<Navigate to={"/login"} replace />}/>
//       <Route path="/expense" element={Cookie?<Expense/>:<Navigate to={"/login"} replace />}/>
//       <Route path="/view" element={Cookie?<View/>:<Navigate to={"/login"} replace />}/>
//       <Route path="/update/:id/:value" element={Cookie?<UpdatePage/>:<Navigate to={"/login"} replace />}/>
//       <Route path="/login" element={<Login/>}/>
//       <Route path="/signup" element={<Signup/>}/>
//     </Routes>
// </div>    
// </div>
//   )
// }
// 
// export default App
