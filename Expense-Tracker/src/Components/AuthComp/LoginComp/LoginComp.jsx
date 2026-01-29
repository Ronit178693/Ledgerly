import React, { useState, useContext } from 'react'
import { UserContext } from '../../../useContext/Context';
import { Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Fields from './Fields'
import axiosInstance from '../../../utils/axios';
import { API_PATHS } from '../../../utils/apiPaths';

const LoginComp = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError("Please fill all the fields");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      // Token is handled by httpOnly cookie
      navigate('/dashboard');
    }
    catch (err) {
      setError(err.response?.data?.message || err.message || 'Login Failed');
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="login-form">
        {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

        <Fields label="Email Address" for="email" logo={<Mail className="input-icon" size={20} />} formInput={
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        } />

        <Fields label="Password" for="password" logo={<Lock className="input-icon" size={20} />} formInput={
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Create a strong password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        } />

        <button type="submit" className="submit-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  )
}

export default LoginComp;