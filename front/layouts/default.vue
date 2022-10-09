<template>
  <v-app :style="{background: $vuetify.theme.themes['light'].background}">
    <v-app-bar
      v-if="loggedIn"
      app
      dense
    >
      <v-icon class="mx-4" @click="drawer = !drawer" >{{icons[1]}}</v-icon>
      <v-toolbar-title>Gestion des franchisés</v-toolbar-title>

    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
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
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-action>
            <v-icon>{{ icons[0] }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="'Déconnexion'"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container >
        <v-alert
          v-if="type !== null"
          :type="type"
          transition="scroll-x-reverse-transition"
          class="alert"
          style="position: absolute; right: 5%; top:5%; z-index: 999;"
        >
          {{ message }}
        </v-alert>
        <Nuxt/>
      </v-container>
    </v-main>
    <v-footer
      absolute
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import {mdiApps, mdiChartBubble, mdiLogout, mdiMenu} from "@mdi/js"
import {mapGetters} from 'vuex'

export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawer: false,
      icons: [mdiLogout, mdiMenu],
      items: [
        {
          icon: mdiApps,
          title: 'Welcome',
          to: '/'
        },
        {
          icon: mdiChartBubble,
          title: 'Inspire',
          to: '/inspire'
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
