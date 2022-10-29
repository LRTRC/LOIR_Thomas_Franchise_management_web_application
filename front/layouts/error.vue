<template>
  <v-app style="background-color: #e0e0e0 !important;">
    <v-row class="mt-12" justify="center">
      <v-col>
        <h1 class=" pa-4" v-if="error.statusCode === 404">
          {{ pageNotFound }}
        </h1>
        <h1 class=" pa-4" v-else>
          {{ otherError }}
        </h1>
        <br>
        <p>
          Something went wrong ...
        </p>
        <br>
        <v-row>
          <v-col class="text-center">
            <v-btn color="error" class="btn-neumorphism px-12" nuxt to="/">
              Home page
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1, p {
  font-family: Poppins, sans-serif;
  color: #424242 !important;
}

h1 {
  font-size: 2em;
}

p {
  font-size: 1em;
  text-align: center;
}

/*.v-btn {*/
/*  text-decoration: underline #800080!important;*/
/*  color: #800080;*/
/*}*/
</style>
