// const mongoose = require("mongoose");
// const express = require("express");
// const dotenv = require("dotenv");
// // const sendMailController = require('./controllers/sendMail'); // Assuming the controller is in the same directory
// const User = require("./model/RegistrationSchema");
// const EmailVeri=require("./model/EmailVerification");
// const cors = require("cors");
// dotenv.config({ path: "./.env" });
// const app = express();
// app.use(express.json());
// // const sendMail = require("./controllers/sendMail");
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );



// const mongooseconnect = async () => {
//   try {
    
//     await mongoose.connect(process.env.MONGO_URI, {
      
//       useNewUrlParser: true,
      
//       useUnifiedTopology: true,
      
      
//     });
//     console.log("Successfully connected to MongoDB");
//   } catch (error) {
    
//     console.error("Error connecting to MongoDB:", error);
    
    
//   }
// };
// const nodemailer = require("nodemailer");

// const generateNumericOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000);
// };

// const sendMail = async (email) => {
//   try {
//     // Generate numeric OTP
//     const otp = generateNumericOTP();

//     // Save the OTP in the database or use it as needed

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "vamsidulam8500@gmail.com",
//         pass: "dtsw mgmv ncny iyya",
//       },
//     });

//     const mailOptions = {
//       from: "vamsidulam8500@gmail.com",
//       to: email,
//       subject: `Account Verification`,
//       text: `Your OTP for account verification is: ${otp}`,
//     };

//     await transporter.sendMail(mailOptions);
    
//     return otp;

//   } catch (err) {
//     console.log(err);
//     throw new Error("Internal Server Error");
//   }
// };

// app.post("/OtpVerification", async (req, res) => {
//   try {
//     const { Email, otp } = req.body;
//     const existingUser = await EmailVeri.findOne({ Email: Email });

//     if (!existingUser) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     if (existingUser.Otp != otp) {
//       return res.status(401).json({ error: "Invalid OTP" });
//     }

//     existingUser.isVerified = true;
//     await existingUser.save();

//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


// app.post("/EmailVerification", async (req, res) => {
//   console.log(req.body);

//   if (!req.body.Email) {
//     return res.status(422).json("Please fill the fields properly");
//   }

//   try {
//     const existingUser = await User.findOne({ Email: req.body.Email });

//     if (existingUser) {
//       return res.status(422).json("Email Already Exists");
//     } else {
      
//       // Call sendMail function and capture the returned OTP
//       const otp = await sendMail(req.body.Email);
//       const user = new EmailVeri({ Email: req.body.Email, Otp:otp});
//       await user.save();

//       // console.log('OTP generated:', otp);

//       return res.status(200).json({ success: true });

//     }
//   } catch (err) {
//     console.error(err);

//     if (err.message === "Internal Server Error") {
//       res.status(500).json({ error: "Internal Server Error" });
//     } else if (err.name === "ValidationError") {
//       res.status(422).json({ error: "Validation error", details: err.errors });
//     } else {
//       res.status(500).json({ error: "Failed to register" });
//     }
//   }
// });



// app.post('/Register', (req, res) => {
//   console.log(req.body.data);
//   if (!req.body.Password || !req.body.Email) {
//     return res.status(422).json("Please fill the fields properly");
//   }
//   User.findOne({ Email: req.body.Email }).then((Userpresent) => {
//     if (Userpresent){
//       return res.status(422).json("UserName or Email Already Exits");
//     }
//     else {
//       const user = new User({ Username: req.body.Username, Password: req.body.Password, Email: req.body.Email });
//       user.save().then(() => {
//         res.status(201).json({ message: "user registered successfully" });
//       }).catch((err) => res.status(500).json({ err: "Failed to register" }));
//     }
//   }).catch((err) => console.log(err));
// });



// app.post("/authentication", async (req, res) => {
//   const { Email, Password } = req.body;
//   console.log(Email, Password);
//   try {
//     const user = await User.findOne({ Email:Email });
//     console.log(user);
//     if (user && user.Password == Password) {
//       const Email = user.Email;
//       res.status(200).json({ Email });
//     } else {
//       res
//         .status(401)
//         .json({ message: "Authentication failed! Unauthorized access" });
//     }
//   } catch (error) {
//     console.error("Error occurred during authentication:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// app.listen(3001, () => {
//   mongooseconnect();
//   console.log("This is an API");
// });

// app.get("/", (req, res) => {
//   res.send("<strong>This is the API we use!!!<strong>");
// });



const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const User = require("./model/RegistrationSchema");
const EmailVeri = require("./model/EmailVerification");
const cors = require("cors");
dotenv.config({ path: "./.env" });
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const mongooseconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

const nodemailer = require("nodemailer");

const generateNumericOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const sendMail = async (email) => {
  try {
    const otp = generateNumericOTP();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "vamsidulam8500@gmail.com",
        pass: "dtsw mgmv ncny iyya",
      },
    });

    const mailOptions = {
      from: "vamsidulam8500@gmail.com",
      to: email,
      subject: `Account Verification`,
      text: `Your OTP for account verification is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    return otp;
  } catch (err) {
    console.log(err);
    throw new Error("Internal Server Error");
  }
};

app.post("/OtpVerification", async (req, res) => {
  try {
    const { Email, otp } = req.body;
    const existingUser = await EmailVeri.findOne({ Email: Email });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (existingUser.Otp != otp) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    existingUser.isVerified = true;
    await existingUser.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/EmailVerification", async (req, res) => {
  try {
    if (!req.body.Email) {
      return res.status(422).json("Please fill the fields properly");
    }

    // Check if the email already exists in the EmailVeri collection
    const existingEmailVeri = await EmailVeri.findOne({ Email: req.body.Email });

    if (existingEmailVeri) {
      return res.status(422).json("Email Already Exists");
    } else {
      // If the email does not exist, proceed with email verification
      const otp = await sendMail(req.body.Email);
      const user = new EmailVeri({ Email: req.body.Email, Otp: otp });
      await user.save();

      return res.status(200).json({ success: true });
    }
  } catch (err) {
    console.error(err);

    if (err.name === "MongoServerError" && err.code === 11000) {
      // Handle duplicate key error (email already exists in the EmailVeri collection)
      res.status(422).json({ error: "Email Already Exists" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

app.post('/Register', async (req, res) => {
  try {
    if (!req.body.Password || !req.body.Email) {
      return res.status(422).json("Please fill the fields properly");
    }

    const userPresent = await User.findOne({ Email: req.body.Email });

    if (userPresent) {
      return res.status(422).json("UserName or Email Already Exits");
    } else {
      const user = new User({ Username: req.body.Username, Password: req.body.Password, Email: req.body.Email });
      await user.save();
      res.status(201).json({ message: "user registered successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Failed to register" });
  }
});

app.post("/authentication", async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await User.findOne({ Email: Email });

    if (user && user.Password == Password) {
      const userEmail = user.Email;
      res.status(200).json({ Email: userEmail });
    } else {
      res.status(401).json({ message: "Authentication failed! Unauthorized access" });
    }
  } catch (error) {
    console.error("Error occurred during authentication:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(3001, () => {
  mongooseconnect();
  console.log("This is an API");
});

app.get("/", (req, res) => {
  res.send("<strong>This is the API we use!!!<strong>");
});
