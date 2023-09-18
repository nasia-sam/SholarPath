<template>
  <q-page padding>
    <div class="q-px-md">
      <p class="text-h5">Συστατική Επιστολή</p>
      <p class="text-body2 text-grey-9">Όνομα Υποψηφίου: {{ reference.candidate.surname }}  {{ reference.candidate.name }}</p>

      <span class="text-grey-9 text-subtitle1">Ονοματεπώνυμο</span>
      <q-input
        square
        outlined
        v-model="reference.name"
        class="q-pb-lg"
        :rules="[isRequired]"
      />

      <q-input
        v-model="reference.email"
        square
        outlined
        type="email"
        :rules="[isRequired, isValidEmail]"
        disable
        label="Email"
      />

      <span class="text-grey-9 text-subtitle1">Παρακαλούμε συμπληρώστε την συστατική επιστολή.</span>
      <q-editor v-model="reference.letter" min-height="5rem" />

      <q-btn
        label="Submit"
        class="q-mt-md"
        @click="submit"
      />

    </div>
  </q-page>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// common
import { isRequired, isValidEmail } from 'src/hooks/rules'

// hooks
import useReferences from 'src/hooks/Candidate/useReferences'

export default defineComponent({
  name: 'ReferenceCreate',
  setup () {
    const route = useRoute()
    const router = useRouter()

    const token = ref('')

    const newRef = ref({
      token: '',
      title: '',
      name: '',
      email: '',
      letter: ''
    })

    const { getReference, reference, useWriteReference } = useReferences()

    onMounted(() => {
      token.value = route.params.token

      getReference(route.params.token).then(() => {
        console.log('after get reference', reference.value)
        if (reference.value.submittedAt !== null) {
          router.push({ name: 'referenceInfo', query: { q: 'done ' } })
        } else if (new Date() > reference.expiresAt) {
          router.push({ name: 'referenceInfo', query: { q: 'exp ' } })
        }
      })
    })

    const submit = () => {
      useWriteReference({
        name: reference.value.name,
        title: reference.value.title,
        letter: reference.value.letter,
        candidateId: reference.value.candidate.id
      },
      token.value).then((res) => {
        if (res) {
          router.push({ name: 'referenceInfo', query: { q: 'success ' } })
        }
      })
    }

    return {
      newRef,
      isRequired,
      isValidEmail,

      reference,
      submit
    }
  }
})
</script>
<style>

</style>
