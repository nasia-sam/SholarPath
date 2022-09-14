import { EntityManager } from '@mikro-orm/core'
import path from 'path'
import fsPromise from 'fs/promises'
import { UserInputError } from 'apollo-server-koa'
import { Candidate } from 'src/types/entities/Candidate'
import { PdfFile } from 'src/types/classes/PdfFile'

export async function upploadFile (encoded: string, candidateId: string, em: EntityManager): Promise<void> {
  const candidate = await em.findOneOrFail(Candidate, candidateId)

  const splitBase64 = encoded.split(';base64,')

  const type = splitBase64[0].split('/').pop()

  const base64File = encoded.split(';base64,').pop()

  if (!base64File) return

  const filepath = path.join(process.cwd(), `/src/uploads/cv_${candidateId}.${type ?? 'pdf'}`)

  await fsPromise.writeFile(
    filepath,
    base64File,
    { encoding: 'base64' }
  ).catch(e => {
    console.log(e)
    throw new UserInputError('INVALID_PDF_FILE')
  })

  candidate.cv = {
    name: `${candidate.id}_cv`,
    path: filepath,
    extension: type ?? 'pdf'
  }

  await em.flush()
}

export async function downloadPdfFileAction (candidateId: string, file: PdfFile, em: EntityManager): Promise<string> {
  const candidate = await em.findOneOrFail(Candidate, candidateId)
  if (candidate.cv === undefined) return ''

  if (candidate.cv.path !== file.path) throw new UserInputError('INVALID_CANDIDATE_FILE_MATCH')

  const encodedFile = await fsPromise.readFile(
    file.path,
    { encoding: 'base64' }
  ).catch(err => {
    throw new UserInputError(err.message)
  })

  return encodedFile
}
