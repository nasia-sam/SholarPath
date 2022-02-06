import { EntityManager } from '@mikro-orm/core'
import { CallForSubmissions } from 'src/types/entities/CallForSubmissions'
import { CFS_State } from 'src/types/enums/CFSState'

export async function checkOpenCFS (em: EntityManager): Promise<void> {
  const cfs = await em.find(CallForSubmissions, {
    $and: [
      { state: { $eq: CFS_State.published } },
      { openFrom: { $lte: new Date() } },
      { closeAt: { $gte: new Date() } }
    ]
  }, ['courseProgram'])

  cfs.forEach(c => {
    c.state = CFS_State.open
    c.courseProgram.open = true
  })

  await em.flush()
}

export async function checkClosedCFS (em: EntityManager): Promise<void> {
  const cfs = await em.find(CallForSubmissions, {
    $and: [
      { state: { $eq: CFS_State.open } },
      { closeAt: { $lte: new Date() } }
    ]
  }, ['courseProgram'])

  cfs.forEach(c => {
    c.state = CFS_State.closed
    c.courseProgram.open = false
  })
}
