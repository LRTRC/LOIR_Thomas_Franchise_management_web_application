<template>
  <v-card
    class="v-card-glass"
  >
    <v-banner
      id="bannerDeleteStructure"
      color="error"
      width="100%"
      :icon="icons[0]"
      icon-color="white"
      single-line
      dark
    >
      Supprimer la structure
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
        <span>Êtes-vous sûr de vouloir supprimer la structure "<strong>{{ name }}</strong>" ?</span>
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
  name: "delete_structure",
  data() {
    return {
      // bunch of icons
      icons: [mdiPlaylistRemove, mdiAlert],
    }
  },
  computed: {
    ...mapGetters({
      // used when a specific structure is handled in the v-data table
      id: 'structures/id',
      name: 'structures/name',
      structures: 'structures/structures',
      structures_users: "structures_users/structures_users",
    })
  },
  methods: {
    ...mapActions({
      // calls actions to display success or error type alert (from errors store)
      alertError: 'errors/error',
      alertSuccess: 'errors/success',
      // mutate dialog
      updateDialog: 'structures/updateDialog',
      // get all structures from API
      getStructures: 'structures/getStructures',
      // clear the current values used to handle a specific franchisee
      clearStructure: 'structures/clearStructure',
    }),

    // function to validate the form to delete an existing franchisee
    async send() {

      try {


        // delete structures_users related to the handled structure
        let structureUsers = this.findStructureUsers(this.id, this.structures_users);
        if (structureUsers && structureUsers.length  > 0) {
          for (const structure_user of structureUsers) {
            await this.$axios.$delete(`/api/structures_users/${structure_user.id}`)
          }
        }

        // sent to API
        await this.$axios.$delete(`/api/structures/${this.id}`)
          .then((response) => {

            // if status ok
            if (response.status === 200) {

              // displays a success alert
              this.alertSuccess(`'${this.name}' à été supprimé avec succès'`);
            }
            // get all franchisees from API
            this.getStructures();

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
      this.clearStructure();

      // close dialog
      this.updateDialog({value: false, type: ''});
    },

    // returns all the users bound to the structure
    findStructureUsers(structureID, structures_users) {
      return structures_users.filter(structure_user => structure_user.id_structure === structureID)
    },

  }
}
</script>

<style scoped>
#cardTitle {
  word-break: break-word!important;
  font-family: 'Poppins', sans-serif!important;
}
</style>
