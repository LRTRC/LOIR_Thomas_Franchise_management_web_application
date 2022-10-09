<template>
  <v-app :style="{background: $vuetify.theme.themes['light'].background}">
    <v-navigation-drawer
      v-if="loggedIn"
      permanent
      expand-on-hover
      app
    >
      <v-list>
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
              <v-icon>{{ iconLogout }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="'Déconnexion'" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container class="fill-height">
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
import {mdiApps, mdiChartBubble, mdiLogout} from "@mdi/js"

export default {
  name: 'DefaultLayout',
  data() {
    return {
      iconLogout: mdiLogout,
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
