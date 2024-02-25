import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Axios from 'axios';

const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      Password: password,
      Email: email,
    };

    try {
      const response = await Axios.post('http://localhost:3001/Authentication', data);

      if (response && response.status === 200) {
        props.showAlert({ type: 'success', message: 'User Login Successful' });
        navigate('/QueryHere');
      }
    } catch (error) {
      console.log(error.message);
      if (error.message) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div style={{ minWidth: '100%', background: 'linear-gradient(135deg, #6DA1E2 0%, #2196F3 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="text-center" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', padding: '50px 75px', borderRadius: '15px', backgroundColor: '#fff' }}>
        <h2 style={{ marginBottom: '4rem', fontWeight: 'bold', color: '#2196F3' }}>Log in</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row mb-4">
            <div className="form-group">
              <label htmlFor="email" style={{ fontWeight: 'bold', color: '#2196F3' }}>
                Email address:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ borderColor: '#2196F3', width: '350px' }}
              />
            </div>
          </div>

          <div className="form-row mb-4">
            <div className="form-group">
              <label htmlFor="password" style={{ fontWeight: 'bold', color: '#2196F3' }}>
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ borderColor: '#2196F3', width: '350px' }}
              />
            </div>
          </div>

          {/* Display error message if exists */}
          {errorMsg && <div className="text-danger" style={{ color: 'red' }}>{errorMsg}</div>}

          <button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: '#2196F3' }}>
            Login
          </button>
        </form>

        <div className="form-row mt-4">
          <p style={{ color: '#555' }}>
            Don't have an account? <Link to="/register" style={{ color: '#2196F3' }}>Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
