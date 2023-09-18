<template>
  <q-page padding>
    <div class="row justify-between q-mb-lg">
      <span class="text-h4"> Υποψήφιοι </span>

      <div class="row flex flex-center">
        <div class="q-px-md">
          <q-btn
            v-if="selectedIsClosed"
            :loading="acceptLoading"
            color="secondary"
            @click="AcceptCandidatesRef.open()">
            Αποδοχη αιτησεων
          </q-btn>
        </div>

        <q-select
          square
          outlined
          v-model="selectedCfs"
          :options="cfs"
          label="CFS"
          emit-value
          map-options
          option-value="value"
          option-label="label"
          style="width: 250px"
        />
      </div>
    </div>

    <q-table
      :rows="candidates"
      :columns="columns"
      :filter="filter"
      row-key="id"
    >
      <!-- Search Button -->
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <!-- Show Attached Pdfs -->
      <template v-slot:body-cell-attachments="props">
        <q-td :props="props">
          <q-btn flat color="secondary" icon="attach_file">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup v-for="item in props.row.attachedDocuments" :key="item.name">
                  <q-item-section @click="ShowPdfFilesRef.open(item, props.row.id)">{{ item.type }}</q-item-section>
                </q-item>
                <q-separator spaced />
                <q-item clickable v-close-popup v-for="(item, index) in props.row.references" :key="item">
                  <q-item-section @click="ShowReferenceRef.open(item)">Refence #{{ index + 1 }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-td>
      </template>

      <!-- State Icon -->
      <template #body-cell-state="props">
        <q-td :props="props">
          <q-icon v-if="props.row.state === 'submitted'" name="done">
            <q-tooltip>Υποβλήθηκε</q-tooltip>
          </q-icon>

          <q-icon v-if="props.row.state === 'approved'" name="task_alt" color="green">
            <q-tooltip>Αποδεκτή</q-tooltip>
          </q-icon>

          <q-icon v-if="props.row.state === 'waitList'" name="block" color="red">
            <q-tooltip>Λίστα Αναμονής</q-tooltip>
          </q-icon>
        </q-td>
      </template>

      <!-- Grade Candidate Button -->
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat color="secondary" icon="history_edu" @click="GradeCandidateFormRef.open(props.row)" />
        </q-td>
      </template>

    </q-table>
  </q-page>

  <AcceptCandidates ref="AcceptCandidatesRef" :cfsId="selectedCfs" @acceptAction="acceptAction" />
  <GradeCandidateForm ref="GradeCandidateFormRef" :gradeFields="gradeFields" />
  <ShowPdfFiles ref="ShowPdfFilesRef" />
  <ShowReference ref="ShowReferenceRef" />
</template>

<script>
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

// hooks
import useFetchCFS from 'src/hooks/Cfs/useFetchCFS'
import useCandidateMutations from 'src/hooks/Candidate/useCandidateActions'
import { formatDate } from 'src/hooks/commonFunctions'

// stores
import { storeToRefs } from 'pinia'
import candidatesStore from 'src/store/candidates/candidateStore'

// components
import AcceptCandidates from 'src/components/AcceptCandidates.vue'
import GradeCandidateForm from 'src/components/GradeCandidate.vue'
import ShowPdfFiles from 'src/components/content/ShowPdfFiles.vue'
import ShowReference from 'src/components/ShowReference.vue'

export default defineComponent({
  name: 'Candidates',
  components: {
    AcceptCandidates,
    GradeCandidateForm,
    ShowPdfFiles,
    ShowReference
  },
  setup () {
    const route = useRoute()

    const store = candidatesStore()
    const { getCandidates } = storeToRefs(store)

    const { fetchCFSbyCourse, result } = useFetchCFS()

    onMounted(() => {
      store.clearState()
      fetchCFSbyCourse(route.params.slug)
    })

    const filter = ref('')

    const columns = [
      { name: 'surname', align: 'left', label: 'Επιθετο', field: 'surname', sortable: true },
      { name: 'name', align: 'center', label: 'Όνομα', field: 'name', sortable: true },
      { name: 'age', align: 'center', label: 'Ηλικία', field: 'age', sortable: true },
      { name: 'email', align: 'center', label: 'email', field: 'email', sortable: true },
      { name: 'bachelor_degree', align: 'center', label: 'Προπτυχιακός Τίτλος', field: 'bachelor_degree', sortable: true },
      { name: 'attachments', align: 'center', label: 'Documents', sortable: false },
      { name: 'totalGrade', align: 'center', label: 'Συνολική Βαθμολογία', field: 'totalGrade', sortable: true },
      { name: 'state', align: 'center', field: 'state', sortable: true },
      { name: 'actions', align: 'center', label: 'Αξιολόγηση', sortable: true }
    ]

    const cfs = computed(() => result.value.map(cfs => {
      return {
        label: formatDate(cfs.openFrom) + ' - ' + formatDate(cfs.closeAt),
        value: cfs.id
      }
    }))

    // handle cfs change
    const selectedCfs = ref('')
    const gradeFields = computed(() => {
      const cfs = result.value.find(c => c.id === selectedCfs.value)
      return cfs ? cfs.courseProgram.gradeFields : []
    })

    watch(selectedCfs, () => {
      if (selectedCfs.value !== '') store.fetchCandidates(selectedCfs.value)
    })

    const selectedIsClosed = computed(() => {
      const cfs = result.value.find(cfs => cfs.id === selectedCfs.value)

      return cfs && cfs.state === 'closed'
    })

    // send acceptance emails
    const { useAcceptCandidates, acceptLoading } = useCandidateMutations()

    const acceptAction = (data) => {
      useAcceptCandidates(data)
        .then(() => store.fetchCandidates(selectedCfs.value))
    }

    // refs
    const AcceptCandidatesRef = ref()
    const GradeCandidateFormRef = ref()
    const ShowPdfFilesRef = ref()
    const ShowReferenceRef = ref()

    return {
      cfs,
      result,
      columns,
      filter,

      selectedCfs,
      candidates: getCandidates,
      gradeFields,
      selectedIsClosed,
      acceptLoading,
      acceptAction,

      AcceptCandidatesRef,
      GradeCandidateFormRef,
      ShowPdfFilesRef,
      ShowReferenceRef
    }
  }
})
</script>
<style>

</style>
