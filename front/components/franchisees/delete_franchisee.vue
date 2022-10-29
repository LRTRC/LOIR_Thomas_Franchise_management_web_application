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
      // bunch of icons
      icons: [mdiPlaylistRemove, mdiAlert],
    }
  },
  computed: {
    ...mapGetters({
      // used when a specific franchisee is handled in the v-data table
      id: 'franchisees/id',
      name: 'franchisees/name',
    })
  },
  methods: {
    ...mapActions({
      // calls actions to display success or error type alert (from errors store)
      alertError: 'errors/error',
      alertSuccess: 'errors/success',
      // mutate dialog
      updateDialog: 'franchisees/updateDialog',
      // get all franchisees from API
      getFranchisees: 'franchisees/getFranchisees',
      // clear the current values used to handle a specific franchisee
      clearFranchisee: 'franchisees/clearFranchisee'
    }),

    // function to validate the form to delete an existing franchisee
    async send() {

      try {

        // sent to API
        await this.$axios.$delete(`/api/franchisees/${this.id}`)
          .then((response) => {

            // if status ok
            if (response.status === 200) {

              // displays a success alert
              this.alertSuccess(`'${this.name}' à été supprimé avec succès'`);
            }
            // get all franchisees from API
            this.getFranchisees();

            // calls clear function
            this.clear()
          })

        // or catch error and sets error alert
      } catch (error) {
        this.alertError(error.message);
      }
    },

    // used to reset form
    clear() {

      // clear handled franchisee in the store
      this.clearFranchisee();

      // close dialog
      this.updateDialog({value: false, type: ''});
    }
  },
}
</script>

<style scoped>
#cardTitle {
  word-break: break-word!important;
  font-family: 'Poppins', sans-serif!important;
}
</style>
