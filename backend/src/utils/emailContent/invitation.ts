import { APP_NAME, CLIENT_URL } from 'src/dependencies/Config'
import { type User } from 'src/types/entities/User'
import { sendEmail } from '../sendEmail'

export async function sendInvitationContent (email: string, token: string, user: User): Promise<void> {
  const content = `Έχετε λάβει πρόσκληση για να εγγραφείτε στην πλατφόρμα ${APP_NAME} από τον χρήστη ${user.name}.
  <br /><br />
  Με την εγγραφή σας στην πλατφόρμα, θα αποκτήσετε τη δυνατότητα να αξιολογείτε αιτήσεις υποψηφίων σε προγράμματα σπουδών που θα ανατεθούν σε εσάς.
  <br /><br />
  Για να ολοκληρώσετε την εγγραφή σας, παρακαλούμε επισκεφθείτε την παρακάτω διεύθυνση:<br />
  ${CLIENT_URL}/register/${token}
  <br /><br />
  Σας ευχαριστούμε για το ενδιαφέρον σας να γίνετε μέρος της κοινότητάς μας.
  <br /><br />
  Με εκτίμηση,
  Η Ομάδα του ${APP_NAME}
  `

  await sendEmail(email, 'Πρόσκληση Εγγραφής ' + APP_NAME, content)
}
