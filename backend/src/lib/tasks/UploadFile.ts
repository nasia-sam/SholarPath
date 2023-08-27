import { type EntityManager } from '@mikro-orm/core'
import { UserInputError } from 'apollo-server-koa'

import path from 'path'
import fsPromise from 'fs/promises'
import fs from 'fs'

import { Candidate } from 'src/types/entities/Candidate'
import { type PdfFile } from 'src/types/classes/PdfFile'

export async function upploadFile (encoded: string, fileType: string, candidateId: string, em: EntityManager, index?: number): Promise<void> {
  const candidate = await em.findOneOrFail(Candidate, candidateId)

  const splitBase64 = encoded.split(';base64,')

  const type = splitBase64[0].split('/').pop()

  const base64File = encoded.split(';base64,').pop()

  if (!base64File) return

  let fileName = `${fileType}_${candidateId}`
  if (index) fileName = fileName + `_${index}`

  const filepath = path.join(process.cwd(), `/src/uploads/${candidateId}/${fileName}.${type ?? 'pdf'}`)

  // create dir if it doesnt exist
  if (!fs.existsSync(path.join(process.cwd(), `/src/uploads/${candidateId}`))) {
    fs.mkdirSync(path.join(process.cwd(), `/src/uploads/${candidateId}`))
  }

  await fsPromise.writeFile(
    filepath,
    base64File,
    { encoding: 'base64' }
  ).catch(e => {
    console.log(e)
    throw new UserInputError('INVALID_PDF_FILE')
  })

  const newFile = {
    name: `${candidate.id}_cv`,
    path: fileName,
    type: fileType,
    extension: type ?? 'pdf'
  }
  candidate.attachedDocuments.push(newFile)

  await em.flush()
}

export async function downloadPdfFileAction (file: PdfFile): Promise<string> {
  // const candidate = await em.findOneOrFail(Candidate, candidateId)
  // if (candidate.cv === undefined) return ''

  // if (candidate.cv.path !== file.path) throw new UserInputError('INVALID_CANDIDATE_FILE_MATCH')

  const encodedFile = await fsPromise.readFile(
    file.path,
    { encoding: 'base64' }
  ).catch(err => {
    throw new UserInputError(err.message)
  })

  return encodedFile
}
