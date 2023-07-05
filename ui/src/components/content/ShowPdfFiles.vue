<template>
  <q-dialog v-model="visible">
    <q-card style="width: 50vw">

      <q-card-section>
        <embed
          id="pdfID"
          type="application/pdf"
          width="520px"
          height="830px"
          :src="'http://127.0.0.1:9999/uploads/' + file + '.pdf'"
        />

      </q-card-section>
    </q-card>
  </q-dialog>>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ShowPdfFiles',
  setup () {
    const baseUrl = process.env.baseUrl

    const visible = ref(false)
    const file = ref()

    const open = (payload, id) => {
      file.value = id + '/' + payload.path
      visible.value = true
    }

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
