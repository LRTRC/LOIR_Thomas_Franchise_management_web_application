<template>
  <v-app :style="{background: $vuetify.theme.themes['light'].background}">
    <v-app-bar
      v-if="loggedIn"
      app
      dense
      dark
      color="primary"
    >
      <v-icon dark class="mx-4" @click="drawer = !drawer" >{{icons[1]}}</v-icon>
      <v-toolbar-title id="toolbarTitle">Gestion des franchisés</v-toolbar-title>

    </v-app-bar>
    <v-navigation-drawer
      id="drawer"
      v-model="drawer"
      app
      temporary
      dark
      color="primary"
    >
      <v-list
        nav
        dense
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon dark>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-action>
            <v-icon color="error">{{ icons[0] }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="'Déconnexion'"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container class="justify-center fill-height" fluid>
        <v-alert
          v-if="type !== null"
          :type="type"
          transition="scroll-x-reverse-transition"
          class="alert"
          style="position: fixed; right: 1%; top:1%; z-index: 999;"
        >
          {{ message }}
        </v-alert>
        <Nuxt/>
      </v-container>
    </v-main>
    <v-footer
      absolute
      app
      color="primary"
      dark
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mdiFormatListBulletedSquare, mdiLogout, mdiMenu} from "@mdi/js"
import {mapGetters} from 'vuex'

export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawer: false,
      icons: [mdiLogout, mdiMenu],
      items: [
        {
          icon:  mdiFormatListBulletedSquare,
          title: 'Franchisés',
          to: '/'
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      type: "errors/type",
      message: 'errors/message'
    }),
    loggedIn() {
      return !!this.$auth.loggedIn
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      await this.$router.push('/login')
    },
  }
}
</script>
<style scoped>
#toolbarTitle, #drawer {
  font-family: 'Poppins', sans-serif !important;
}
</style>
