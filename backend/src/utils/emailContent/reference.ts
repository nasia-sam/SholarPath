import { CLIENT_URL } from 'src/dependencies/Config'

import { type personalInfo } from 'src/types/classes/inputs/CandidateInput'
import { type References } from 'src/types/classes/Referencies'
import { type Candidate } from 'src/types/entities/Candidate'
import { Gender } from 'src/types/enums/Gender'

export async function sentReferenceContent (candidate: Candidate, info: personalInfo, referenceInfo: References, courseName: string, em: EntityManager): Promise<string> {
  let content = ''
  let candidateName = ''

  if (candidate.gender === Gender.female) {
    candidateName = `της κυρίας ${candidate.surname} ${candidate.name}`
  } else if (candidate.gender === Gender.male) {
    candidateName = `τoυ κύριου ${candidate.surname} ${candidate.name}`
  } else {
    candidateName = `τ@ ${candidate.surname} ${candidate.name}`
  }

  content = content.concat(`<br /><p> 'Εχετε επιλεγεί για την σύνταξη συστατικής επιλογής ${candidateName} στο Μεταπτυχιακό Πρόγραμμα Σπουδών <br />
    <b> ${courseName}</b><br />.
    <br />Για την σύσταση παρακαλώ επισκεφθείτε την σελίδα <b>${CLIENT_URL}/${referenceInfo.token}</b>.
    <br /><br />
    Με εκτίμηση,<br />
    ??
    </p>`)

  return content
}
