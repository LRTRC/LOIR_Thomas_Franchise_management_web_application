<template>
  <div>
    <v-row justify="center">
      <v-col>
        <v-progress-circular
          v-if="franchisees.length === 0"
          color="primary"
          indeterminate
          size="120"
          width="5"
        />
        <v-card v-if="franchisees.length > 0" class="card-neumorphism pa-4 ma-4">
          <v-row>
            <v-col>
              <v-card-title id="title" class="pb-0">
                <v-icon class="px-4" color="primary">
                  {{ icons[3] }}
                </v-icon>
                Liste des franchisés
              </v-card-title>
            </v-col>
          </v-row>
          <v-row justify="center" class="text-center ma-4">
            <v-col id="btnCreateColumn" cols="12" sm="6" md="4" class="d-flex">
              <v-btn
                id="btnCreateFranchisee"
                class="align-self-end"
                elevation="4"
                color="primary"
                rounded
                dark
                @click.native="updateDialog({value: true, type: 'create'})"
              >
                Ajouter un franchisé
              </v-btn>
            </v-col>
            <v-spacer/>
            <v-col cols="12" sm="6" md="4" class="d-flex">
              <v-text-field
                id="franchiseesSearchBar"
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
            id="franchiseesDataTable"
            class="pa-4"
            :headers="headers"
            :items="franchisees"
            :items-per-page="franchisees.length"
            :search="search"
            item-key="id"
            loading-text="Chargement des données"
            no-data-text="Aucune donnée"
            no-results-text="Aucun résultat"
            hide-default-footer
            dense
            multi-sort

          >
            <template v-slot:item.isactive="{ item }">
              <v-switch
                id="franchiseeIsActiveBtn"
                v-model="item.isactive"
                @change="patchFranchiseeIsActive(item, $event)"
                color="success"
                dense
              />
            </template>
            <template v-slot:item.structures="{ item }">
              <v-chip
                v-for="(structure, i) in findFranchiseeStructures(item, structures)"
                :key="i"
                class="px-2 ma-1"
                color="success"
                text-color="white"
              >
                {{ structure.name }}
              </v-chip>
            </template>
            <template v-slot:item.users="{ item }">
              <v-chip
                v-for="(franchisee_user, i) in findFranchiseeUsers(item, franchisees_users)"
                :key="i"
                class="px-2 ma-1"
                color="success"
                text-color="white"
              >
                {{ findUser(franchisee_user, users) }}
              </v-chip>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-btn
                id="btnEditItem"
                icon
                @click.native="setFranchiseeAndDialog(item, 'patch')"
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
                @click.native="setFranchiseeAndDialog(item, 'delete')"
                color="error"
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
      transition="dialog-bottom-transition"
      scrollable
    >
      <handle_franchisee
        v-if="dialogType === 'patch' || dialogType === 'create' && dialog"
        id="handleFranchisee"
      />
      <delete-franchisee
        v-if="(dialogType === 'delete') && dialog"
        id="deleteFranchisee"
      />
    </v-dialog>
  </div>
</template>

