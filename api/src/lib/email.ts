import * as nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

export const sendEmail = async (
  to: string,
  subject: string,
  data: string
): Promise<boolean> => {
  // eslint-disable-next-line no-var
  let mailConfig = {}
  let mailOptions: Mail.Options = {}

  if (process.env.NODE_ENV === 'production') {
    // all emails are delivered to destination
    mailConfig = {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: Boolean(process.env.SMTP_SECURE),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    }
    mailOptions.from = process.env.SMTP_USER
  } else {
    // all emails are catched by ethereal.email
    mailConfig = {
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: process.env.SMTP_TEST_USER,
        pass: process.env.SMTP_TEST_PASS,
      },
    }
    mailOptions.from = process.env.SMTP_TEST_USER
  }

  const transporter = nodemailer.createTransport(mailConfig)
  mailOptions = { ...mailOptions, to, subject, html: data }

  try {
    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
