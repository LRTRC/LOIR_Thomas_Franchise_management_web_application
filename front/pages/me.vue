<template>
  <div>

    <v-row justify="center">
      <v-col cols="12" sm="10">
        <v-card class="card-neumorphism pa-4">
          {{ user }}
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" sm="10">
        <v-card class="card-neumorphism pa-4">
          <v-row>
            <v-col cols="12" md="6">
              <v-card-title class="titles pb-0">
                <v-icon class="px-4" color="primary">
                  {{ icons[1] }}
                </v-icon>
                Liste des franchisés
              </v-card-title>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                id="franchiseesSearchBar"
                v-model="franchiseesSearch"
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
            class="pa-4 mt-4"
            :headers="franchiseesHeaders"
            :items="franchisees"
            :items-per-page="franchisees.length"
            :search="franchiseesSearch"
            item-key="id"
            loading-text="Chargement des données"
            no-data-text="Aucune donnée"
            no-results-text="Aucun résultat"
            hide-default-footer
            dense
            multi-sort
          />
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" sm="10">
        <v-card class="card-neumorphism pa-4">
          <v-row>
            <v-col cols="12" md="6">
              <v-card-title class="titles pb-0">
                <v-icon class="px-4" color="primary">
                  {{ icons[1] }}
                </v-icon>
                Liste des structures
              </v-card-title>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                id="structuresSearchBar"
                v-model="structuresSearch"
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
            class="pa-4 mt-4"
            :headers="structuresHeaders"
            :items="structures"
            :items-per-page="structures.length"
            :search="structuresSearch"
            item-key="id"
            loading-text="Chargement des données"
            no-data-text="Aucune donnée"
            no-results-text="Aucun résultat"
            hide-default-footer
            dense
            multi-sort
          />
        </v-card>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {mdiMagnify, mdiPlaylistCheck} from '@mdi/js';

export default {
  name: "me",
  data() {
    return {
      icons: [mdiMagnify, mdiPlaylistCheck],
      franchisees: [],
      structures: [],
      franchiseesHeaders: [
        {text: 'Franchisé', value: 'id_franchise', align: 'start'},
      ],
      franchiseesSearch: '',
      structuresHeaders: [
        {text: 'Structure', value: 'id_structure', align: 'start'},
      ],
      structuresSearch: '',
    }
  },
  mounted() {
    this.fetchData(this.user)
  },
  computed: {
    ...mapGetters({
      franchise_users: 'franchisees_users/franchisees_users',
      structures_users: "structures_users/structures_users"
    }),
    user() {
      return this.$auth.user ? this.$auth.user : null
    }
  },
  methods: {
    ...mapActions({
      alertError: 'errors/error'
    }),
    async findUserFranchisees(user) {
      try {
        const id = user.id
        if (user.id) {
          const franchisees = await this.$axios.$get(`/api/franchisees_users/user/${id}`)

          // if response mutate franchisees
          if (franchisees.status === 200 && franchisees.data.length > 0) {
            return this.franchisees = franchisees.data
          }
        }

        // else catch error
      } catch (error) {
        this.alertError(error.message)
      }
    },

    async findUserStructures(user) {
      try {
        const id = user.id
        if (user.id) {
          const structures = await this.$axios.$get(`/api/structures_users/user/${id}`)

          // if response mutate franchisees
          if (structures.status === 200 && structures.data.length > 0) {
            let ids = structures.data.map(el => el.id)
            console.log('ids ' + ids)
            return this.structures = structures.data
          }
        }

        // else catch error
      } catch (error) {
        this.alertError(error.message)
      }
    },

    fetchData(user) {
      this.findUserFranchisees(user);
      this.findUserStructures(user)
    }
  }

}
</script>

<style scoped>
.titles {
  font-family: 'Poppins', sans-serif !important;
}
</style>
