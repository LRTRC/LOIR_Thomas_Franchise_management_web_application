<template>
  <div>
    <v-row justify="center">
      <v-col>
        <v-progress-circular
          v-if="structures.length === 0"
          color="primary"
          indeterminate
          size="120"
          width="5"
        />
        <v-card v-if="structures.length > 0" class="card-neumorphism pa-4 ma-4">
          <v-row>
            <v-col>
              <v-card-title id="title" class="pb-0">
                <v-icon class="px-4" color="primary">
                  {{ icons[3] }}
                </v-icon>
                Liste des structures
              </v-card-title>
            </v-col>
          </v-row>
          <v-row justify="center" class="text-center ma-4">
            <v-col id="btnCreateColumn" cols="12" sm="6" md="4" class="d-flex">
              <v-btn
                id="btnCreateStructure"
                class="align-self-end"
                elevation="4"
                color="primary"
                rounded
                dark
                @click.native="updateDialog({value: true, type: 'create'})"
              >
                Ajouter une structure
              </v-btn>
            </v-col>
            <v-spacer/>
            <v-col cols="12" sm="6" md="4" class="d-flex">
              <v-text-field
                id="structuresSearchBar"
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
            id="structuresDataTable"
            class="pa-4"
            :headers="headers"
            :items="structures"
            :items-per-page="structures.length"
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
                color="success"
                dense
                @change="patchStructureIsActive(item, $event)"
              />
            </template>
            <template v-slot:item.id_franchise="{ item }">
              <v-chip
                class="px-2 ma-1"
                color="success"
                text-color="white"
              >
                {{ findFranchiseeName(item, franchisees) }}
              </v-chip>

            </template>
            <template v-slot:item.users="{ item }">
              <v-chip
                v-for="(structure_user, i) in findStructureUsers(item, structures_users)"
                :key="i"
                class="px-2 ma-1"
                color="success"
                text-color="white"
              >
                {{ findUser(structure_user, users) }}
              </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn
                id="btnEditItem"
                icon
                @click.native="setStructureAndDialog(item, 'patch')"
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
                @click.native="setStructureAndDialog(item, 'delete')"
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
      scrollable
    >
      <handle_structure
        v-if="dialogType === 'patch' || dialogType === 'create' && dialog"
        id="handleStructure"
      />
      <delete_structure
        v-if="(dialogType === 'delete') && dialog"
        id="deleteStructure"
      />

    </v-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {mdiDelete, mdiMagnify, mdiPencil, mdiPlaylistCheck} from "@mdi/js";
import Delete_structure from "../components/structures/delete_structure";
import Handle_structure from "../components/structures/handle_structure";

