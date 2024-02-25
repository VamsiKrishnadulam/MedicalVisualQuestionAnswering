import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Axios from 'axios';

const SignUp = (props) => {
  const Navigate = useNavigate();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [misMatch, setMisMatch] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match before submitting the form
    checkMisMatch(ConfirmPassword);

    if (misMatch) {
      // Handle mismatch error (display a message, prevent form submission, etc.)
      setErrorMsg('Passwords do not match');
      return;
    }

    const data = {
      Password: Password,
      Email: Email,
    };

    console.log(data);

    try {
      const response = await Axios.post('http://localhost:3001/Register', data);

      console.log(response);

      if (response.status === 201) {
        // props.showAlert('User Registration Successful', 'success');
        Navigate('/');
      }
    } catch (error) {
      console.log(error);

      if (error.response && error.response.data) {
        setErrorMsg(error.response.data);
      } else {
        setErrorMsg('An error occurred. Please try again.');
      }
    }
  };

  const checkMisMatch = (confirmPassword) => {
    if (Password !== confirmPassword) {
      setMisMatch(true);
    } else {
      setMisMatch(false);
    }
  };

  return (
    <div className="container custom-container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="text-center" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', padding: '50px 75px', borderRadius: '15px' }}>
        <h2 className="mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="form-group mb-4 text-left">
            <label htmlFor="email" style={{ fontWeight: 'bold', color: '#2196F3' }}>
              Email address:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderColor: '#2196F3', width: '350px' }}
            />
          </div>

          {/* Password Field */}
          <div className="form-group mb-4 text-left">
            <label htmlFor="password" style={{ fontWeight: 'bold', color: '#2196F3' }}>
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={Password}
              onChange={(e) => {
                checkMisMatch(e.target.value);
                setPassword(e.target.value);
              }}
              required
              style={{ borderColor: '#2196F3', width: '350px' }}
            />
          </div>

          {/* Confirm Password Field */}
          <div className="form-group mb-4 text-left">
            <label htmlFor="confirmPassword" style={{ fontWeight: 'bold', color: '#2196F3' }}>
              Confirm Password:
            </label>
            <input
              type="password"
              className={`form-control ${misMatch ? 'is-invalid' : ''}`}
              id="confirmPassword"
              placeholder="Confirm your password"
              value={ConfirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                checkMisMatch(e.target.value);
              }}
              required
              style={{ borderColor: '#2196F3', width: '350px' }}
            />
            {misMatch && <div className="invalid-feedback">Passwords do not match</div>}
          </div>

          {/* Additional UI elements (if any) can be added here */}
{/* 
          {misMatch && (
            <div className="text-danger">
              <b>Password MisMatch</b>
            </div>
          )} */}
          {errorMsg && (
            <div className="text-danger">
              {errorMsg}
            </div>
          )}

          {/* Login link */}
          <div className="form-group mb-4 text-left">
            <p>
              Already have an account? <Link to="/Login">Login here</Link>
            </p>
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary btn-block">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
