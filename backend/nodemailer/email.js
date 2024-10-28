// emailService.js
import { transporter, sender } from './nodemailer.config.js'; // Now imports transporter and sender from updated config
import { VERIFICATION_EMAIL_TEMPLATE } from './emailTemplate.js'; // Import the email template

// Function to send a verification email
export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const info = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`, // Sender address
            to: email, // Recipient's email
            subject: "Verify your email", // Subject of the email
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken), // Email body
        });
        console.log("Verification email sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw new Error(`Error sending verification email: ${error}`);
    }
};
