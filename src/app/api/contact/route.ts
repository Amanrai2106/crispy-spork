import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      countryCode,
      category,
      subCategory,
      subject,
      message,
    } = body ?? {};

    if (!name || !email || !phone || !countryCode || !category || !subCategory || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const created = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone,
        countryCode,
        category,
        subCategory,
        subject,
        message,
      },
    });

    // Send Email
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"${name}" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL, // Receiver's email
        replyTo: email,
        subject: `New Contact Submission: ${subject || "No Subject"}`,
        text: `
          You have received a new message from your website contact form.
          
          Details:
          Name: ${name}
          Email: ${email}
          Phone: ${countryCode} ${phone}
          Category: ${category}
          Sub-Category: ${subCategory}
          
          Message:
          ${message}
        `,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Contact Submission</h2>
            <div style="background: #f9f9f9; padding: 20px; border-radius: 5px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Phone:</strong> ${countryCode} ${phone}</p>
              <p><strong>Category:</strong> ${category}</p>
              <p><strong>Sub-Category:</strong> ${subCategory}</p>
              <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;">
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully to", process.env.CONTACT_EMAIL);
    } catch (emailError: any) {
      console.error("Error sending email:", emailError);
      return NextResponse.json({ error: `Email Error: ${emailError.message}` }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: created.id });
  } catch (err: any) {
    console.error("Error in contact API:", err);
    return NextResponse.json({ error: `Server Error: ${err.message}` }, { status: 500 });
  }
}

export async function GET() {
  try {
    const latest = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
    return NextResponse.json({ ok: true, latest, count: latest.length });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
