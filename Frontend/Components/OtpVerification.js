import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const OtpVerification = () => {
  const [Email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // Array to store OTP values
  const [errorMsg, setErrorMsg] = useState('');
  const Navigate = useNavigate();

  const handleOtpVerification = async (e) => {
    e.preventDefault();

    const enteredOtp = otp.join('');

    console.log('Entered OTP:', enteredOtp);

    const response = await Axios.post('http://localhost:3001/OtpVerification', {
      Email: Email,
      otp: enteredOtp,
    });
    console.log(response.data);
    if (response.data.success) {
      Navigate('/SignUp');
    }
    setOtp(['', '', '', '', '', '']);
  };

  const handleChangeOtp = (index, value) => {
    // Update the OTP array with the entered value
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move to the next input box automatically if the value is entered
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  return (
    <div className="container custom-container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="text-center" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', padding: '50px 75px', borderRadius: '15px' }}>
        <h2 style={{ marginBottom: '4rem', fontWeight: 'bold' }}>Otp Verification</h2>
        <form>
          <div className="form-row mb-4">
            <div className="form-group">
              <label htmlFor="email" style={{ fontWeight: 'bold' }}>
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
          </div>
          <div className="form-row mb-4">
            <label htmlFor="email" style={{ fontWeight: 'bold' }}>
              Enter OTP:
            </label>
            <br />
            {otp.map((digit, index) => (
              <div className="form-group" key={index} style={{ display: 'inline-block', marginRight: '10px' }}>
                <input
                  type="text"
                  className="form-control"
                  id={`otp-input-${index}`}
                  value={digit}
                  onChange={(e) => handleChangeOtp(index, e.target.value)}
                  maxLength="1"
                  style={{ textAlign: 'center', width: '50px' }}
                />
              </div>
            ))}
          </div>
          <button type="button" className="btn btn-primary btn-block" onClick={handleOtpVerification}>
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
