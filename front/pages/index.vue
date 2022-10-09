<template>
  <div>
    <v-row justify="center">
      <v-col class="justify-center">
        <v-card class="card-neumorphism pa-4">
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
                @click.native="dialog = true"
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
              <template v-slot:item.action="{ item }">
                <v-switch
                  id="franchiseeIsActiveBtn"
                  v-model="item.isactive"
                  @change="patchFranchisee(item, $event)"
                >

                </v-switch>
              </template>
            </v-data-table>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
      id="dialog"
      persistent
      v-model="dialog"
      max-width="50%"
    >
      <handle_franchisee
        id="handleFranchisee"
        @close-dialog="dialog = false"
        @updated-franchisees-list="franchisees = $event"
      />
    </v-dialog>
  </div>
</template>

<script>
import {mdiMagnify} from '@mdi/js';
import Handle_franchisee from "../components/franchisees/handle_franchisee";
import {mapActions} from 'vuex'

export default {
  name: 'IndexPage',
  components: {Handle_franchisee},
  data() {
    return {
      dialog: false,
      search: '',
      icons: [mdiMagnify],
      franchisees: [],
      headers: [
        {text: 'Nom', value: 'name'},
        {text: 'Adresse', value: 'address'},
        {text: 'Téléphone', value: 'phone'},
        {text: "Actif", value: "action", sortable: false}
      ],
    }
  },
  mounted() {
    this.getFranchisees()
  },
  computed: {
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
      alertError: 'errors/error',
      alertSuccess: 'errors/success'
    }),
    async getFranchisees() {
      try {
        const franchisees = await this.$axios.$get("/api/franchisees/")
        return this.franchisees = franchisees.data
      } catch (error) {
        this.alertError({
          type: 'error',
          message: error.message
        })
      }
    },
    async patchFranchisee(franchisee, value) {
      try {
        franchisee.isactive = value
        this.alertSuccess({
          type: 'success',
          message: `Franchisé '${franchisee.name}' modifié avec succès'`
        })
        return await this.$axios.$patch(`api/franchisees/${franchisee.id}`, franchisee)
      } catch (error) {
        this.alertError({
          type: 'error',
          message: error.message
        })
      }

    },
  }
}
</script>

<style scoped>
#franchiseesDataTable, #franchiseesLoader {
  background-color: #ecf0f3 !important;
}

</style>
