<template>

      <StaticPage>
        <template #title>
          Επιτυχής Υποβολή Αίτησης!
        </template>

        <template #description>
          Θα ενημερωθείτε για τα αποτελέσματα της υποψηφιότητάς σας με σχετικό email.
        </template>
      </StaticPage>

</template>
<script>
import { defineComponent } from 'vue'

// components
import StaticPage from 'src/components/content/StaticPage'

export default defineComponent({
  name: 'SuccessfullSubmission',
  components: {
    StaticPage
  }
})
</script>
<style>

</style>