<script>
import Handle_franchisee from "../components/franchisees/handle_franchisee";
import DeleteFranchisee from "../components/franchisees/delete_franchisee";
import {mdiDelete, mdiMagnify, mdiPencil, mdiPlaylistCheck} from '@mdi/js';
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'IndexPage',
  components: {DeleteFranchisee, Handle_franchisee},
  middleware: ['admin'],
  data() {
    return {
      // search bar value (used with #franchiseesSearchBar v-model)
      search: '',
      // bunch of icons
      icons: [mdiMagnify, mdiPencil, mdiDelete, mdiPlaylistCheck],
      // headers for the v-data table
      headers: [
        {text: 'Nom', value: 'name', align: 'start'},
        {text: 'Adresse', value: 'address', align: 'start'},
        {text: 'Téléphone', value: 'phone', align: 'start'},
        {text: "Actif", value: "isactive", align: 'start'},
        {text: "Structures", value: 'structures', align: 'start'},
        {text: "Membres", value: "users", align: 'start'},
        {text: "Modifier / supprimer", value: "actions", sortable: false, align: 'center'},
      ],
    }
  },
  mounted() {
    // get all needed data from API
  this.fetchData();
  },
  computed: {
    // stores getters
    ...mapGetters({
      // all franchisees
      franchisees: 'franchisees/franchisees',
      // all structures
      structures: 'structures/structures',
      // all structures
      franchisees_users: 'franchisees_users/franchisees_users',
      // all structures
      users: 'users/users',
      // sets modal value (used with #dialog v-model)
      dialog: 'franchisees/dialog',
      // used to set which component to be displayed in the modal
      dialogType: 'franchisees/dialogType',
    }),
  },
  methods: {
    ...mapActions({
      // get all franchisees from the API
      getFranchisees: 'franchisees/getFranchisees',
      // get all structures from API
      getStructures: 'structures/getStructures',
      // get all franchisees_users from API
      getFranchiseesUsers: 'franchisees_users/getFranchiseesUsers',
      // get all users from API
      getUsers: 'users/getUsers',
      // mutates stores values
      updateName: 'franchisees/updateName',
      updateID: 'franchisees/updateID',
      updateAddress: 'franchisees/updateAddress',
      updatePhone: 'franchisees/updatePhone',
      updateIsActive: 'franchisees/updateIsActive',
      updateSelectedModules: 'franchisees/updateSelectedModules',
      updateDialog: 'franchisees/updateDialog',
      // used to call error / success alerts from errors store
      alertError: 'errors/error',
      alertSuccess: 'errors/success'
    }),

    // send patch request to API
    async patchFranchiseeIsActive(franchisee, value) {
      try {
        // set value to update
        franchisee.isactive = value
        // use axios to send request
        return await this.$axios.$patch(`api/franchisees/${franchisee.id}`, franchisee).then((response) => {
          // if response status is ok, calls success alert
          if (response.status === 200) {
            this.alertSuccess(`Franchisé '${franchisee.name}' modifié avec succès'`);
          }
          // send request to API to update franchisees data
          return this.getFranchisees();
        })
        // else catch error
      } catch (error) {
        this.alertError(error.message);
      }
    },

    // use the store' state to keep data alive when handling a franchisee (create, edit or delete)
    // todo: refact in store to set the payload in one time
    setFranchiseeAndDialog(franchisee, dialogType) {
      this.updateID(franchisee.id);
      this.updateName(franchisee.name);
      this.updateAddress(franchisee.address);
      this.updatePhone(franchisee.phone);
      this.updateIsActive(franchisee.isactive);
      // to use the select input when handling a franchisee, we need to get an array of strings with the keys that
      // have a true value in the default_modules property of the handled franchisee
      // modules is a self invoking function that returns those values in an array
      let modules = (() => {
        let array = []
        for (let [key, value] of Object.entries(franchisee.default_modules)) {
          if (value) array.push(key);
        }
        return array;
      })();
      // set the results of modules in selected modules (in store)
      this.updateSelectedModules(modules);
      // used to set which component to displays in the v-dialog
      this.updateDialog({value: true, type: dialogType});
    },

    // returns all the structures possesses by the franchisee
    findFranchiseeStructures(franchisee, structures) {
      let array = []
      structures.find(structure => {
        if (structure.id_franchise === franchisee.id) {

          array.push(structure)
        }
      });
      return array
    },

    // returns all the users bound to the franchisee
    findFranchiseeUsers(franchisee, franchisees_users) {
      let array = []
      franchisees_users.find(franchisee_user => {
        if (franchisee_user.id_franchise === franchisee.id) {

          array.push(franchisee_user)
        }
      });
      return array
    },

    // returns the user email
    findUser(franchisee_user, users) {
      if (users.length > 0 ) {
        let user = users.find(el => el.id === franchisee_user.id_user)
        return user.email
      }
    },

    // get all the needed data from API
    fetchData() {
      this.getFranchisees();
      this.getStructures();
      this.getFranchiseesUsers();
      this.getUsers();
    }
  }
}
</script>

<style scoped>
#franchiseesDataTable {
  background-color: #ecf0f3 !important;
  min-height: 50vh !important;
}

#franchiseesDataTable:deep(td) {
  word-break: break-word !important;
}

#btnCreateFranchisee {
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

#title {
  font-family: 'Poppins', sans-serif !important;
}

</style>
