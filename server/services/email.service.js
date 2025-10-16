// This is the full HTML template from above
const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Verification Code</title>
</head>
<body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important; font-family: Helvetica, Arial, sans-serif;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" style="background-color: #f4f4f4;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="center" valign="top" style="padding: 40px 10px 40px 10px;">
                            <h1 style="font-size: 28px; color: #333333; margin: 0;">{{PRODUCT_NAME}}</h1>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="background-color: #ffffff; border-radius: 8px; padding: 40px 30px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="center" style="font-size: 24px; font-weight: bold; color: #333333;">
                                        Your Verification Code
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="font-size: 16px; line-height: 24px; color: #666666; padding: 20px 0 30px 0;">
                                        Please use the following code to complete your verification. The code is valid for 10 minutes.
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <div style="background-color: #f0f3f8; border-radius: 8px; padding: 15px 25px;">
                                            <h2 style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: bold; color: #1d4ed8; letter-spacing: 10px; margin: 0;">
                                                {{CODE}}
                                            </h2>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding: 30px 0 0 0; font-size: 14px; color: #999999;">
                                        If you didn't request this, you can safely ignore this email.
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 30px 10px 30px 10px; color: #888888; font-size: 12px; line-height: 18px;">
                            <p style="margin: 0;">&copy; 2025 Sumeet Umbalkar. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

export const sendVerificationEmail = async (recipientEmail, code) => {
  const brevoApiKey = process.env.BREVO_API_KEY;
  if (!brevoApiKey) {
    console.error("Brevo API key is not set in environment variables.");
    throw new Error("Email service is not configured.");
  }

  // Replace placeholders in the HTML template
  const personalizedHtml = htmlTemplate
    .replace("{{CODE}}", code)
    .replace(/{{PRODUCT_NAME}}/g, "Confirmation"); // Use regex 'g' flag to replace all occurrences

  const payload = {
    sender: {
      name: "sumeet.live",
      email: "sum.pro57@gmail.com", // ⚠️ Replace with your verified sender email in Brevo
    },
    to: [
      {
        email: recipientEmail,
      },
    ],
    subject: `Your verification code is ${code}`,
    htmlContent: personalizedHtml,
  };

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to send email via Brevo:", errorData);
      throw new Error(`Brevo API Error: ${errorData.message}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in sendVerificationEmail:", error);
    throw error; // Re-throw the error to be caught by the controller
  }
};
