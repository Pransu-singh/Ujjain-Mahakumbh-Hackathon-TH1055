import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserType } from './types';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const ShieldLogo: React.FC = () => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full h-full flex items-center justify-center"
    >
      <motion.img
        src="/models/security_shield.svg"
        alt="Security Shield"
        className="w-64 h-64 filter drop-shadow-2xl"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      />
    </motion.div>
  );
};

const Login: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [userType, setUserType] = useState<UserType>('pilgrim');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login, register, state } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        await register(email, password);
      } else {
        await login(email, password, userType);
      }
      navigate('/');
    } catch (error) {
      console.error(isRegistering ? 'Registration error:' : 'Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary p-6">
      <div className="max-w-4xl w-full flex rounded-xl shadow-2xl overflow-hidden bg-white">
        {/* 3D Model Section */}
        <div className="hidden lg:block w-1/2 bg-gray-900">
          <ShieldLogo />
        </div>

        {/* Login/Register Form Section */}
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            {isRegistering ? 'Create Account' : 'Welcome Back'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection - Only show for login */}
            {!isRegistering && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">I am a:</label>
                <div className="flex space-x-4">
                  {(['pilgrim', 'security', 'admin'] as UserType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setUserType(type)}
                      className={`px-4 py-2 rounded-lg capitalize ${
                        userType === type
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 input-field"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 input-field"
                required
              />
            </div>

            {/* Confirm Password Field - Only show for registration */}
            {isRegistering && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 input-field"
                  required
                />
              </div>
            )}

            {/* Error Message */}
            {state.error && (
              <div className="text-red-600 text-sm">{state.error}</div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full btn-primary"
              disabled={state.loading}
            >
              {state.loading
                ? isRegistering
                  ? 'Creating account...'
                  : 'Logging in...'
                : isRegistering
                ? 'Create Account'
                : 'Login'}
            </button>

            {/* Toggle between Login and Register */}
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setPassword('');
                  setConfirmPassword('');
                }}
                className="text-primary hover:text-primary-dark"
              >
                {isRegistering
                  ? 'Already have an account? Login'
                  : "Don't have an account? Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;