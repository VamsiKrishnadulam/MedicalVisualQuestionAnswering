import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const EmailVerification = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const showAlert = (message, type) => {
    props.showAlert({ message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      Email: email,
    };

    try {
      setLoading(true);

      const response = await Axios.post('http://localhost:3001/EmailVerification', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response);

      if (response.data && response.data.success) {
        navigate('/OtpVerification', {
          state: { Email: email },
        });
      } else {
        setErrorMsg('Email verification failed. Please try again.');
        showAlert({ message: 'Email verification failed. Please try again.', type: 'warning' });
      }
    } catch (error) {
      console.error(error);
      setErrorMsg('An error occurred. Please try again.');
      showAlert({ message: 'An error occurred. Please try again.', type: 'warning' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
          body {
            background: linear-gradient(to right, #3498db, #8e44ad);
            color: #fff;
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
          }
        `}
      </style>
      <div className="container custom-container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="text-center" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', padding: '50px 75px', borderRadius: '15px', background: '#fff', color: '#333' }}>
          <h2 style={{ marginBottom: '4rem', textTransform: 'capitalize', fontWeight: 'bold', color: '#3498db' }}>Sign Up</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-row mb-4">
              <div className="form-group">
                <label htmlFor="email" style={{ fontWeight: 'bold', color: '#333' }}>
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
                  style={{ borderColor: '#3498db', width: '350px' }}
                />
              </div>
            </div>
            {errorMsg && (
              <div className="alert alert-danger" role="alert" style={{ background: '#e74c3c', color: '#fff' }}>
                {errorMsg}
              </div>
            )}
            <br />
            <br />
            <button type="submit" className="btn btn-primary btn-block" style={{ background: '#3498db', border: '1px solid #2980b9', position: 'relative' }}>
              {loading ? <div className="spinner-border text-light" role="status" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div> : 'Verify Email'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmailVerification;
