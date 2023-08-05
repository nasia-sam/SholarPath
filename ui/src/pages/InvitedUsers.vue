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
    >
      <!-- is admin -->
      <template #body-cell-isAdmin="props">
        <q-td :props="props">
          <q-icon
            v-if="props.row.is_admin"
            name="verified_user"
            size="2em"
            color="blue"
          >
            <q-tooltip>Administrator</q-tooltip>
          </q-icon>

          <q-btn
            v-else
            round
            icon="person_add"
            color="primary"
            size="sm"
            @click="confirmAddAdmin(props.row.id)"
          >
            <q-tooltip>Δώστε δικαιώματα Administrator</q-tooltip>
          </q-btn>

        </q-td>
      </template>

      <!-- Add Roles To Users -->
      <template #body-cell-roles="props">
        <q-td :props="props">
          <div>
            <q-btn
              round
              color="primary"
              size="sm"
              :loading="loading"
              @click="AddRolesToUsersRef.open(props.row)"
            >
              {{ props.row.roles.length }}
            </q-btn>
          </div>
        </q-td>
      </template>
    </q-table>
  </q-page>

  <AddRolesToUsers ref="AddRolesToUsersRef" :coursePrograms="courses" />
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'

// hooks
import useUserInvitations from 'src/hooks/User/invitations'
import fetchAllProgramCourses from 'src/hooks/CoursePrograms/fetchCoursePrograms'
import { isRequired, isValidEmail } from 'src/hooks/rules'

// components
import AddRolesToUsers from 'src/components/AddRolesToUsers.vue'

export default defineComponent({
  name: 'InvitedUsers',
  components: {
    AddRolesToUsers
  },
  setup () {
    const $q = useQuasar()

    const columns = [
      { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
      { name: 'email', align: 'center', label: 'email', field: 'email', sortable: true },
      { name: 'isAdmin', align: 'center', label: 'Ρόλος', field: 'is_admin', sortable: true },
      { name: 'roles', align: 'right', label: 'roles', field: 'roles', sortable: true }
    ]
    const {
      fetchInvitedUsers,
      result: users, inviteUser,
      fetchPendingInvitations,
      loading,
      pendingInvitations,
      useAddAdminRole
    } = useUserInvitations()
    const { fetchAdminCourses } = fetchAllProgramCourses()

    onMounted(async () => {
      await fetchInvitedUsers()
      await fetchPendingInvitations()

      courses.value = await fetchAdminCourses()
    })

    const courses = ref([])
    const email = ref('')

    const submit = () => {
      if (email.value.length === 0) return

      inviteUser(email.value).then(() => fetchPendingInvitations())
    }

    const confirmAddAdmin = (id) => {
      $q.dialog({
        title: 'Προσθήκη Ρόλου Administrator',
        message: 'Είστε σίγουροι;<br /><br /> Ο χρήστης θα έχει δικαίωμα να διαχειρίζεται Προγράμματα Σπουδών και νέους Χρήστες.<br /><br /> Δεν θα μπορέσετε να πάρετε πίσω το δικαίωμα.',
        cancel: true,
        persistent: true,
        html: true
      }).onOk(() => {
        useAddAdminRole(id)
          .then(() => fetchInvitedUsers())
      })
    }

    // refs
    const AddRolesToUsersRef = ref()

    return {
      columns,
      users,
      email,
      loading,
      pendingInvitations,
      courses,
      AddRolesToUsersRef,

      isRequired,
      isValidEmail,
      submit,
      confirmAddAdmin
    }
  }
})
</script>
<style>

</style>
