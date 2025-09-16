import React, { useState, useEffect } from 'react';

const Settings: React.FC = () => {
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [alertThreshold, setAlertThreshold] = useState(80);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">Settings</h2>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow space-y-6 max-w-md">
        <div>
          <label className="font-semibold dark:text-gray-100">SMS Alerts</label>
          <div>
            <input
              type="checkbox"
              checked={smsEnabled}
              onChange={() => setSmsEnabled(!smsEnabled)}
              className="mr-2"
            />
            <span className="dark:text-gray-200">Enable SMS alerts for critical events</span>
          </div>
        </div>
        <div>
          <label className="font-semibold dark:text-gray-100">Crowd Density Alert Threshold (%)</label>
          <input
            type="number"
            value={alertThreshold}
            onChange={e => setAlertThreshold(Number(e.target.value))}
            className="border p-2 rounded w-20 ml-2 dark:bg-gray-700 dark:text-gray-100"
            min={50}
            max={100}
            />
        </div>
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <label className="font-semibold dark:text-gray-100 mb-2 block">Theme</label>
          <div className="flex items-center space-x-3">
            <span className="text-gray-700 dark:text-gray-300">Light</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary dark:bg-gray-700 rounded-full peer peer-checked:bg-primary transition-all"></div>
              <div className="absolute left-1 top-1 bg-white dark:bg-gray-300 w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
            </label>
            <span className="text-gray-700 dark:text-gray-300">Dark</span>
          </div>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;