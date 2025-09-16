import React, { useState } from 'react';
import { useAuth } from '../Auth/AuthContext';

const AdminPanel: React.FC = () => {
  const { createUserAsAdmin, state } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'admin' | 'security'>('security');
  const [message, setMessage] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserAsAdmin(email, password, userType);
      setMessage(`Successfully created ${userType} user!`);
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setMessage(err.message || 'Error creating user');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">Admin Panel: Create User</h2>
      <form onSubmit={handleCreate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
          <input
            type="email"
            className="input-field w-full"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
          <input
            type="password"
            className="input-field w-full"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Role</label>
          <select
            className="input-field w-full"
            value={userType}
            onChange={e => setUserType(e.target.value as 'admin' | 'security')}
          >
            <option value="security">Security</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn-primary w-full" disabled={state.loading}>
          {state.loading ? 'Creating...' : 'Create User'}
        </button>
        {message && <div className="text-sm mt-2">{message}</div>}
      </form>
    </div>
  );
};

export default AdminPanel;