import { APP_NAME, CLIENT_URL } from 'src/dependencies/Config'

import { type Candidate } from 'src/types/entities/Candidate'
import { type Reference } from 'src/types/entities/Reference'
import { Gender } from 'src/types/enums/Gender'
import { sendEmail } from '../sendEmail'

export async function sentReferenceContent (candidate: Candidate, referenceInfo: Reference, courseName: string): Promise<void> {
  let content = ''
  let candidateName = ''

  if (candidate.gender === Gender.female) {
    candidateName = `την υποψήφια ${candidate.surname} ${candidate.name}`
  } else if (candidate.gender === Gender.male) {
    candidateName = `τoω υποψήφιο ${candidate.surname} ${candidate.name}`
  } else {
    candidateName = `τ@ υποψήφι@ ${candidate.surname} ${candidate.name}`
  }

  content = content.concat(`Σας ενημερώνουμε ότι έχετε επιλεγεί για να συντάξετε μια συστατική επιστολή για ${candidateName} προς το Μεταπτυχιακό Πρόγραμμα Σπουδών: ${courseName}.
    <br /><br />
    Για να υποβάλετε τη συστατική επιστολή, παρακαλούμε επισκεφθείτε την παρακάτω διεύθυνση:
    ${CLIENT_URL}/reference/${referenceInfo.token}
    <br /><br />
    Σας ευχαριστούμε για τη συνεργασία σας σε αυτήν τη διαδικασία.
    <br /><br />
    Με εκτίμηση,
    Η Ομάδα του ${APP_NAME}`)

  await sendEmail(referenceInfo.email, 'ScholarPath: Συστατική επιστολή για Υποψήφιο Σπουδαστή', content)
}
