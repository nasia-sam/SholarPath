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
          <q-btn flat label="Cancel" />
          <q-btn flat label="Save" />
        </q-toolbar>
      </q-footer>

      <q-page-container>
        <q-page padding>
          <div v-for="field in gradeFields" :key="field.key">
            <span class="text-grey-9 text-subtitle1">{{ field.title }}</span>
            <q-input
              filled
              dense
              v-model:number="review[field.key]"
              type="number"
              class="q-pb-lg"
              :rules="[isRequired]"
            />
          </div>
          <!-- <pre>
            {{ candidate }}
          </pre> -->
        </q-page>
      </q-page-container>

    </q-layout>
  </q-dialog>
</template>
<script>
import { defineComponent, ref } from 'vue'

import fetchAllCandidates from 'src/hooks/Candidate/fetchCandidates'

export default defineComponent({
  name: 'GradeCandidateForm',
  props: {
    gradeFields: {
      type: Array,
      required: true
    }
  },
  setup (props) {
    const { fetchById, candidate } = fetchAllCandidates()

    // onMounted(async () => {
    //   await fetchById(props.candidateId)
    // })

    const visible = ref(false)

    // const candidate = ref({})
    const review = ref()

    const open = async (candidateRow) => {
      console.log('!!', candidateRow)
      // candidate.value = candidateRow
      await fetchById(candidateRow.id)

      review.value = props.gradeFields.map(field => {
        return {
          [field.key]: (candidate.value.review && candidate.value.review[field.key]) ? candidate.value.review[field.key] : 0
        }
      })
      visible.value = true
    }

    return {
      candidate,
      visible,
      review,
      open
    }
  }
})
</script>
<style>

</style>
