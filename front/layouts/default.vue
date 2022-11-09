<template>
  <v-app
    :style="{background: $vuetify.theme.themes['light'].background}"
  >
    <v-app-bar
      id="appBar"
      class="btn-neumorphism"
      v-if="loggedIn"
      app
      dense
      color="background"
    >
      <v-icon
        v-if="isAdmin"
        color="primary"
        class="mx-4"
        @click="drawer = !drawer"
      >
        {{ icons[1] }}
      </v-icon>
      <v-toolbar-title
        id="toolbarTitle"
        @click="$router.push('/')"
        class="text--primary"
      >
        {{ title }}
      </v-toolbar-title>
      <v-menu
        transition="slide-y-transition"
        :nudge-width="200"
        nudge-bottom="15"
        offset-y
        bottom
        dark
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            class="mx-4"
            fab
            x-small
            color="primary"
          >
            <v-icon color="background" large>
              {{ icons[2] }}
            </v-icon>
          </v-btn>
        </template>

        <v-list dense color="primary">
          <v-list-item
            class="menuBtn"
            v-ripple
            v-for="(item, i) in menuMyAccount"
            :key="i"
            @click.native="item.method"
          >
            <v-list-item-content>
              {{ item.title }}
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon :color="item.color">
                {{ item.icon }}
              </v-icon>
            </v-list-item-icon>
          </v-list-item>

        </v-list>
      </v-menu>
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
      class="btn-neumorphism"
      v-if="loggedIn"
      absolute
      app
      color="background"

    >
      <span>{{ footerText }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import {
  mdiHome, mdiLogout, mdiMenu, mdiAccountCircle,
  mdiAccountGroup, mdiLayersTriple, mdiEarth,
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
          to: '/users'
        },

      ],
      menuMyAccount: [
        {
          title: 'Mon compte',
          method: () => this.$router.push('/account')
        },
        {
          icon: mdiLogout,
          color: 'error',
          title: 'Déconnexion',
          method: () => this.logout()
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
    // get user's role
    isAdmin() {
      return this.$auth.user.role === "admin"
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

#appBar, #footer {
  border-radius: 0!important;
}

#toolbarTitle, #drawer, #footer {
  font-family: 'Poppins', sans-serif !important;
  color: #19344F!important;
  font-weight: bold;
}

#toolbarTitle {
  font-size: 1.3em;
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

.menuBtn{
  font-family: Poppins, sans-serif;
  font-size: 0.9em;
}
.menuBtn:hover {
  cursor: pointer!important;
  background-color: rgba(255, 255, 255, 0.15) !important;
}
</style>
