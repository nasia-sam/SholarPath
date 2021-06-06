import { EntityManager } from '@mikro-orm/core'
import { CallForSubmissions } from 'src/types/entities/CallForSubmissions'
import { Gender } from 'src/types/entities/Candidate'
import { Submission } from 'src/types/entities/Submission'

export async function acceptedEmailContent (submission: Submission, em: EntityManager): Promise<string> {
  const candidate = submission.candidate
  const cfs = await em.findOneOrFail(CallForSubmissions, submission.cfs, ['courseProgram'])

  let content = ''

  if (candidate.gender === Gender.female) {
    content = content.concat(`Αγαπητή κυρία ${candidate.surname},<br/>`)
  } else if (candidate.gender === Gender.male) {
    content = content.concat(`Αγαπητέ κύριε ${candidate.surname},<br/>`)
  } else {
    content = content.concat(`Αγαπητοί ${candidate.surname},<br/>`)
  }

  content = content.concat(`<br /><p> Με χαρά σας ενημέρωνουμε ότι έχετε επιλεγεί στο Μεταπτυχιακό Πρόγραμμα Σπουδών <br />
    <b> ${cfs.courseProgram.title}</b> για το εξάμηνο ${cfs.year.getMonth() + 1}/${cfs.year.getFullYear()}.
    <br /><br />
    Με εκτίμηση,<br />

    </p>`)

  return content
}