export default {
  name: "structures",
  components: {Handle_structure, Delete_structure},
  middleware: ['admin'],
  data() {
    return {
      // search bar value (used with #structuresSearchBar v-model)
      search: '',
      // bunch of icons
      icons: [mdiMagnify, mdiPencil, mdiDelete, mdiPlaylistCheck],
      // headers for the v-data table
      headers: [
        {text: 'Nom', value: 'name', align: 'start'},
        {text: 'Adresse', value: 'address', align: 'start'},
        {text: 'Téléphone', value: 'phone', align: 'start'},
        {text: "Actif", value: "isactive", align: 'start'},
        {text: "Franchisé", value: "id_franchise", align: 'start'},
        {text: "Membres", value: "users", align: 'start'},
        {text: "Modifier / supprimer", value: "actions", sortable: false, align: 'center'},
      ],
      formattedFranchisees: []
    }
  },
  mounted() {
    // get all structures and franchisees from API
   this.fetchData();
  },
  computed: {
    ...mapGetters({
      // all the needed data from stores
      franchisees: 'franchisees/franchisees',
      structures: 'structures/structures',
      users: 'users/users',
      structures_users: 'structures_users/structures_users',
      // sets modal value (used with #dialog v-model)
      dialog: 'structures/dialog',
      // used to set which component to be displayed in the modal
      dialogType: 'structures/dialogType',
    })
  },
  watch: {
    franchisees: function (newValue, oldValue) {
      this.updateFormattedFranchisees(this.formatFranchisees(newValue));
    }
  },
  methods: {
    ...mapActions({
      // all actions needed from stores
      getFranchisees: 'franchisees/getFranchisees',
      getStructures: 'structures/getStructures',
      getUsers: 'users/getUsers',
      getStructuresUsers: 'structures_users/getStructuresUsers',
      updateDialog: 'structures/updateDialog',
      updateID: 'structures/updateID',
      updateIdFranchise: 'structures/updateIdFranchise',
      updateName: 'structures/updateName',
      updateAddress: 'structures/updateAddress',
      updatePhone: 'structures/updatePhone',
      updateIsActive: 'structures/updateIsActive',
      updateAdvertising: 'structures/updateAdvertising',
      updateEquipments: 'structures/updateEquipments',
      updateGroupLessons: 'structures/updateGroupLessons',
      updatePlannings: 'structures/updatePlannings',
      updatePrivateCoaching: 'structures/updatePrivateCoaching',
      updateSnacks: 'structures/updateSnacks',
      updateSubscriptions: 'structures/updateSubscriptions',
      updateWorkforce: 'structures/updateWorkforce',
      updateFormattedFranchisees: 'structures/updateFormattedFranchisees',
      // used to call error / success alerts from errors store
      alertError: 'errors/error',
      alertSuccess: 'errors/success'
    }),

    // send patch request to API
    async patchStructureIsActive(structure, value) {
      try {
        // set value to update
        structure.isactive = value
        // use axios to send request
        return await this.$axios.$patch(`api/structures/${structure.id}`, structure).then((response) => {
          // if response status is ok, calls success alert
          if (response.status === 200) {
            this.alertSuccess(`Structure '${structure.name}' modifiée avec succès'`);
          }
          // send request to API to update franchisees data
          return this.getStructures();
        })
        // else catch error
      } catch (error) {
        this.alertError(error.message);
      }
    },


    // find a franchisee name with its id to return its name in
    // the header "franchisé" of the v-data-table
    findFranchiseeName(structure, franchisees) {
      if (franchisees.length > 0) {
        let franchisee = franchisees.find(el => el.id === structure.id_franchise)
        if (franchisee) return `${franchisee.name} (${franchisee.id})`;
      }
    },
    formatFranchisees(franchisees) {
      return franchisees.map((el) => {
        return {
          text: `${el.name} (${el.id})`,
          value: el.id,
          default_modules: el.default_modules,
        };
      })
    },

    // use the store' state to keep data alive when handling a structure (create, edit or delete)
    // todo: refact in store to set the payload in one time
    setStructureAndDialog(structure, dialogType) {
      this.updateID(structure.id);
      this.updateIdFranchise(structure.id_franchise);
      this.updateName(structure.name);
      this.updateAddress(structure.address);
      this.updatePhone(structure.phone);
      this.updateIsActive(structure.isactive);
      this.updateAdvertising(structure.advertising);
      this.updateEquipments(structure.equipments);
      this.updateGroupLessons(structure.group_lessons);
      this.updatePlannings(structure.plannings);
      this.updatePrivateCoaching(structure.private_coaching);
      this.updateSnacks(structure.snacks);
      this.updateSubscriptions(structure.subscriptions);
      this.updateWorkforce(structure.workforce);

      // used to set which component to displays in the v-dialog
      this.updateDialog({value: true, type: dialogType});
    },

    // get all data needed from API
    fetchData() {
      this.getFranchisees();
      this.getStructures();
      this.getUsers();
      this.getStructuresUsers();
    },

    // returns all the users bound to the structure
    findStructureUsers(structure, structures_users) {
      let array = []
      structures_users.find(franchisee_user => {
        if (franchisee_user.id_structure === structure.id) {

          array.push(franchisee_user)
        }
      });
      return array
    },

    // returns the user email
    findUser(structure_user, users) {
      if (users.length > 0 ) {
        let user = users.find(el => el.id === structure_user.id_user)
        return user.email
      }
    },
  }
}

</script>

<style scoped>
#structuresDataTable {
  background-color: #ecf0f3 !important;
  min-height: 50vh !important;
}

#structuresDataTable:deep(td) {
  word-break: break-word !important;
}

#btnCreateStructure {
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
