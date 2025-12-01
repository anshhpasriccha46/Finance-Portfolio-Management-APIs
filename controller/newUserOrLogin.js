import { createUserAndStock , handleLogin } from "../models/updateDB.js";

import nodemailer from "nodemailer";

export async function sendMail({ to, subject, text }) {
  try {
    // 1. Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,        // your Gmail ID
        pass: process.env.EMAIL_PASS    // your App Password
      }
    });

    // 2. Mail options (text only)
    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      text
    };

    // 3. Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return info;

  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
}


export  async function addNewUser (req, res) {
   createUserAndStock(req, res);
   sendMail({ to: req.body.email, subject: "Welcome to FinSync", text: `Welcome aboard FinSync!
Your finance dashboard is set — explore your portfolio anytime, anywhere.` });
}
export  async function loginUser (req, res) {
   handleLogin(req, res);
      sendMail({ to: req.body.email, subject: "Welcome Back to FinSync", text: `Welcome Back , Lets dive back in.` });
}