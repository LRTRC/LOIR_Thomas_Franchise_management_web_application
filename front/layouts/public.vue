<template>
  <v-app :style="{background: $vuetify.theme.themes['light'].background}">
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  auth: false,

}
</script>

<style scoped>

</style>
