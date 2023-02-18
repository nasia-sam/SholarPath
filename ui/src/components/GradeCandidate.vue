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
          <q-btn flat label="Save" @click="submit"/>
        </q-toolbar>
      </q-footer>

      <q-page-container>
        <q-page padding>
          <div v-for="field in gradeFields" :key="field.key">
            <span class="text-grey-9 text-subtitle1">{{ field.title }}</span>

              <q-input
                filled
                dense
                square
                v-model.number="review[field.key]"
                :suffix="field.weigth.toString()"
                :min="field.min_val"
                :max="field.max_val"
                type="number"
                class="q-pb-lg"
              >
              <template v-slot:append>
                <q-icon name="fitness_center" />
              </template>
              </q-input>
          </div>

        </q-page>
      </q-page-container>

    </q-layout>
  </q-dialog>
</template>
<script>
import { defineComponent, ref } from 'vue'

// hooks
import fetchAllCandidates from 'src/hooks/Candidate/fetchCandidates'
import useCandidateMutations from 'src/hooks/Candidate/useCandidateActions'

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
    const { gradeCandidateMutation } = useCandidateMutations()

    // onMounted(async () => {
    //   await fetchById(props.candidateId)
    // })

    const visible = ref(false)

    // const candidate = ref({})
    const review = ref([])

    const open = async (candidateRow) => {
      console.log('!!', candidateRow)
      const gradeKeys = props.gradeFields.map(gf => gf.key)
      // candidate.value = candidateRow
      await fetchById(candidateRow.id)

      review.value = props.gradeFields.reduce((acc, cur) => {
        acc[cur.key] = null
        return acc
      }, {})

      const fieldKeys = Object.keys(review.value)
      if (candidate.value?.review && candidate.value.review.length > 0) {
        console.log('!!!!!!!!', fieldKeys)
        fieldKeys.forEach(key => {
          review.value[key] = candidate.value.review.find(review => review.key === key).grade
        })
      } else {
        review.value = gradeKeys.map(gf => { return { [gf]: null } })
      }

      // review.value = props.gradeFields.reduce((acc, cur) => {
      //   acc[cur.key] = (candidate.value.review && candidate.value.review[cur.key]) ? candidate.value.review[cur.key] : null
      //   return acc
      // }, {})

      visible.value = true
    }

    const submit = async () => {
      const finalReview = []

      Object.keys(review.value).forEach(k => {
        finalReview.push({ key: k, grade: review.value[k] })
      })
      await gradeCandidateMutation(candidate.value.id, finalReview)

      visible.value = false
    }

    return {
      candidate,
      visible,
      review,
      open,
      submit
    }
  }
})
</script>
<style>

</style>
