import { EntityManager } from '@mikro-orm/core'

import { GradeSubmissionInput } from 'src/types/classes/GadeSubmissionInput'
import { Submission } from 'src/types/entities/Submission'
import { SubmissionState } from 'src/types/enums/SubmissionState'

export async function createSubmissionAction (data: GradeSubmissionInput, em: EntityManager): Promise<string> {
  const dataValues = Object.values(data)

  const submission = em.create(Submission, { ...data, state: SubmissionState.submitted })

  if (dataValues.every(val => [null, undefined, ''].includes(val))) submission.state = SubmissionState.submitted
  else if (dataValues.every(val => ![null, undefined, ''].includes(val))) submission.state = SubmissionState.reviewed
  else submission.state = SubmissionState.processing

  await em.persistAndFlush(submission)

  return submission.id
}

export async function gradeSubmissionAction (id: string, data: GradeSubmissionInput, em: EntityManager): Promise<Submission> {
  const submission = await em.findOneOrFail(Submission, id)

  submission.bachelor_grade = data.bachelor_grade
  submission.thesis_grade = data.thesis_grade
  submission.bachelor_relevance = data.bachelor_relevance
  submission.research_field_relevance = data.research_field_relevance
  submission.research_field_relevance = data.research_field_relevance
  submission.prerequisites_courses_grade = data.prerequisites_courses_grade
  submission.working_experience_relevance = data.working_experience_relevance
  submission.interview = data.interview

  submission.total_grade = (data.bachelor_grade +
    data.thesis_grade +
    data.bachelor_relevance +
    data.research_field_relevance +
    data.research_field_relevance +
    data.prerequisites_courses_grade +
    data.working_experience_relevance +
    data.interview
  )

  await em.flush()
  return submission
}
