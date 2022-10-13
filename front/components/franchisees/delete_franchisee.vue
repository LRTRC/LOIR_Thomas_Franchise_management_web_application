<template>
  <v-card
    class="v-card-glass"
  >
    <v-banner
      id="bannerDeleteFranchisee"
      color="error"
      width="100%"
      :icon="icons[0]"
      icon-color="white"
      single-line
      dark
    >
      Supprimer le franchisé
    </v-banner>
    <div class="d-flex justify-center ma-4">
      <v-icon
        id="iconAlert"
        class="px-4"
        color="error"
      >
        {{ icons[1] }}
      </v-icon>
      <v-card-title
        id="cardTitle"
        class="text-h6 justify-center"
      >
        Êtes-vous sûr de vouloir supprimer le franchisé "<span
        style="font-weight: bold">{{ franchisee.name }}</span>" ?
      </v-card-title>
    </div>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn id="btnCancelDelete" color="error" text @click.native="updateDialog({value: false, type: ''})"
      >
        ANNULER
      </v-btn>
      <v-btn id="btnValidateDelete" color="success" text @click.native="send"
      >
        OUI
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import { mdiPlaylistRemove,mdiAlert} from '@mdi/js';
export default {
  name: "deleteFranchisee",
  data() {
    return {
      icons: [mdiPlaylistRemove, mdiAlert],
    }
  },
  computed: {
    ...mapGetters({
      franchisee: 'franchisees/franchisee',
    })
  },
  methods: {
    ...mapActions({
      alertError: 'errors/error',
      updateDialog: 'franchisees/updateDialog',
      getFranchisees: 'franchisees/getFranchisees',
      clearFranchisee: 'franchisees/clearFranchisee'
    }),
    async send() {
      try {
        await this.$axios.$delete(`/api/franchisees/${this.franchisee.id}`)
          .then(() => {
            this.getFranchisees()
            this.clearFranchisee()
            this.updateDialog({value: false, type: ''})
          })
      } catch (error) {
        this.alertError({
          type: 'error',
          message: error.message
        })
      }
    }
  },
}
</script>

<style scoped>

</style>
