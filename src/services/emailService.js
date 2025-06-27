require("dotenv").config();
const nodemailer = require("nodemailer");

let sendEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.BACK_END_APP_MAIL_APP,
      pass: process.env.BACK_END_APP_MAIL_APP_PASSWORD,
    },
  });
  let info = await transporter.sendMail({
    from: '"HR PLT Solution" <thanhdo062305@gmail.com>',
    to: dataSend.reciverEmail,
    subject: `Thank you for your interest in PLT PSI – update on the status of your job application`,
    html: htmlBody(dataSend),
  });
};

const htmlBody = (dataSend) => {
  const { fullName, statusCv } = dataSend;

  let messageBody = "";

  if (statusCv === "CV2") {
    messageBody = `
      <p>Dear ${fullName},</p>
      <p>We wanted to let you know that we have <strong>reviewed your CV</strong> for the internship position. Our team is currently evaluating all applications and you will receive a follow-up email regarding the next step.</p>
      <p>We appreciate your patience and thank you for applying.</p>
    `;
  } else if (statusCv === "CV3") {
    messageBody = `
      <p>Dear ${fullName},</p>
      <p>We are pleased to inform you that you have been <strong>accepted</strong> for the internship position at our company.</p>
      <p>Our HR team will reach out to you shortly with more information about the onboarding process. We are excited to have you onboard!</p>
    `;
  } else if (statusCv === "CV4") {
    messageBody = `
      <p>Dear ${fullName},</p>
      <p>Thank you for your interest in our internship program. We truly appreciate the time and effort you invested in your application.</p>
      <p>Unfortunately, we regret to inform you that we have decided to move forward with other applicants for this position.</p>
      <p>We will keep your information in our talent pool and contact you should other opportunities arise that better match your skills and experience.</p>
    `;
  }

  return `
    <div style="
    max-width: 600px;
    margin: 0 auto;
    border: 1px solid #008080;
    padding: 24px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    line-height: 1.6;
    color: #333;
">
  ${messageBody}

  <p style="margin-top: 24px;">
    Thank you again for your time and effort.<br>
    <strong>Best regards,</strong><br>
    <em>Talent Acquisition Team</em>
  </p>

  <hr style="margin: 30px 0; border: none; border-top: 1px solid #ccc;" />

  <div style="font-size: 13px; color: #555;">
    <strong>PLT PSI</strong><br>
    📞 <a href="tel:0974660075" style="color: #008080; text-decoration: none;">0974 660 075</a><br>
    🌐 <a href="https://psi.plt.pro.vn" style="color: #008080;" target="_blank">https://psi.plt.pro.vn</a><br>
    📍 Vĩnh Phú 41, Quốc Lộ 13, Thuận An, Bình Dương
  </div>
</div>
  `;
};


module.exports = {
  sendEmail,
};
