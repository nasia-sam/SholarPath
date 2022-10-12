import { EntityManager } from '@mikro-orm/core'
import nodemailer from 'nodemailer'
import { EMAIL_ADDRESS, EMAIL_NAME, USER_EMAIL, USER_EMAIL_PWD } from '../dependencies/Config'

import { Submission } from 'src/types/entities/Submission'
import { acceptedEmailContent } from './emailContent/accepted'

export async function createContentEmail (submissionId: string, status: string, em: EntityManager): Promise<void> {
  const submission = await em.findOneOrFail(Submission, { id: submissionId }, { populate: ['candidate', 'candidate.cfs', 'candidate.cfs.courseProgram'] })

  const account = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport({
    host: 'smtp.etheral.email',
    port: 587,
    secure: false,
    auth: {
      user: USER_EMAIL !== '' ? USER_EMAIL : account.user,
      pass: USER_EMAIL_PWD !== '' ? USER_EMAIL_PWD : account.pass
    }
  })

  let context = ''
  if (status === 'accept') {
    context = await acceptedEmailContent(submission, em)
  }

  const info = await transporter.sendMail({
    from: `"${EMAIL_NAME}" <${EMAIL_ADDRESS}>`,
    to: submission.candidate.email,
    subject: `Αίτηση για Πρόγραμμα Σπουδών ${submission.candidate.cfs.courseProgram.title}`,
    html: context
  })

  console.log('Message sent: ', info.messageId)
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}
