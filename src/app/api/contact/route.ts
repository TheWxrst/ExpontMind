import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone } = await request.json();

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Create transporter with Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email content with beautiful HTML template
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: "expontmindsolutions@gmail.com",
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #ffffff; font-family: 'Helvetica Neue', Arial, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f0a0a; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #1a1a1a; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.4);">

                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%); padding: 40px 40px 30px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                      <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;">
                        EXPONT MIND
                      </h1>
                      <p style="margin: 10px 0 0; color: rgba(255,255,255,0.5); font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase;">
                        New Contact Form Submission
                      </p>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">

                      <!-- Sender Info -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                        <tr>
                          <td style="padding: 20px; background-color: rgba(255,255,255,0.03); border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="padding-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.08);">
                                  <p style="margin: 0 0 4px; color: rgba(255,255,255,0.4); font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase;">From</p>
                                  <p style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 500;">${name}</p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding-top: 16px;">
                                  <p style="margin: 0 0 4px; color: rgba(255,255,255,0.4); font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase;">Email</p>
                                  <a href="mailto:${email}" style="color: #ffffff; font-size: 14px; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.3);">${email}</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- Phone -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding-top: 16px;">
                            <p style="margin: 0 0 4px; color: rgba(255,255,255,0.4); font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase;">Phone</p>
                            <a href="tel:${phone}" style="color: #ffffff; font-size: 14px; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.3);">${phone}</a>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding: 24px 40px; background-color: rgba(0,0,0,0.3); border-top: 1px solid rgba(255,255,255,0.08);">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <p style="margin: 0; color: rgba(255,255,255,0.3); font-size: 11px; letter-spacing: 0.1em;">
                              This message was sent via the contact form on expontmind.com
                            </p>
                          </td>
                          <td align="right">
                            <a href="mailto:${email}" style="display: inline-block; padding: 10px 20px; background-color: rgba(255,255,255,0.1); color: #ffffff; font-size: 11px; font-weight: 500; text-decoration: none; border-radius: 4px; letter-spacing: 0.1em; text-transform: uppercase; border: 1px solid rgba(255,255,255,0.15);">
                              Reply
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      replyTo: email,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
