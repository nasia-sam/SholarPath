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
          map-option
          option-value="value"
          option-label="label"
          style="width: 250px"
        />
      </div>
    </div>

    <q-table
      :rows="candidates"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat color="secondary" icon="more_vert">
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup @click="GradeCandidateFormRef.open(props.row)">
              <q-item-section> Grade </q-item-section>
            </q-item>
            <!-- <q-item clickable v-close-popup>
              <q-item-section>New incognito tab</q-item-section>
            </q-item> -->
            <q-separator />
          </q-list>
        </q-menu>
      </q-btn>

        </q-td>
      </template>
    </q-table>
  </q-page>

  <GradeCandidateForm ref="GradeCandidateFormRef" :gradeFields="gradeFields" />
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

export default defineComponent({
  name: 'Candidates',
  components: {
    GradeCandidateForm
  },
  setup () {
    const route = useRoute()

    const { fetchCFSbyCourse, result } = useFetchCFS()
    const { fetch: fetchCandidates, result: candidates } = fetchAllCandidates()

    onMounted(() => {
      fetchCFSbyCourse(route.params.slug)
    })

    const columns = [
      { name: 'surname', align: 'left', label: 'Surname', field: 'surname', sortable: true },
      { name: 'name', align: 'center', label: 'name', field: 'name', sortable: true },
      { name: 'age', align: 'center', label: 'age', field: 'age', sortable: true },
      { name: 'email', align: 'center', label: 'email', field: 'email', sortable: true },
      { name: 'bachelor_degree', align: 'center', label: 'bachelor_degree', field: 'bachelor_degree', sortable: true },
      { name: 'actions', align: 'center', label: 'Actions', sortable: true }
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

    return {
      cfs,
      result,
      columns,
      selectedCfs,
      candidates,
      gradeFields,
      fetchCandidates,
      GradeCandidateFormRef
    }
  }
})
</script>
<style>

</style>
