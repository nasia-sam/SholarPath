import { APP_NAME, CLIENT_URL } from 'src/dependencies/Config'

import { type References } from 'src/types/classes/Referencies'
import { type Candidate } from 'src/types/entities/Candidate'
import { Gender } from 'src/types/enums/Gender'

export async function sentReferenceContent (candidate: Candidate, referenceInfo: References, courseName: string): Promise<string> {
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
    ${CLIENT_URL}/${referenceInfo.token}
    <br /><br />
    Σας ευχαριστούμε για τη συνεργασία σας σε αυτήν τη διαδικασία.
    <br /><br />
    Με εκτίμηση,
    Η Ομάδα του ${APP_NAME}`)

  return content
}
