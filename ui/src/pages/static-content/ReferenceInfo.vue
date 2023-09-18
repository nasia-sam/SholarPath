<template>

  <StaticPage>
    <template #title>
     {{ msg[state.trim()]?.title }}
    </template>

    <template #description>
      {{ msg[state.trim()]?.description }}
    </template>
  </StaticPage>

</template>
<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

// components
import StaticPage from 'src/components/content/StaticPage'

export default defineComponent({
  name: 'RefenceInfo',
  props: {
    message: {
      type: String,
      required: false
    }
  },
  components: {
    StaticPage
  },
  setup () {
    const msg = {
      success: {
        title: 'Επιτυχής Υποβολή Αίτησης',
        description: 'Ευχαριστούμε για τον χρόνο σας.'
      },
      done: {
        title: 'Επιτυχής Υποβολή Αίτησης',
        description: 'Ευχαριστούμε για τον χρόνο σας.'
      },
      exp: {
        title: 'Δεν υπάρχει Ενεργή Συστατική Επιστολή',
        description: 'Ο σύνδεσμος που χρησιμοποιείτε είναι λάθος ή έχει λήξει.'
      }
    }

    const route = useRoute()
    const state = ref('')
    onMounted(() => {
      const { query } = route

      state.value = query.q ? query.q : 'exp'
    })

    return {
      msg,
      state
    }
  }
})
</script>
<style>

</style>
