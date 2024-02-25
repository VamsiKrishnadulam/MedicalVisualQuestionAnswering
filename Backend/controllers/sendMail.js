const nodemailer = require("nodemailer");

// Function to generate a random numeric OTP
const generateNumericOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

const sendMail = async (req, res) => {
    try {
        const { email } = req.body;

        // Generate numeric OTP
        const otp = generateNumericOTP();

        // Save the OTP in the database or use it as needed

        const user = await UserModel.create({ role, email, password });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "vamsidulam8500@gmail.com",
                pass: "ogly syvs uxlk uwr",
            },
        });

        const mailOptions = {
            from: "vamsidulam8500@gmail.com",
            to: email,
            subject: `Account Verification`,
            text: `Your OTP for account verification is: ${otp}`,
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log("Email Sent Successfully!");
            }
        });

        res.status(200).json({ role: role, created: true });


        return otp;

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = sendMail;
