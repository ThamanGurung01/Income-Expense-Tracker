
import LoginSignupForm from '../components/LoginSignupForm'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='loginSignup'>
      <LoginSignupForm formType="signup"/>
      <Link className='mb-2 text-base text-blue-900 hover:text-green-500' to={"/login"}>Login</Link>   
    </div>
  )
}

export default Signup