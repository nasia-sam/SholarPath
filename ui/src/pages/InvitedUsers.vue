<template>
  <q-page padding>
    <div class="row justify-end q-gutter-lg q-pb-md" >
        <q-input
          square
          type="email"
          label="Προσκαλέστε Χρήστη (email)"
          :rules="[isRequired, isValidEmail]"
          style="width: 420px"
        />

      <q-btn flat dense color="purple" @click="simulateProgress(2)">
        Button
        <!-- <template v-slot:loading>
          <q-spinner-radio />
        </template> -->
      </q-btn>
    </div>
    <q-table
      :rows="users"
      :columns="columns"
      row-key="id"
    />
  </q-page>
</template>
<script>
import { defineComponent, onMounted } from 'vue'

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
    const { fetchInvitedUsers, result: users } = useUserInvitations()

    onMounted(async () => {
      await fetchInvitedUsers()
    })

    return {
      columns,
      users,
      isRequired,
      isValidEmail
    }
  }
})
</script>
<style>

</style>
