<template>
  <div>
    <v-row justify="center">
      <v-col>
        <v-progress-circular
          v-if="users.length === 0"
          color="primary"
          indeterminate
          size="120"
          width="5"
        />
        <v-card v-if="users.length > 0" class="card-neumorphism pa-4 ma-4">
          <v-row>
            <v-col>
              <v-card-title id="title" class="pb-0">
                <v-icon class="px-4" color="primary">
                  {{ icons[3] }}
                </v-icon>
                Liste des utilisateurs
              </v-card-title>
            </v-col>
          </v-row>
          <v-row justify="center" class="text-center ma-4">
            <v-col id="btnCreateColumn" cols="12" sm="6" md="4" class="d-flex">
              <v-btn
                id="btnCreateUser"
                class="align-self-end"
                elevation="4"
                color="primary"
                rounded
                dark
                @click.native="updateDialog({value: true, type: 'create'})"
              >
                Ajouter un utilisateur
              </v-btn>
            </v-col>
            <v-spacer/>
            <v-col cols="12" sm="6" md="4" class="d-flex">
              <v-text-field
                id="usersSearchBar"
                v-model="search"
                clearable
                :prepend-icon="icons[0]"
                label="Rechercher"
                hide-details
                color="primary"
              />
            </v-col>
          </v-row>
          <v-data-table
            id="usersDataTable"
            class="pa-4"
            :headers="headers"
            :items="users"
            :items-per-page="users.length"
            :search="search"
            item-key="id"
            loading-text="Chargement des données"
            no-data-text="Aucune donnée"
            no-results-text="Aucun résultat"
            hide-default-footer
            dense
            multi-sort

          >

            <template v-slot:item.actions="{ item }">
              <v-btn
                id="btnEditItem"
                icon
                @click.native="setUserAndDialog(item, 'patch')"
              >
                <v-icon
                  id="btnEditItemIcon"
                  small
                  class="mr-2"
                  color="primary"
                >
                  {{ icons[1] }}
                </v-icon>
              </v-btn>
              <v-btn
                id="btnDeleteItem"
                icon
                color="error"
                @click.native="setUserAndDialog(item, 'delete')"
              >
                <v-icon
                  id="btnDeleteItemIcon"
                  small
                >
                  {{ icons[2] }}
                </v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
      id="dialog"
      persistent
      v-model="dialog"
      max-width="600px"
    >
      <handle_user
        v-if="dialogType === 'patch' || dialogType === 'create' && dialog"
        id="handleUser"
      />
      <delete_user
        v-if="(dialogType === 'delete') && dialog"
        id="deleteUser"
      />

    </v-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {mdiDelete, mdiMagnify, mdiPencil, mdiPlaylistCheck} from "@mdi/js";
import Handle_user from "../components/users/handle_user";
import Delete_user from "../components/users/delete_user";

export default {
  name: "users",
  components: {Delete_user, Handle_user},
  data() {
    return {
      // search bar value (used with #usersSearchBar v-model)
      search: '',
      // bunch of icons
      icons: [mdiMagnify, mdiPencil, mdiDelete, mdiPlaylistCheck],
      // headers for the v-data table
      headers: [
        {text: 'Email', value: 'email', align: 'start'},
        {text: "Rôle", value: "role", align: 'start'},
        {text: 'Nom', value: 'last_name', align: 'start'},
        {text: 'Prénom', value: 'first_name', align: 'start'},
        {text: 'Téléphone', value: 'phone', align: 'start'},
        {text: "Franchisés", value: "franchise", align: 'start'},
        {text: "Structures", value: "structure", align: 'start'},
        {text: "Modifier / supprimer", value: "actions", sortable: false, align: 'center'},
      ],
    }
  },
  mounted() {
    this.getUsers();
  },
  computed: {
    ...mapGetters({
      // all users from API
      users: "users/users",
      // sets modal value (used with #dialog v-model)
      dialog: 'users/dialog',
      // used to set which component to be displayed in the modal
      dialogType: 'users/dialogType',
    }),
  },
  methods: {
    ...mapActions({
      getUsers: 'users/getUsers',
      updateDialog: 'users/updateDialog',
      updateUser: 'users/updateUser',
      // used to call error / success alerts from errors store
      alertError: 'errors/error',
      alertSuccess: 'errors/success'
    }),

    // use the store' state to keep data alive when handling a user (create, edit or delete)
    setUserAndDialog(user, dialogType) {
      this.updateUser(user)
      this.updateDialog({value: true, type: dialogType})
    },
  }
}

</script>

<style scoped>
#usersDataTable {
  background-color: #ecf0f3 !important;
  min-height: 50vh !important;
}

#usersDataTable:deep(td) {
  word-break: break-word !important;
}

#btnCreateUser {
  font-weight: bold;
}

@media screen and (max-width: 599px) {
  #btnCreateColumn, #title {
    justify-content: center !important;
  }
}

:deep(th) {
  font-size: 0.9em !important;
  font-weight: bold;
  vertical-align: text-top !important;
  color: #36405a !important;
}

:deep(.v-data-table__mobile-row ) {
  font-family: 'Poppins', sans-serif !important;
  justify-content: start !important;
  align-items: baseline;
}

:deep(.v-data-table__mobile-row__header) {
  font-weight: bold;
  word-break: keep-all !important;
}

:deep(.v-data-table__mobile-row__cell) {
  text-align: left !important;
}

#title {
  font-family: 'Poppins', sans-serif !important;
}
</style>
