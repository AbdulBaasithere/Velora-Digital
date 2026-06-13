import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, businessName, phone, email, packageInterested, message } = data;

    // 1. Basic validation
    if (!name || !businessName || !phone || !email) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 2. Save lead locally to a JSON file (leads.json)
    const filePath = path.join(process.cwd(), "leads.json");
    let leads = [];

    try {
      const fileData = await fs.readFile(filePath, "utf-8");
      leads = JSON.parse(fileData);
    } catch {
      // File doesn't exist yet, start with empty array
    }

    const newLead = {
      id: Date.now().toString(),
      name,
      businessName,
      phone,
      email,
      packageInterested: packageInterested || "Not Specified",
      message: message || "",
      timestamp: new Date().toISOString(),
    };

    leads.push(newLead);
    await fs.writeFile(filePath, JSON.stringify(leads, null, 2), "utf-8");

    // 3. Send email via SMTP if configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactEmail = process.env.CONTACT_EMAIL || "veloradigital77@gmail.com";

    let emailSent = false;
    let emailError = "";

    if (smtpHost && smtpPort && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: parseInt(smtpPort),
          secure: parseInt(smtpPort) === 465, // true for 465, false for other ports
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const mailOptions = {
          from: `"Velora Digital Leads" <${smtpUser}>`,
          to: contactEmail,
          subject: `New Lead: ${businessName} - ${name}`,
          text: `
You have received a new consultation request from Velora Digital website:

Client Details:
- Name: ${name}
- Business Name: ${businessName}
- Phone: ${phone}
- Email: ${email}
- Package Interested In: ${packageInterested || "Not Specified"}

Message:
${message || "No message provided."}
          `,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px;">
              <h2 style="color: #6c5ce7; border-bottom: 2px solid #6c5ce7; padding-bottom: 10px;">New Consultation Request</h2>
              <p>You have received a new lead from the <strong>Velora Digital</strong> website.</p>
              
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr style="background-color: #f9f9f9;">
                  <td style="padding: 10px; font-weight: bold; border: 1px solid #ddd; width: 180px;">Client Name</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; border: 1px solid #ddd;">Business Name</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${businessName}</td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                  <td style="padding: 10px; font-weight: bold; border: 1px solid #ddd;">Phone Number</td>
                  <td style="padding: 10px; border: 1px solid #ddd;"><a href="tel:${phone}">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; border: 1px solid #ddd;">Email Address</td>
                  <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                  <td style="padding: 10px; font-weight: bold; border: 1px solid #ddd;">Package Interested</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${packageInterested || "Not Specified"}</td>
                </tr>
              </table>
              
              <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #6c5ce7; margin-top: 20px; border-radius: 4px;">
                <h4 style="margin-top: 0; margin-bottom: 10px; color: #4a3db8;">Message</h4>
                <p style="margin: 0; white-space: pre-wrap; line-height: 1.5;">${message || "No message provided."}</p>
              </div>
              
              <p style="font-size: 12px; color: #999; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px; text-align: center;">
                Sent from Velora Digital Web Platform
              </p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
      } catch (err: any) {
        console.error("Email sending error:", err);
        emailError = err?.message || "Unknown SMTP error";
      }
    }

    return NextResponse.json({
      success: true,
      message: "Lead saved successfully!",
      emailSent,
      emailError: emailError ? `SMTP configured but failed: ${emailError}` : undefined,
    });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
