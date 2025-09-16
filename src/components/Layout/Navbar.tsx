import React, { useState } from 'react';
import { BellIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const { logout, state } = useAuth();
  const navigate = useNavigate();

  const notifications = [
    { id: 1, message: 'High crowd density detected at Gate A', type: 'warning' },
    { id: 2, message: 'New security alert at Section B', type: 'alert' },
    { id: 3, message: 'Resource deployment recommended', type: 'info' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const user = state.user;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-1 flex items-center justify-between">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-primary dark:text-gray-100">CrowdGuard AI</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                >
                  <BellIcon className="h-6 w-6 text-gray-600 dark:text-gray-200" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50"
                    >
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                        >
                          <p className="text-sm text-gray-600 dark:text-gray-200">{notification.message}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                >
                  <UserCircleIcon className="h-6 w-6 text-gray-600 dark:text-gray-200" />
                </button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50"
                    >
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          setShowProfileModal(true);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Your Profile
                      </button>
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          setShowSettingsModal(true);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Settings
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowProfileModal(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md relative"
              initial={{ scale: 0.95, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 40 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                onClick={() => setShowProfileModal(false)}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
              <h2 className="text-xl font-bold mb-4 dark:text-gray-100">Your Profile</h2>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Email:</span>{' '}
                  <span className="text-gray-700 dark:text-gray-200">{user?.email}</span>
                </div>
                <div>
                  <span className="font-semibold">Username:</span>{' '}
                  <span className="text-gray-700 dark:text-gray-200">{user?.username}</span>
                </div>
                <div>
                  <span className="font-semibold">Role:</span>{' '}
                  <span className="text-gray-700 dark:text-gray-200">{user?.userType}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettingsModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSettingsModal(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md relative"
              initial={{ scale: 0.95, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 40 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                onClick={() => setShowSettingsModal(false)}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
              <h2 className="text-xl font-bold mb-4 dark:text-gray-100">Settings</h2>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Email:</span>{' '}
                  <span className="text-gray-700 dark:text-gray-200">{user?.email}</span>
                </div>
                <div>
                  <span className="font-semibold">Username:</span>{' '}
                  <span className="text-gray-700 dark:text-gray-200">{user?.username}</span>
                </div>
                <div>
                  <span className="font-semibold">Role:</span>{' '}
                  <span className="text-gray-700 dark:text-gray-200">{user?.userType}</span>
                </div>
                {/* Add more settings fields here as needed */}
                <div className="text-xs text-gray-500 mt-2">
                  (Settings functionality can be expanded as needed)
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;