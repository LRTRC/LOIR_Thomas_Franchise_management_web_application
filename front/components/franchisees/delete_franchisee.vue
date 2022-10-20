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
        Êtes-vous sûr de vouloir supprimer le franchisé "{{ name }}" ?
      </v-card-title>
    </div>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn id="btnCancelDelete" color="error" text @click.native="clear"
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
      id: 'franchisees/id',
      name: 'franchisees/name',
    })
  },
  methods: {
    ...mapActions({
      alertError: 'errors/error',
      alertSuccess: 'errors/success',
      updateDialog: 'franchisees/updateDialog',
      getFranchisees: 'franchisees/getFranchisees',
      clearFranchisee: 'franchisees/clearFranchisee'
    }),
    async send() {
      try {
        await this.$axios.$delete(`/api/franchisees/${this.id}`)
          .then((response) => {
            if (response) {
              this.getFranchisees()
              this.alertSuccess(`'${this.name}' à été supprimé avec succès'`)
              this.clearFranchisee()
              this.updateDialog({value: false, type: ''})
            }
          })
      } catch (error) {
        this.alertError(error.message)
      }
    },
    clear() {
      this.clearFranchisee()
      this.updateDialog({value: false, type: ''})
    }
  },
}
</script>

<style scoped>
#cardTitle {
  word-break: break-word!important;
}
</style>
