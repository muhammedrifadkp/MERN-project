import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import 'react-phone-input-2/lib/style.css';
import API from '../services/api';


export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

 const handleSubmit = async (e) => {
     e.preventDefault();
 
     try {
      const data = await API.post("auth/register",{username : formData.username,
        email: formData.email,
        mobile : formData.phone,
        password : formData.password,
})
console.log(data.data)
 
      //  localStorage.setItem('token', res.data.token);
       navigate('/login'); 
     } catch (err) {
       console.log(err.response?.data?.message || 'Register failed');
     } finally {
      //  setLoading(false);
     }
   };
 

  const handlePhoneChange = (value) => {
    setFormData(prev => ({ ...prev, phone: value }));
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side Image */}
      <div 
        className="hidden md:flex md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url('/leftimg.png')` }}
      />

      {/* Right Side Registration Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <img src="/logo.png" alt="TSEEP Logo" className="h-12" />
          </div>

          <h1 className="text-2xl font-semibold text-center mb-4">Welcome to TSEEP</h1>
          <p className="text-center text-gray-600 mb-8">Create your account to get started.</p>

          <form className="space-y-6"
          onSubmit={handleSubmit}
          >
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tseep-blue focus:border-transparent"
                placeholder="e.g. John Doe"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tseep-blue focus:border-transparent"
                placeholder="e.g. johndoe@example.com"
              />
            </div>

            {/* Mobile Number Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile number</label>
              <div className="border border-gray-300 rounded-md p-2 pl-3 focus-within:ring-2 focus-within:ring-tseep-blue">
                <PhoneInput
                  country={'in'}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  inputProps={{
                    name: 'phone',
                    required: true,
                    className: 'w-full focus:outline-none pl-12'
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tseep-blue focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tseep-blue focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                className="h-4 w-4 text-tseep-blue focus:ring-tseep-blue border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <Link to="/terms" className="text-tseep-blue hover:underline">
                  Terms & Conditions
                </Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-tseep-blue hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-tseep-blue text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
              
            >
              Register
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or signup with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <img src="/google.png" alt="Google" className="h-5 w-5 mr-2" />
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <img src="/apple.png" alt="Apple" className="h-5 w-5 mr-2" />
                Apple
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center mt-6">
              <span className="text-gray-600">Already have an account? </span>
              <Link to="/login" className="text-tseep-blue hover:underline">Sign In</Link>
            </div>

            {/* Footer Links */}
            <div className="text-center text-sm text-gray-500 mt-8">
              <p>© 2025 TSEEP Academy</p>
              <div className="flex justify-center space-x-4 mt-2">
                <Link to="/privacy" className="hover:text-tseep-blue">Privacy policy</Link>
                <Link to="/terms" className="hover:text-tseep-blue">Terms & Conditions</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}