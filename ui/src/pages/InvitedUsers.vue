<template>
  <q-page padding>
    <div class="row justify-end q-gutter-lg q-pb-md" >
        <q-input
          square
          type="email"
          label="Προσκαλέστε Χρήστη (email)"
          v-model="email"
          :rules="[isValidEmail]"
          style="width: 420px"
        />

        <q-btn flat dense color="purple" @click="submit">
          Πρόσκληση
          <template v-slot:loading>
            <q-spinner-radio />
          </template>
        </q-btn>
    </div>
    <div class="q-pb-lg">
      <span class="text-grey-9 text-subtitle1">Προσκλήσεις</span>
      <q-list bordered separator class="bg-white">
        <q-item v-for="item in pendingInvitations" :key="item.email">
          <q-item-section>{{ item.email }}</q-item-section>
        </q-item>
      </q-list>
    </div>
    <span class="text-grey-9 text-subtitle1">Προσκεκλημένοι Χρήστες</span>
    <q-table
      :rows="users"
      :columns="columns"
      row-key="id"
    />
  </q-page>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue'

import useUserInvitations from 'src/hooks/User/invitations'
import { isRequired, isValidEmail } from 'src/hooks/rules'

export default defineComponent({
  name: 'InvitedUsers',
  setup () {
    const columns = [
      { name: 'name', align: 'center', label: 'Name', field: 'name', sortable: true },
      { name: 'email', align: 'center', label: 'email', field: 'email', sortable: true },
      { name: 'email', align: 'center', label: 'email', field: 'email', sortable: true },
      { name: 'roles', align: 'center', label: 'roles', field: 'roles', sortable: true }
    ]
    const { fetchInvitedUsers, result: users, inviteUser, fetchPendingInvitations, loading, pendingInvitations } = useUserInvitations()

    onMounted(async () => {
      await fetchInvitedUsers()
      await fetchPendingInvitations()
    })

    const email = ref('')

    const submit = () => {
      if (email.value.length === 0) return

      inviteUser(email.value).then(() => fetchPendingInvitations())
    }

    return {
      columns,
      users,
      email,
      loading,
      pendingInvitations,
      isRequired,
      isValidEmail,
      submit
    }
  }
})
</script>
<style>

</style>
