import React, { ChangeEvent, useState, useCallback } from 'react'
import { LoginSignupFormProps } from './components-types'
import { postService } from '../services/Api/postService'
import { loginService } from '../services/Authentication/loginService'
import { cookieService } from '../services/Authentication/cookieService'
import { useNavigate } from 'react-router-dom'

interface FormData {
  userName: string
  email: string
  password: string
}

interface ResponseState {
  msg: string
  error: string
}

const LoginSignupForm: React.FC<LoginSignupFormProps> = ({ formType }) => {
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState<FormData>({
    userName: '',
    email: '',
    password: '',
  })
  
  const [response, setResponse] = useState<ResponseState>({
    msg: '',
    error: '',
  })
  
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const emailPattern = /^[A-Za-z]+[A-Za-z0-9]*@gmail\.com$/

  const handleInputChange = useCallback((field: keyof FormData) => 
    (e: ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({
        ...prev,
        [field]: e.target.value
      }))
      // Clear errors when user starts typing
      if (response.error) {
        setResponse(prev => ({ ...prev, error: '' }))
      }
    }, [response.error])

  const validateForm = (): string | null => {
    const { userName, email, password } = formData
    
    if (formType === 'signup' && !userName.trim()) {
      return 'Name is required'
    }
    
    if (!email.trim()) {
      return 'Email is required'
    }
    
    if (!password) {
      return 'Password is required'
    }
    
    if (!emailPattern.test(email)) {
      return 'Please enter a valid Gmail address'
    }
    
    if (password.length < 6) {
      return 'Password must be at least 6 characters long'
    }
    
    return null
  }

  const clearForm = () => {
    setFormData({
      userName: '',
      email: '',
      password: '',
    })
  }

  const showResponseMessage = (msg: string, error: string) => {
    setResponse({ msg, error })
    setTimeout(() => {
      setResponse({ msg: '', error: '' })
      setIsProcessing(false)
    }, 3000)
  }

  const handleSignup = async () => {
    try {
      const response = await postService({
        name: formData.userName,
        email: formData.email,
        password: formData.password,
      }, 'user')

      if (response.error) {
        showResponseMessage('', response.error)
      } else {
        showResponseMessage('Account created successfully! Redirecting to login...', '')
        clearForm()
        setTimeout(() => {
          navigate('/login', { replace: true })
        }, 2000)
      }
    } catch (error) {
      showResponseMessage('', 'Something went wrong. Please try again.')
    }
  }

  const handleLogin = async () => {
    try {
      const response = await loginService({
        email: formData.email,
        password: formData.password,
      }, 'login')

      if (response.error) {
        showResponseMessage('', 'Incorrect email or password')
      } else {
        await cookieService(response)
        showResponseMessage('Login successful! Redirecting...', '')
        clearForm()
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }
    } catch (error) {
      showResponseMessage('', 'Login failed. Please try again.')
    }
  }

  const handleSubmit = async () => {
    const validationError = validateForm()
    
    if (validationError) {
      setResponse({ msg: '', error: validationError })
      return
    }

    setIsProcessing(true)

    if (formType === 'signup') {
      await handleSignup()
    } else if (formType === 'login') {
      await handleLogin()
    } else {
      console.error('Invalid formType provided to LoginSignupForm')
      setIsProcessing(false)
    }
  }

  const isSignup = formType === 'signup'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Income Expense Tracker
          </h2>
          <p className="text-sm text-gray-600">
            {isSignup ? 'Create your account to get started' : 'Welcome back! Please sign in to continue'}
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-xl rounded-xl border border-gray-100">
          <div className="space-y-6">
            {response.error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {response.error}
                </div>
              </div>
            )}
            
            {response.msg && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm font-medium">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {response.msg}
                </div>
              </div>
            )}

            <div className="space-y-4">
              {isSignup && (
                <div>
                  <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    id="userName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.userName}
                    onChange={handleInputChange('userName')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
                    disabled={isProcessing}
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your.email@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
                  disabled={isProcessing}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
                    disabled={isProcessing}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    disabled={isProcessing}
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {!isSignup && (
                  <div className="mt-2 text-right">
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                      disabled={isProcessing}
                    >
                      Forgot password?
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isProcessing}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                isSignup ? 'Create Account' : 'Sign In'
              )}
            </button>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  onClick={() => navigate(isSignup ? '/login' : '/signup')}
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                  disabled={isProcessing}
                >
                  {isSignup ? 'Sign in' : 'Sign up'}
                </button>
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-center text-xs text-gray-500">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignupForm