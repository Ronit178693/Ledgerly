import React, { useState, useContext } from 'react'
import { UserContext } from '../../../useContext/Context';
import Field from './Field'
import { User, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utils/axios';
import { API_PATHS } from '../../../utils/apiPaths';

const SignupComp = () => {
  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(UserContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setError('');
  };
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

    if (!name || !email || !password) {
      setError("Please fill all the fields");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post(API_PATHS.AUTH.SIGNUP, {
        name,
        email,
        password
      });
      // Token handled by cookie
      await fetchUserDetails();
      navigate('/dashboard');
    }
    catch (err) {
      setError(err.response?.data?.message || err.message || 'Signup Failed');
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="signup-form">
        {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

        <Field label="Full Name" for="name" logo={<User className="input-icon" size={20} />} formInput={
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={name}
            onChange={handleNameChange}
            required
          />
        } />

        <Field label="Email Address" for="email" logo={<Mail className="input-icon" size={20} />} formInput={
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

        <Field label="Password" for="password" logo={<Lock className="input-icon" size={20} />} formInput={
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
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}

export default SignupComp;