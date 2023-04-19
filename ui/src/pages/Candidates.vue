<template>
  <q-page padding>
    <div class="row justify-between q-mb-lg">
      <span class="text-h4"> Υποψήφιοι </span>
      <div>
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
          <!-- <q-btn flat color="secondary" icon="attach_file" @click="ShowPdfFilesRef.open(props.row.attachedDocuments[0])" /> -->
          <q-btn flat color="secondary" icon="attach_file">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup v-for="item in props.row.attachedDocuments" :key="item.name">
                  <q-item-section @click="ShowPdfFilesRef.open(item)">{{ item.type }}</q-item-section>
                </q-item>
                <q-separator spaced />
                <q-item clickable v-close-popup v-for="(item, index) in props.row.references" :key="item">
                  <q-item-section @click="ShowPdfFilesRef.open(item)">Refence #{{ index + 1 }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
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

  <GradeCandidateForm ref="GradeCandidateFormRef" :gradeFields="gradeFields" />
  <ShowPdfFiles ref="ShowPdfFilesRef" />
</template>
<script>
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

// hooks
import useFetchCFS from 'src/hooks/Cfs/useFetchCFS'
import fetchAllCandidates from 'src/hooks/Candidate/fetchCandidates'
import { formatDate } from 'src/hooks/commonFunctions'

// components
import GradeCandidateForm from 'src/components/GradeCandidate.vue'
import ShowPdfFiles from 'src/components/content/ShowPdfFiles.vue'

export default defineComponent({
  name: 'Candidates',
  components: {
    GradeCandidateForm,
    ShowPdfFiles
  },
  setup () {
    const route = useRoute()

    const { fetchCFSbyCourse, result } = useFetchCFS()
    const { fetch: fetchCandidates, result: candidates } = fetchAllCandidates()

    onMounted(() => {
      fetchCFSbyCourse(route.params.slug)
    })

    const filter = ref('')

    const columns = [
      { name: 'surname', align: 'left', label: 'Surname', field: 'surname', sortable: true },
      { name: 'name', align: 'center', label: 'name', field: 'name', sortable: true },
      { name: 'age', align: 'center', label: 'age', field: 'age', sortable: true },
      { name: 'email', align: 'center', label: 'email', field: 'email', sortable: true },
      { name: 'bachelor_degree', align: 'center', label: 'bachelor_degree', field: 'bachelor_degree', sortable: true },
      { name: 'attachments', align: 'center', label: 'Documents', sortable: false },
      { name: 'totalGrade', align: 'center', label: 'Total Grade', field: 'totalGrade', sortable: true },
      { name: 'actions', align: 'center', label: 'Grade', sortable: true }
    ]

    const cfs = computed(() => result.value.map(cfs => {
      return {
        label: formatDate(cfs.openFrom) + ' - ' + formatDate(cfs.closeAt),
        value: cfs.id
      }
    }))

    const selectedCfs = ref('')
    const gradeFields = computed(() => {
      const cfs = result.value.find(c => c.id === selectedCfs.value)
      return cfs ? cfs.courseProgram.gradeFields : []
    })

    watch(selectedCfs, () => {
      if (selectedCfs.value !== '') fetchCandidates(selectedCfs.value)
    })

    const GradeCandidateFormRef = ref()
    const ShowPdfFilesRef = ref()

    return {
      cfs,
      result,
      columns,
      filter,
      selectedCfs,
      candidates,
      gradeFields,
      fetchCandidates,
      GradeCandidateFormRef,
      ShowPdfFilesRef
    }
  }
})
</script>
<style>

</style>
