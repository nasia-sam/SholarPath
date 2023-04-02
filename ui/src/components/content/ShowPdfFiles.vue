<template>
  <q-dialog v-model="visible">
    <q-card>
      <q-card-section>
        <embed
          id="pdfID"
          type="application/pdf"
          width="520px"
          height="830px"
          :src="'http://127.0.0.1:9999/uploads/' + file.path + '.pdf'"
        />
        <!-- <iframe src="C:\myapplications\pms\pms-applications\backend\src\uploads\03e5a12a-7dda-4d9d-a120-e699a1a2e610\DEGREE_03e5a12a-7dda-4d9d-a120-e699a1a2e610.pdf" width="100%" height="500px"></iframe> -->

      </q-card-section>
    </q-card>
  </q-dialog>>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ShowPdfFiles',
  setup () {
    const visible = ref(false)
    const file = ref()

    const open = (payload) => {
      console.log('$$', payload)
      file.value = payload
      visible.value = true
    }

    const baseUrl = process.env.baseUrl

    return {
      visible,
      baseUrl,
      file,
      open
    }
  }
})
</script>
<style>

</style>
