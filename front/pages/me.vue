<template>
  <div>

    <v-row id="welcome" justify="center">
      <v-col class="text-center">
        <v-card-title class="justify-center">
          Bienvenue {{ user.first_name }} {{ user.last_name }}.
        </v-card-title>
        <v-divider/>
      </v-col>
    </v-row>

    <v-row justify="center" class="my-8">
      <v-col>
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
            :loading="franchiseesIsLoading"
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
                disabled
              />
            </template>
            <template v-slot:item.structures="{ item }">
              <v-chip
                v-for="(structure, i) in item.structures"
                :key="i"
                class="px-2 ma-2"
                color="success"
                text-color="white"
              >
                {{ structure }}
              </v-chip>
            </template>

            <template v-slot:item.users="{ item }">
              <v-chip
                v-for="(user, i) in item.users"
                :key="i"
                class="px-2 ma-2"
                color="success"
                text-color="white"
              >
                {{ user }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="my-8">
      <v-col>
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
            :loading="structuresIsLoading"
            loading-text="Chargement des données"
            no-data-text="Aucune donnée"
            no-results-text="Aucun résultat"
            hide-default-footer
            dense
            multi-sort
          >
            <template v-slot:item.franchise="{ item }">
              <v-chip
                v-if='item.franchise'
                class="px-2 ma-2"
                color="success"
                text-color="white"
              >
                {{ item.franchise }}
              </v-chip>
            </template>
          </v-data-table>
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
      franchiseesIsLoading: false,
      structuresIsLoading: false,
      icons: [mdiMagnify, mdiPlaylistCheck],
      franchisees: [],
      structures: [],
      franchiseesHeaders: [
        {text: 'Nom', value: 'name', align: 'start'},
        {text: 'Adresse', value: 'address', align: 'start'},
        {text: 'Téléphone', value: 'phone', align: 'start'},
        {text: "Actif", value: "isactive", align: 'start'},
        {text: "Structures", value: 'structures', align: 'start'},
        {text: "Membres", value: "users", align: 'start'},
      ],
      franchiseesSearch: '',
      structuresHeaders: [
        {text: 'Nom', value: 'name', align: 'start'},
        {text: 'Adresse', value: 'address', align: 'start'},
        {text: 'Téléphone', value: 'phone', align: 'start'},
        {text: "Actif", value: "isactive", align: 'start'},
        {text: "Franchisé", value: "franchise", align: 'start'},
        {text: "Membres", value: "users", align: 'start'},
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

    // get user from nuxt auth
    user() {
      return this.$auth.user ? this.$auth.user : null
    },
  },
  methods: {
    ...mapActions({
      alertError: 'errors/error'
    }),

    // find the users franchisees and those franchisees structures and users
    async findUserFranchisees(user) {
      try {
        this.franchiseesIsLoading = true;
        const id = user.id
        if (user.id) {
          const franchisees = await this.$axios.$get(`/api/franchisees_users/user/${id}`)

          // if response mutate franchisees
          if (franchisees.status === 200 && franchisees.data.length > 0) {
            let ids = franchisees.data.map(el => el.id_franchise)
            const usersFranchisees = await this.$axios.$post("/api/franchisees/details/", ids)
            // return this.franchisees = usersFranchisees.data

            if (usersFranchisees.status === 200 && usersFranchisees.data.length > 0) {
              let result = usersFranchisees.data
              for (let franchisee of result) {
                franchisee.structures = await this.getFranchiseesStructures(franchisee)
                franchisee.users = await this.getFranchiseesUsers(franchisee)
              }
              this.franchiseesIsLoading = false;
              return this.franchisees = result

            }
          }
        }
        this.franchiseesIsLoading = false;

        // else catch error
      } catch (error) {
        this.alertError(error.message)
      }
    },

    // find the users structures and those structures franchisees and users
    async findUserStructures(user) {
      try {
        this.structuresIsLoading = true;
        const id = user.id
        if (user.id) {
          const structures = await this.$axios.$get(`/api/structures_users/user/${id}`)

          // if response mutate franchisees
          if (structures.status === 200 && structures.data.length > 0) {
            let ids = structures.data.map(el => el.id_structure)
            const usersStructures = await this.$axios.$post("/api/structures/details/", ids)
            if (usersStructures.status === 200 && usersStructures.data.length > 0) {
              const structures = usersStructures.data
              for (let structure of structures) {
                const franchise = await this.$axios.post("/api/franchisees/details/", [structure.id_franchise])
                if (franchise.status === 200 && franchise.data.data.length > 0) {
                  structure.franchise = franchise.data.data[0].name
                  this.structuresIsLoading = false;
                  return this.structures = structures
                }
              }
            }
          }
        }
        this.structuresIsLoading = false;
        // else catch error
      } catch (error) {
        this.alertError(error.message)
      }
    },

    // centralize fetch
    fetchData(user) {
      this.findUserFranchisees(user);
      this.findUserStructures(user)
    },

    // get a structures
    async getFranchiseesStructures(franchisee) {
      const franchiseesStructures = await this.$axios.$get(`/api/structures/franchise/${franchisee.id}`)
      return franchiseesStructures.data.map(el => el.name)


    },

    // get a franchisee's users
    async getFranchiseesUsers(franchisee) {
      const franchiseesUsers = await this.$axios.$get(`/api/franchisees_users/franchise/${franchisee.id}`)
      let users = [];
      if (franchiseesUsers && franchiseesUsers.data.length > 0) {

        for (let user of franchiseesUsers.data) {
          let result = await this.$axios.$get(`/api/users/${user.id_user}`)
          users.push(result.data.email)
        }
      }
      return users
    }
  }

}
</script>

<style scoped>
.titles {
  font-family: 'Poppins', sans-serif !important;
}

#welcome {

}
</style>
