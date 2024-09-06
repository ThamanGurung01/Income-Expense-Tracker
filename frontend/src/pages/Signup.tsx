
import LoginSignupForm from '../components/LoginSignupForm'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='loginSignup'>
      <LoginSignupForm formType="signup"/>
      <Link className='mb-2 text-xs text-blue-800 hover:text-blue-500' to={"/login"}>Login</Link>   
    </div>
  )
}

export default Signup