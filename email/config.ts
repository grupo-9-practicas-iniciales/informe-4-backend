import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config();


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASSOWRD
    }
})

transporter.verify()
    .then(() => {
        console.log('Ready for send emails');
    })
    .catch((error) => {
        console.log('There was an error at sending emails');
        console.log(error);
    })

export default transporter;