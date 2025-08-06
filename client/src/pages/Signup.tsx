
import LoginSignupForm from '../components/LoginSignupForm'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='loginSignup'>
      <LoginSignupForm formType="signup"/>
      <div className='text-sm mb-2'>
        <span>Have an account? </span>
        <Link className='mb-2 text-base text-cyan-400 hover:text-green-500' to={"/login"}>Login</Link></div>
    </div>
  )
}

export default Signup