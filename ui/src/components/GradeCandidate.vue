<template>
  <q-dialog v-model="visible">
     <q-layout view="Lhh lpR fff" container class="bg-white q-pa-md" style=" height: 95%;">

       <q-header>
        <q-toolbar>
          <q-toolbar-title>Αξιολόγηση Υποψηφίου</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-footer class="text-white">
        <q-toolbar class="row justify-end">
          <q-btn flat label="Cancel" @click="cancel"/>
          <q-btn flat label="Save" @click="submit"/>
        </q-toolbar>
      </q-footer>

      <q-page-container>
        <q-page>
          <pre>
            {{ candidate }}
          </pre>
        </q-page>
      </q-page-container>

    </q-layout>
  </q-dialog>
</template>
<script>
import { defineComponent, onMounted } from 'vue'

import fetchAllCandidates from 'src/hooks/Candidate/fetchCandidates'

export default defineComponent({
  name: 'GradeCandidateForm',
  props: {
    candidateId: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const { fetch: fetchById, candidate } = fetchAllCandidates()

    onMounted(async () => {
      await fetchById(props.candidateId)
    })

    return {
      candidate
    }
  }
})
</script>
<style>

</style>
