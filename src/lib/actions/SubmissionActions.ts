import { EntityManager } from '@mikro-orm/core'

import { GradeSubmissionInput } from 'src/types/classes/GadeSubmissionInput'
import { Submission } from 'src/types/entities/Submission'

export async function gradeSubmissionAction (data: GradeSubmissionInput, em: EntityManager): Promise<Submission> {
  const submission = await em.findOneOrFail(Submission, data.id)

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
