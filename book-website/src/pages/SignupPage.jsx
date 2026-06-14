import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle, Check, X } from 'lucide-react';
import { useStore } from '../context/StoreContext.jsx';

export default function SignupPage() {
  const navigate = useNavigate();
  const { login, addToast } = useStore();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Password strength calculator
  const passwordStrength = useMemo(() => {
    const pwd = formData.password;
    if (!pwd) return { score: 0, label: '', color: '' };
    
    let score = 0;
    const checks = {
      hasLength: pwd.length >= 8,
      hasUpper: /[A-Z]/.test(pwd),
      hasLower: /[a-z]/.test(pwd),
      hasNumber: /\d/.test(pwd),
      hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
    };

    Object.values(checks).forEach(check => {
      if (check) score += 20;
    });

    if (score <= 20) return { score: 20, label: 'Weak', color: 'text-red-600', bg: 'bg-red-100', bar: 'bg-red-500' };
    if (score <= 40) return { score: 40, label: 'Fair', color: 'text-orange-600', bg: 'bg-orange-100', bar: 'bg-orange-500' };
    if (score <= 60) return { score: 60, label: 'Good', color: 'text-yellow-600', bg: 'bg-yellow-100', bar: 'bg-yellow-500' };
    if (score <= 80) return { score: 80, label: 'Strong', color: 'text-green-600', bg: 'bg-green-100', bar: 'bg-green-500' };
    return { score: 100, label: 'Very Strong', color: 'text-emerald-600', bg: 'bg-emerald-100', bar: 'bg-emerald-500' };
  }, [formData.password]);

  const validateForm = () => {
    const newErrors = {};

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    } else if (formData.fullName.trim().length > 50) {
      newErrors.fullName = 'Full name must be less than 50 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms agreement validation
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
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

    const newErrors = { ...errors };
    const fieldValue = formData[name];

    if (name === 'fullName') {
      if (!fieldValue.trim()) {
        newErrors.fullName = 'Full name is required';
      } else if (fieldValue.trim().length < 2) {
        newErrors.fullName = 'Full name must be at least 2 characters';
      } else if (fieldValue.trim().length > 50) {
        newErrors.fullName = 'Full name must be less than 50 characters';
      } else {
        delete newErrors.fullName;
      }
    }

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
      } else if (fieldValue.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long';
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

    if (name === 'confirmPassword') {
      if (!fieldValue) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== fieldValue) {
        newErrors.confirmPassword = 'Passwords do not match';
      } else {
        delete newErrors.confirmPassword;
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      addToast('Please fix the errors in the form');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      login(formData.email, formData.fullName);
      setSubmitSuccess(true);
      addToast(`Welcome to GranthAlaya, ${formData.fullName}! 🎉`);

      // Redirect after success
      setTimeout(() => {
        navigate('/');
      }, 1500);

      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center px-4 py-12">
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
          <p className="text-slate-600">Join our community of book lovers</p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Success State */}
          {submitSuccess && (
            <div className="p-8 text-center bg-linear-to-br from-emerald-50 to-green-50 border-b border-emerald-200">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center animate-pulse">
                  <CheckCircle size={32} className="text-emerald-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-emerald-900 mb-2">Account Created!</h3>
              <p className="text-emerald-700">Welcome to GranthAlaya. Redirecting...</p>
            </div>
          )}

          {!submitSuccess && (
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              {/* Full Name Field */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="John Doe"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                      errors.fullName && touched.fullName
                        ? 'border-red-500 bg-red-50 focus:border-red-600'
                        : 'border-slate-200 bg-slate-50 focus:border-indigo-500 focus:bg-white'
                    }`}
                  />
                </div>
                {errors.fullName && touched.fullName && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                    <AlertCircle size={16} />
                    {errors.fullName}
                  </div>
                )}
              </div>

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
                    placeholder="Create a strong password"
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

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-600">Password Strength:</span>
                      <span className={`text-xs font-bold ${passwordStrength.color}`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${passwordStrength.bar}`}
                        style={{ width: `${passwordStrength.score}%` }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className={`flex items-center gap-1 ${formData.password.length >= 8 ? 'text-green-600' : 'text-slate-400'}`}>
                        {formData.password.length >= 8 ? <Check size={14} /> : <X size={14} />} 8+ characters
                      </div>
                      <div className={`flex items-center gap-1 ${/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-slate-400'}`}>
                        {/[A-Z]/.test(formData.password) ? <Check size={14} /> : <X size={14} />} Uppercase
                      </div>
                      <div className={`flex items-center gap-1 ${/[a-z]/.test(formData.password) ? 'text-green-600' : 'text-slate-400'}`}>
                        {/[a-z]/.test(formData.password) ? <Check size={14} /> : <X size={14} />} Lowercase
                      </div>
                      <div className={`flex items-center gap-1 ${/\d/.test(formData.password) ? 'text-green-600' : 'text-slate-400'}`}>
                        {/\d/.test(formData.password) ? <Check size={14} /> : <X size={14} />} Number
                      </div>
                    </div>
                  </div>
                )}

                {errors.password && touched.password && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                    <AlertCircle size={16} />
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Re-enter your password"
                    className={`w-full pl-10 pr-12 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                      errors.confirmPassword && touched.confirmPassword
                        ? 'border-red-500 bg-red-50 focus:border-red-600'
                        : formData.confirmPassword && formData.password === formData.confirmPassword
                        ? 'border-green-500 bg-green-50 focus:border-green-600'
                        : 'border-slate-200 bg-slate-50 focus:border-indigo-500 focus:bg-white'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 transition"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                    <AlertCircle size={16} />
                    {errors.confirmPassword}
                  </div>
                )}
                {formData.confirmPassword && formData.password === formData.confirmPassword && !errors.confirmPassword && (
                  <div className="flex items-center gap-2 mt-2 text-green-600 text-sm">
                    <CheckCircle size={16} />
                    Passwords match
                  </div>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  id="agreeTerms"
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-2 border-slate-200 text-indigo-600 mt-0.5 cursor-pointer"
                />
                <label htmlFor="agreeTerms" className="text-sm text-slate-600 cursor-pointer">
                  I agree to the <a href="#" className="text-indigo-600 hover:underline font-semibold">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:underline font-semibold">Privacy Policy</a>
                </label>
              </div>
              {errors.agreeTerms && touched.agreeTerms && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  {errors.agreeTerms}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-linear-to-r from-indigo-600 to-indigo-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-indigo-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 mt-6"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-slate-500">Already have an account?</span>
                </div>
              </div>

              {/* Login Link */}
              <Link
                to="/login"
                className="block w-full text-center bg-white border-2 border-slate-200 text-slate-700 py-3 rounded-lg font-semibold hover:border-indigo-300 hover:bg-indigo-50 transition-all"
              >
                Login to Your Account
              </Link>
            </form>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-900 font-semibold mb-2">Test Account:</p>
          <p className="text-xs text-amber-800">Try signing up with any email and a strong password (8+ chars with uppercase, lowercase, and number)</p>
        </div>
      </div>
    </div>
  );
}
