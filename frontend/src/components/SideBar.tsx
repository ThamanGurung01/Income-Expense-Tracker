// import React from 'react'
import {Link} from "react-router-dom";
const SideBar = () => {

  return (
    <div className="border-4 w-40 min-h-screen flex flex-col">
      <span>SideBar</span>
      <Link to="/">Home</Link>
      <Link to="/income">Income</Link>
      <Link to="/expense">Expense</Link>

    </div>
  )
}

export default SideBar;