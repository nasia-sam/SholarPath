<template>
  <q-dialog v-model="visible">
    <q-layout view="Lhh lpR fff" container class="bg-white q-pa-md" style="height: 550px">
      <q-header>
        <q-toolbar>
          <q-toolbar-title>Call For Submissions</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-footer class="text-white">
        <q-toolbar class="row justify-end">
          <q-btn flat label="Cancel" @click="cancel"/>
          <q-btn flat label="Save" @click="submit"/>
        </q-toolbar>
      </q-footer>

      <q-page-container>
        <div class="q-pa-md text-grey-8 q-gutter-lg">
          <p class="text-subtitle1">Διαλέξτε νέα ημερομηνία λήξης προθεσμίας</p>
          <p class="text-subtitle2">Μόλις γίνει επέκταση της προθεσμίας, δεν θα είναι δυνατό να την αλλάξετε και να τη μεταφέρετε σε μια ακόμα πιο σύντομη ημερομηνία.</p>
          <q-date v-model="newCloseAt" :options="validDates" />
        </div>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'

// hooks
import usesCfsAction from 'src/hooks/Cfs/useCfsMutations'
import { formatDate } from 'src/hooks/commonFunctions'

export default defineComponent({
  name: 'ExtendCFSDialog',
  setup () {
    const visible = ref(false)

    // cfs values
    const id = ref('')
    const prevCloseAt = ref()
    const newCloseAt = ref()

    const validDates = (date) => {
      return date >= prevCloseAt.value
    }

    // methods
    const { useExtendCfs } = usesCfsAction()
    const open = (cfs) => {
      prevCloseAt.value = formatDate(cfs.closeAt, 'y/MM/dd')
      id.value = cfs.id

      visible.value = true
    }

    const submit = async () => {
      await useExtendCfs(id.value, newCloseAt.value)
      visible.value = false
    }

    const cancel = () => {
      visible.value = false
    }

    return {
      visible,
      validDates,
      open,
      cancel,
      submit,
      newCloseAt,
      prevCloseAt
    }
  }
})
</script>
