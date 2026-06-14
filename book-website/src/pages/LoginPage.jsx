import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext.jsx';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, addToast } = useStore();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (touched[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate field on blur
    const newErrors = { ...errors };
    const fieldValue = formData[name];

    if (name === 'email') {
      if (!fieldValue.trim()) {
        newErrors.email = 'Email is required';
      } else if (!emailRegex.test(fieldValue)) {
        newErrors.email = 'Please enter a valid email address';
      } else {
        delete newErrors.email;
      }
    }

    if (name === 'password') {
      if (!fieldValue) {
        newErrors.password = 'Password is required';
      } else if (fieldValue.length < 6) {
        newErrors.password = 'Password must be at least 6 characters long';
      } else if (!/(?=.*[a-z])/.test(fieldValue)) {
        newErrors.password = 'Password must contain at least one lowercase letter';
      } else if (!/(?=.*[A-Z])/.test(fieldValue)) {
        newErrors.password = 'Password must contain at least one uppercase letter';
      } else if (!/(?=.*\d)/.test(fieldValue)) {
        newErrors.password = 'Password must contain at least one number';
      } else {
        delete newErrors.password;
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (!validateForm()) {
      addToast('Please fix the errors in the form');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      login(formData.email, formData.email.split('@')[0]);
      setSubmitSuccess(true);
      addToast(`Welcome back, ${formData.email.split('@')[0]}! 🎉`);

      // Redirect after success
      setTimeout(() => {
        navigate('/');
      }, 1500);

      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-xl bg-linear-to-br from-indigo-600 to-amber-400 flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none">
                <path d="M3 7v10c0 1.1.9 2 2 2h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 7V5c0-1.1.9-2 2-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">GranthAlaya</h1>
          <p className="text-slate-600">Welcome back to your reading journey</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Success State */}
          {submitSuccess && (
            <div className="p-8 text-center bg-linear-to-br from-emerald-50 to-green-100 border-b border-emerald-200">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center animate-pulse">
                  <CheckCircle size={32} className="text-emerald-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-emerald-900 mb-2">Login Successful!</h3>
              <p className="text-emerald-700">Redirecting to home...</p>
            </div>
          )}

          {!submitSuccess && (
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="you@example.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                      errors.email && touched.email
                        ? 'border-red-500 bg-red-50 focus:border-red-600'
                        : 'border-slate-200 bg-slate-50 focus:border-indigo-500 focus:bg-white'
                    }`}
                  />
                </div>
                {errors.email && touched.email && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                    <AlertCircle size={16} />
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-12 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                      errors.password && touched.password
                        ? 'border-red-500 bg-red-50 focus:border-red-600'
                        : 'border-slate-200 bg-slate-50 focus:border-indigo-500 focus:bg-white'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                    <AlertCircle size={16} />
                    {errors.password}
                  </div>
                )}
                <p className="text-xs text-slate-500 mt-2">
                  Password must be 6+ chars with uppercase, lowercase, and a number
                </p>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-2 border-slate-200 text-indigo-600 cursor-pointer"
                  />
                  <span className="text-sm text-slate-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-linear-to-r from-indigo-600 to-indigo-800 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Login to GranthAlaya'
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-slate-500">Don't have an account?</span>
                </div>
              </div>

              {/* Signup Link */}
              <Link
                to="/signup"
                className="block w-full text-center bg-white border-2 border-slate-200 text-slate-700 py-3 rounded-lg font-semibold hover:border-indigo-300 hover:bg-indigo-50 transition-all"
              >
                Create Account
              </Link>
            </form>
          )}
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900 font-semibold mb-2">Demo Credentials:</p>
          <p className="text-xs text-blue-800 font-mono mb-1">Email: <span className="font-bold">demo@example.com</span></p>
          <p className="text-xs text-blue-800 font-mono">Password: <span className="font-bold">Demo@123</span></p>
        </div>
      </div>
    </div>
  );
}