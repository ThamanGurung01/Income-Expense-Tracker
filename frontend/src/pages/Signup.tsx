
import LoginSignupForm from '../components/LoginSignupForm'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div>
      <span>Signup</span><Link to={"/login"}>LogIn</Link>
      <LoginSignupForm formType="signup"/>
    </div>
  )
}

export default Signup