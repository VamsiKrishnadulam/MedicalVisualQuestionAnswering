import React from 'react';

const MedicalVQA = () => {
  return (
    <div>
      <style>
        {`
          body {
            background-color: black;
            color: #f0f0f0; 
            font-family: 'Roboto', sans-serif; 
          }
          h2 {
            font-size: 6em; 
            font-family: 'Montserrat', sans-serif; 
            font-weight: 300; 
            background: linear-gradient(to right, #086FFF, #FFDDB7, #086FFF);
            -webkit-background-clip: text;
            color: transparent;
            background-size: 200% auto;
            animation: gradientAnimation 5s linear infinite;
          }

          h1 {
            font-size: 10em; /* Adjust the size as needed */
            font-family: 'Montserrat', sans-serif; /* Change the font family as needed */
            font-weight: 300; /* Adjust the font weight (300 is usually a slightly thin option) */
            background: linear-gradient(to right, #086FFF, #FFDDB7, #086FFF);
            -webkit-background-clip: text;
            color: transparent;
            background-size: 200% auto;
            animation: gradientAnimation 5s linear infinite;
          }

          // @keyframes gradientAnimation {
          //   0% {
          //     background-position: 0% 50%;
          //   }
          //   50% {
          //     background-position: 100% 50%;
          //   }
          //   100% {
          //     background-position: 0% 50%;
          //   }
          // }
        `}
      </style>

      <div>
        <h2>Welcome to</h2>
        <h1> Medical VQA</h1>
      </div>
    </div>
  );
}

export default MedicalVQA;
