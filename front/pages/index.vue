<template>
  <div>
    <v-row justify="center">
      <v-col>
        <v-card class="card-neumorphism pa-4 ma-4">
          <v-skeleton-loader
            id="franchiseesLoader"
            class="pa-4"
            v-if="franchiseesWithoutNullables.length === 0"
            type=" table-heading, table-row-divider, table-row-divider, table-row-divider"
          />
          <div v-if="franchiseesWithoutNullables.length > 0">
            <v-row justify="center" class="text-center ma-4">
              <v-col cols="12" sm="6" md="4" class="d-flex">
                <v-text-field
                  id="franchiseesSearchBar"
                  v-model="search"
                  clearable
                  :prepend-icon="icons[0]"
                  label="Rechercher"
                  hide-details
                />
              </v-col>
              <v-spacer/>
              <v-btn
                id="btnCreateFranchisee"
                elevation="4"
                color="success"
                rounded
                dark
                @click.native="updateDialog({value: true, type: 'handle'})"
              >
                Ajouter un franchisé
              </v-btn>
            </v-row>
            <v-data-table
              id="franchiseesDataTable"
              class="pa-4"
              :headers="headers"
              :items="franchiseesWithoutNullables"
              :items-per-page="franchiseesWithoutNullables.length"
              :search="search"
              item-key="id"
              loading-text="Chargement des données"
              no-data-text="Aucune donnée"
              no-results-text="Aucun résultat"
              hide-default-footer
            >
              <template v-slot:item.isactive="{ item }">
                <v-switch
                  id="franchiseeIsActiveBtn"
                  v-model="item.isactive"
                  @change="patchFranchisee(item, $event)"
                 />
              </template>
              <template v-slot:item.actions="{ item }" >
                <v-btn
                  id="btnEditItem"
                  icon
                  @click.native="setFranchiseeAndDialog(item, 'update')"
                >
                  <v-icon
                    id="btnEditItemIcon"
                    small
                    class="mr-2"
                  >
                    {{ icons[1] }}
                  </v-icon>
                </v-btn>
                <v-btn
                  id="btnDeleteItem"
                  icon
                  @click.native="setFranchiseeAndDialog(item, 'delete')"
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
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
      id="dialog"

      v-model="dialog"
      max-width="50%"
    >
      <handle_franchisee
        v-if="dialogType === 'handle' && dialog"
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
import {mdiDelete, mdiMagnify, mdiPencil} from '@mdi/js';
import Handle_franchisee from "../components/franchisees/handle_franchisee";
import {mapActions, mapGetters} from 'vuex'
import DeleteFranchisee from "../components/franchisees/delete_franchisee";

export default {
  name: 'IndexPage',
  components: {DeleteFranchisee, Handle_franchisee},
  data() {
    return {
      search: '',
      // franchisees: [],
      icons: [mdiMagnify, mdiPencil, mdiDelete],
      headers: [
        {text: 'Nom', value: 'name', align: 'center'},
        {text: 'Adresse', value: 'address', align: 'center'},
        {text: 'Téléphone', value: 'phone', align: 'center'},
        {text: "Actif", value: "isactive", align: 'center'},
        {text: "Modifier / supprimer", value: "actions", sortable: false, align: 'center'},
        {text: "Structures", sortable: false, align: 'center'},
        {text: "Membres", sortable: false, align: 'center'},
      ],
    }
  },
  mounted() {
    this.getFranchisees()
  },
  computed: {
    ...mapGetters({
      franchisees: 'franchisees/franchisees',
      dialog: 'franchisees/dialog',
      dialogType: 'franchisees/dialogType',
    }),
    isLoading() {
      return this.franchisees.length === 0
    },
    franchiseesWithoutNullables() {
      if (this.franchisees.length > 0) {
        return this.franchisees.map(element => {
          for (let [key, value] of Object.entries(element)) {
            if (value === null) {
              element[key] = '-'
            }
          }
          return element
        })
      } else {
        return []
      }
    },
  },
  methods: {
    ...mapActions({
      getFranchisees: 'franchisees/getFranchisees',
      updateDialog: 'franchisees/updateDialog',
      updateFranchisee: 'franchisees/updateFranchisee',
      alertError: 'errors/error',
      alertSuccess: 'errors/success'
    }),

    async patchFranchisee(franchisee, value) {
      try {
        franchisee.isactive = value
        this.alertSuccess({
          type: 'success',
          message: `Franchisé '${franchisee.name}' modifié avec succès'`
        })
        return await this.$axios.$patch(`api/franchisees/${franchisee.id}`, franchisee).then(() => {
          this.getFranchisees()
        })
      } catch (error) {
        this.alertError({
          type: 'error',
          message: error.message
        })
      }
    },
    setFranchiseeAndDialog(franchisee, dialogType) {
      this.updateFranchisee(franchisee)
      this.updateDialog({value: true , type: dialogType})
    }
  }
}
</script>

<style scoped>
#franchiseesDataTable, #franchiseesLoader {
  background-color: #ecf0f3 !important;
}

</style>
