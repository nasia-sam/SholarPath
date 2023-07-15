import { defineStore } from 'pinia'

import fetchAllCandidates from 'src/hooks/Candidate/fetchCandidates'
import useCandidateMutations from 'src/hooks/Candidate/useCandidateActions'

export const candidatesStore = defineStore('candidates', {
  state: () => ({
    candidates: []
  }),
  getters: {
    getCandidates: (state) => state.candidates
  },
  actions: {
    async fetchCandidates (cfsId) {
      this.candidates = await fetchAllCandidates().fetch(cfsId)
    },
    async gradeCandidate (id, data) {
      const res = await useCandidateMutations().gradeCandidateMutation(id, data)

      if (!res) return

      const index = this.candidates.findIndex(candidate => candidate.id === id)

      this.candidates[index] = { ...this.candidates[index], totalGrade: res.totalGrade }
    }
  }
})

export default candidatesStore
