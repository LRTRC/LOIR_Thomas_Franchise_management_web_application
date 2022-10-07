<template>
  <v-row>
    <v-col class="text-center">
      <img
        src="/v.png"
        alt="Vuetify.js"
        class="mb-5"
      >
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
      <v-btn @click="fetch">
        click me
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'InspirePage',
  data() {
    return {
    franchisees: [],
    }
  },
  methods: {
    async getFranchisees() {
      const franchisees = await this.$axios.$get("/api/franchisees/")
    },
    async fetch() {
      this.franchisees = await fetch(
        'http://localhost:3000/api/franchisees/'
      ).then(res => res.json())
    }
  }
}
</script>
