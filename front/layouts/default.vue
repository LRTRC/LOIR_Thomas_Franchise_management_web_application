<template>
  <v-app
    :style="{background: $vuetify.theme.themes['light'].background}"
  >
    <v-app-bar
      v-if="loggedIn"
      app
      dense
      dark
      color="primary"
    >
      <v-icon
        dark
        class="mx-4"
        @click="drawer = !drawer"
      >
        {{ icons[1] }}
      </v-icon>
      <v-toolbar-title
        id="toolbarTitle"
        @click="$router.push('/')"
      >
        {{ title }}
      </v-toolbar-title>
      <v-spacer/>
      <v-btn text class="mx-4">
        <v-icon
          class="px-4"
        >
          {{ icons[2] }}
        </v-icon>
        <span>
          {{ name }}
        </span>
      </v-btn>

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
            <v-list-item-title class="drawerPaths" v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-action>
            <v-icon color="error">{{ icons[0] }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="drawerPaths" v-text="'Déconnexion'"/>
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
      <v-snackbar
        v-model="snackbar"
        v-if="!loggedIn"
        timeout="30000"
        multi-line
        color="primary"
      >
        {{ snackbarText }}
        <v-icon> {{ icons[3] }}</v-icon>

        <template v-slot:action="{ attrs }">
          <v-btn
            dark
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Fermer
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
    <v-footer
      id="footer"
      v-if="loggedIn"
      absolute
      app
      color="primary"
      dark
    >
      <span>{{ footerText }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import {
  mdiHome, mdiLogout, mdiMenu, mdiAccountCircle,
  mdiAccountGroup, mdiLayersTriple, mdiEarth
} from "@mdi/js"
import {mapGetters} from 'vuex'

export default {
  name: 'DefaultLayout',
  data() {
    return {
      // set snack (infos demo version)
      snackbar: false,
      snackbarText: "Cette application est une version de démonstration. " +
        "Pour des raisons pratiques son server et son API s'éteignent après 15 minutes d'inactivité. " +
        "Le redémarrage de l'application peut prendre 1 minute lors du premier chargement de page. " +
        "Merci d'avoir attendu jusque-là. L'API peut prendre 20 secondes pour " +
        "redémarrer lors de la première demande d'authentification. Merci de votre patience :).",
      // app bar title
      title: 'Franchises GYM CLUB',
      // used with menu drawer's v-model to set it enabled or disabled
      drawer: false,
      // bunch of icons
      icons: [mdiLogout, mdiMenu, mdiAccountCircle, mdiEarth],
      // links into the navigation drawer menu
      items: [
        {
          icon: mdiHome,
          title: 'Franchisés',
          to: '/'
        },
        {
          icon: mdiLayersTriple,
          title: 'Structures',
          to: '/structures'
        },
        {
          icon: mdiAccountGroup,
          title: 'Utilisateurs',
          to: '/utilisateurs'
        },

      ],
    }
  },
  // on mounted, displays snackbar
  mounted() {
    this.snackbar = true
  },
  computed: {
    ...mapGetters({
      // used to set alerts type and message (from errors store)
      type: "errors/type",
      message: 'errors/message'
    }),
    // tells if loggedIn is true (from nuxt auth)
    loggedIn() {
      return !!this.$auth.loggedIn
    },
    // set a string to display into the footer
    footerText() {
      return `GYM CLUB © ${new Date().getFullYear()}`
    },
    // set the user's name into the app bar next to the user's my account icon
    name() {
      let user = this.$auth.user
      // if user is logged in a has a first name
      if (this.$auth.loggedIn && user.first_name) {
        let first_letter = this.$auth.user.first_name
        return `${first_letter}. ${this.$auth.user.last_name}`
        // else returns default value
      } else return ''
    }
  },
  methods: {
    // calls nuxt auth logout method, clean the session storage used in auth plugin and push to /login route
    async logout() {
      await this.$auth.logout();
      sessionStorage.clear()
      await this.$router.push('/login')
    },
  }
}
</script>
<style scoped>

#toolbarTitle, #drawer, #footer {
  font-family: 'Poppins', sans-serif !important;
}

#footer {
  font-size: 0.9em;
}

.drawerPaths {
  font-size: 1.1em !important;
}

#toolbarTitle:hover {
  cursor: pointer;
}
</style>
