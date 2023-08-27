import { type AcceptCandidatesInput } from 'src/types/classes/inputs/AcceptCandidates'
import { type Candidate } from 'src/types/entities/Candidate'
import { Gender } from 'src/types/enums/Gender'
import { sendEmail } from '../sendEmail'

export async function declinedEmailContent (total: number, data: AcceptCandidatesInput, candidate: Candidate, position: number, courseTitle: string): Promise<void> {
  let content = ''

  if (candidate.gender === Gender.female) {
    content = content.concat(`Αγαπητή κυρία ${candidate.surname},<br/>`)
  } else if (candidate.gender === Gender.male) {
    content = content.concat(`Αγαπητέ κύριε ${candidate.surname},<br/>`)
  } else {
    content = content.concat(`Αγαπητοί ${candidate.surname},<br/>`)
  }

  content = content.concat(`<br /><p> Η αξιολόγηση των υποψηφίων για το πρόγραμμα Μεταπτυχιακών Σπουδών <br />
    <b> ${courseTitle}</b> έχει ολοκληρωθεί. Φέτος υπήρξαν ${total} υποψήφιοι που υπέβαλαν εμπρόθεσμα αίτηση για ${data.capacity} θέσεις.
    <br />Η βαθμολογία που λάβατε με βάση τον φάκελό σας και την προφορική συνέντευξη ήταν ${candidate.totalGrade} σύμφωνα με τον κανονισμό σπουδών
    http://msc.it.teithe.gr/wp-content/uploads/2018/06/kanonismos_spoudwn.pdf .
    <br />Με βάση την παραπάνω βαθμολογία η σειρά κατάταξής σας είναι ${position}.
    <br /><br />
    Σε περίπτωση που κάποιοι από τους επιλεγέντες υποψηφίους δεν αποδεχτούν τη θέση τους θα γίνει κλήση των υποψηφίων
    με σειρά κατάταξης μεγαλύτερη του 30 κατά σειρά προτεραιότητας, το αργότερο μέχρι την 7/10/2020.
    <br /><br />
    Με εκτίμηση,<br />

    </p>`)

  await sendEmail(candidate.email, `Αίτητηση Πρόγραμμα Σπουδών ${courseTitle}`, content) // todo check if await is needed
}
