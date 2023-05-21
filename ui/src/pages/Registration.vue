<template>
  <q-page padding>
    <div v-if="!loading && invitation.state === 'ACCEPTED'">
      <div class=" fullscreen text-h4 text-grey-10  text-center q-pa-md flex flex-center">
        <div class="q-gutter-y-lg">
          <div>
            Η Εγγραφη έχει ολοκληρωθεί.
          </div>
          <div>
            <q-btn square color="primary">Αρχική</q-btn>
          </div>
      </div>
      </div>
    </div>
    <div  v-if="invitation.state === 'SEND'">
      <div class="col q-pb-lg">
        <span class="text-h4"> Εγγραφή </span>
      </div>
      <div class="col text-grey-9 q-gutter-md " v-if="invitation">
        <div class="text-body2">Πρόσκληση από:  {{ invitation.invited_by?.name }}</div>
        <div class="text-body2">Email Εγγραφής:  {{ invitation?.email }}</div>
      </div>
    <q-page-container>

      <div class="q-pa-md text-grey-8 q-gutter-lg">
        <q-form
          @submit="onSubmit"
          ref="myForm"
        >
          <span class="text-grey-9 text-subtitle1">Ονοματεπώνυμο</span>
          <q-input
            filled
            square
            v-model="user.name"
            class="q-pb-lg"
            :rules="[isRequired]"
          />

          <span class="text-grey-9 text-subtitle1">Κωδικός Πρόσβασης</span>
          <q-input
            filled
            square
            :type="hidePwd ? 'password' : 'text'"
            v-model="user.password"
            class="q-pb-lg"
            :rules="[isRequired, isMoreOrEqualThan(6)]"
          >
            <template v-slot:append>
              <q-icon
                :name="hidePwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="hidePwd = !hidePwd"
              />
            </template>
          </q-input>
          <q-btn label="Submit" type="submit" color="primary"/>
          </q-form>
        </div>
      </q-page-container>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import useRegistrationActions from 'src/hooks/Authentication/registration'
import { isRequired, isMoreOrEqualThan } from 'src/hooks/rules'

export default defineComponent({
  name: 'RegistrationPage',
  setup () {
    const route = useRoute()
    const router = useRouter()

    const token = ref('')

    const { fetchInvitation, loading, invitation, registerUser } = useRegistrationActions()

    const user = ref({
      name: '',
      invitation: '',
      password: ''
    })
    const hidePwd = ref(true)

    onMounted(async () => {
      token.value = route.params.token
      await fetchInvitation(token.value)
      user.value.invitation = token.value
    })

    const redirectToCoursePrograms = () => {
      router.push('/courses')
    }

    const onSubmit = async () => {
      await registerUser(user.value)
      redirectToCoursePrograms()
    }

    return {
      loading,
      invitation,
      user,
      hidePwd,
      onSubmit,
      isRequired,
      isMoreOrEqualThan
    }
  }
})
</script>
<style>

</style>
