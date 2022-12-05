<template>
  <q-page padding>
    <div class="row justify-between q-mb-lg">
      <span class="text-h4"> Υποψήφιοι </span>
      <div>
        <q-select square outlined v-model="selectedCfs" :options="cfs" label="Standard" emit-value option-value="id" style="width: 250px" />
      </div>
    </div>
  </q-page>
</template>
<script>
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

// hooks
import useFetchCFS from 'src/hooks/Cfs/useFetchCFS'
import { formatDate } from 'src/hooks/commonFunctions'

export default defineComponent({
  name: 'Candidates',
  setup () {
    const route = useRoute()

    const { fetchCFSbyCourse, result } = useFetchCFS()

    onMounted(() => {
      fetchCFSbyCourse(route.params.slug)
    })

    const cfs = computed(() => result.value.map(cfs => {
      console.log('@@@@')
      return {
        label: formatDate(cfs.openFrom) + ' - ' + formatDate(cfs.closeAt),
        value: cfs.id
      }
    }))

    const selectedCfs = ref('')

    return {
      cfs,
      result,
      selectedCfs
    }
  }
})
</script>
<style>

</style>
