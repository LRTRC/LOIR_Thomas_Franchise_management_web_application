<template>
  <v-row justify="center">
    <v-col cols="12" sm="10">
      <v-card class="card-neumorphism pa-4">
        {{ user }}
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "me",
  data() {
    return {
      franchisees: [],
      structures: [],
    }
  },
  mounted() {
    this.fetData(this.user)
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
          const franchisees = await this.$axios.$get(`/api/franchisees_users/${id}`)

          // if response mutate franchisees
          if (franchisees) {
            return this.franchisees = franchisees
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
          const franchisees = await this.$axios.$get(`/api/structures_users/${id}`)

          // if response mutate franchisees
          if (franchisees) {
            return this.franchisees = franchisees
          }
        }

        // else catch error
      } catch (error) {
        this.alertError(error.message)
      }
    },

    fetData(user) {
      this.findUserFranchisees(user)
    }
  }

}
</script>

<style scoped>

</style>
