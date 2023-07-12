import nodemailer from 'nodemailer'
import { EMAIL_ADDRESS, EMAIL_NAME, USER_EMAIL, USER_EMAIL_PWD } from '../dependencies/Config'

export async function sendEmail (email: string, subject: string, content: string): Promise<void> {
  const account = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport({
    host: account.smtp.host,
    port: 587,
    secure: false,
    auth: {
      user: USER_EMAIL !== '' ? USER_EMAIL : account.user,
      pass: USER_EMAIL_PWD !== '' ? USER_EMAIL_PWD : account.pass
    }
  })

  const info = await transporter.sendMail({
    from: `"${EMAIL_NAME}" <${EMAIL_ADDRESS}>`,
    to: email,
    subject: subject,
    html: content
  })

  console.log('Message sent: ', info.messageId)
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}
