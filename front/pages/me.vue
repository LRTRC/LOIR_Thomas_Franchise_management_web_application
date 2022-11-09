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
export default {
  name: "me",
  computed: {
    user() {
      return this.$auth.user
    }
  }
}
</script>

<style scoped>

</style>
