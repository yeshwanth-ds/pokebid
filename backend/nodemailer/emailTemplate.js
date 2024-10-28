export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f0f4f8; /* Light background color */
    }
    .header {
      background-color: #005C97; /* Primary color */
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0; /* Rounded top corners */
    }
    .header h1 {
      color: white;
      margin: 0;
    }
    .content {
      background-color: white;
      padding: 20px;
      border-radius: 0 0 5px 5px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .verification-code {
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 5px;
      color: #00F260; /* Highlight color */
      text-align: center;
      margin: 30px 0;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      color: #888;
      font-size: 0.8em;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Verify Your Email</h1>
  </div>
  <div class="content">
    <p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div class="verification-code">{verificationCode}</div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Your Treatment AI Team</p>
  </div>
  <div class="footer">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;


