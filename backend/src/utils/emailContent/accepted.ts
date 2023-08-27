import { type AcceptCandidatesInput } from 'src/types/classes/inputs/AcceptCandidates'
import { type CallForSubmissions } from 'src/types/entities/CallForSubmissions'
import { type Candidate } from 'src/types/entities/Candidate'

import { format } from 'date-fns'
import { sendEmail } from '../sendEmail'
import { Gender } from 'src/types/enums/Gender'

export async function acceptedEmailContent (data: AcceptCandidatesInput, candidate: Candidate, cfs: CallForSubmissions, total: number): Promise<void> {
  let content = ''

  if (candidate.gender === Gender.female) {
    content = content.concat(`Αγαπητή κυρία ${candidate.surname},<br/>`)
  } else if (candidate.gender === Gender.male) {
    content = content.concat(`Αγαπητέ κύριε ${candidate.surname},<br/>`)
  } else {
    content = content.concat(`Αγαπητοί ${candidate.surname},<br/>`)
  }

  content = content.concat(`<br /><p>Η αξιολόγηση των υποψηφίων για το πρόγραμμα Μεταπτυχιακών Σπουδών με τίτλο <br />
    <b> ${cfs.courseProgram.title}</b> έχει ολοκληρωθεί. Φέτος υπήρξαν ${total} υποψήφιοι που υπέβαλαν εμπρόθεσμα αίτηση για ${data.capacity} θέσεις.
    <br /><br />
    Βρισκόμαστε στην ευχάριστη θέση να σας ανακοινώσουμε ότι έχετε επιλεγεί για εισαγωγή στο εν λόγω Πρόγραμμα Μεταπτυχιακών Σπουδών!
    <br />

    Παρακαλείστε μέχρι την ${format(data.deadline, 'M/d/yyyy HH:mm')} να υποβάλετε ηλεκτρονικά στη διεύθυνση info-msc@it.teithe.gr
    υπεύθυνη δήλωση του Ν. 1599/86 με την οποία να δηλώνετε ότι
    (α) αποδέχεστε την θέση φοίτησης στο Πρόγραμμα Μεταπτυχιακών Σπουδών με τίτλο "Ευφυείς Τεχνολογίες Διαδικτύου"
    και (β) έχετε διαβάσει και αποδέχεστε τον κανονισμό σπουδών του Προγράμματος Μεταπτυχιακών Σπουδών.<br />
    Η παραπάνω προθεσμία είναι αποκλειστική.<br /><br />

    Σε περίπτωση μη εμπρόθεσμης υποβολής της παραπάνω υπεύθυνης δήλωσης θα θεωρηθεί ότι αρνείστε την θέση
    και θα γίνει κλήση του επόμενου υποψηφίου με σειρά προτεραιότητας.
    <br /><br />
    Συγχαρητήρια και Καλή Ακαδημαϊκή Χρονιά.
    <br /><br />
    Με εκτίμηση,<br />
      ${cfs.courseProgram.admin?.name ?? 'η Επιτροπή Αξιολόγησης'}
    </p>`)

  await sendEmail(candidate.email, `Αίτητηση Πρόγραμμα Σπουδών ${cfs.courseProgram.title}`, content)
}
