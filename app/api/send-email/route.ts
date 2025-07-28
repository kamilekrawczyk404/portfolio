import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phoneNumber?: string;
}

interface ApiResponse {
  status: number;
  message: string;
  error?: string;
}
export async function POST(req: NextRequest) {
  const { name, email, subject, message, phoneNumber }: ContactFormData =
    await req.json();

  if (!name || !email || !subject || !message) {
    return NextResponse.json<ApiResponse>(
      {
        status: 400,
        message:
          "An error occurred while trying to send email: missing required fields",
      },
      { status: 400 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    logger: true,
    debug: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const mailOptions = {
      from: email,
      to: process.env.SMTP_USER,
      replyTo: email,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${
          phoneNumber
            ? `<p><strong>Phone number: ${phoneNumber}</strong></p>`
            : ``
        }
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { status: 200, message: "Email sent successfully!" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        status: 500,
        message: "Failed to send email.",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
