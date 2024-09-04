import { Link } from 'react-router-dom'
import LoginSignupForm from '../components/LoginSignupForm'

const Login = () => {
  return (
    <div>
<span>Login</span><Link to={"/signup"}>SignUp</Link>
<LoginSignupForm formType="login"/>
    </div>
  )
}

export default Login