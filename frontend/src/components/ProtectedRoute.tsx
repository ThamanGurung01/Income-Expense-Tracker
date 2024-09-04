import React from 'react'
import { ProtectedRouteProps } from './components-types'
import { getCookie } from '../services/Authentication/cookieService'
import { Navigate, Route } from 'react-router-dom';

const ProtectedRoute:React.FC<ProtectedRouteProps> = ({path,element,...rest}) => {
  const Cookie=getCookie("Token");
  return (
<Route 
path={path}
{...rest}

element={Cookie?element:<Navigate to={"/login"} replace />}
/>
  )
}

export default ProtectedRoute