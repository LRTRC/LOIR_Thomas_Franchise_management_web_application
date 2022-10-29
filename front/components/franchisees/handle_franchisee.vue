<template>
  <v-card class="v-card-glass">
    <v-banner
      id="bannerHandleFranchisee"
      color="primary"
      width="100%"
      :icon="bannerIcon"
      icon-color="white"
      single-line
      dark
    >
      {{ bannerTitle }}
      <v-spacer/>
      <template v-slot:actions>
        <v-switch
          class="px-4"
          id="isActive"
          label="Activé / désactivé"
          v-model="isActive"
          color="success"
          inset
          dense
          dark
        />
      </template>
    </v-banner>
    <v-form
      class="pa-4"
      ref="form"
      v-model="valid"
    >
      <v-row>
        <v-col cols="12" lg="4">
          <v-text-field
            id="name"
            v-model="name"
            label="Nom"
            class="pa-4"
            color="success"
            :rules="nameRules"
            :counter="100"
            :prepend-icon="icons[2]"
            :clear-icon="icons[1]"
            required
            clearable
            dense
          />
        </v-col>
        <v-col cols="12" lg="4">
          <v-text-field
            id="adress"
            v-model="address"
            label="Adresse"
            class="pa-4"
            color="success"
            :rules="addressRules"
            :counter="255"
            :prepend-icon="icons[3]"
            :clear-icon="icons[1]"
            clearable
            dense
          />
        </v-col>
        <v-col cols="12" lg="4">
          <v-text-field
            id="phone"
            v-model="phone"
            label="Téléphone"
            class="pa-4"
            color="success"
            :rules="phoneRules"
            :counter="50"
            :prepend-icon="icons[4]"
            :clear-icon="icons[1]"
            clearable
            dense
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            id="selectModules"
            class="pa-4"
            color="success"
            :prepend-icon="icons[5]"
            v-model="selectedModules"
            label="Modules activés par défault"
            :items="modules "
            item-color="success"
            multiple
            deletable-chips
            small-chips
          />
        </v-col>
      </v-row>
    </v-form>
    <v-card-actions class="px-4">
      <v-spacer></v-spacer>
      <v-btn
        id="clearBtn"
        text
        @click.native="clear"
      >
        annuler
      </v-btn>
      <v-btn
        id="sendBtn"
        color="success"
        :disabled="!valid"
        text
        @click.native="send"
      >
        sauvegarder
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {
  mdiPlaylistPlus,
  mdiClose,
  mdiAccount,
  mdiMapMarker,
  mdiPhone,
  mdiFormatListChecks,
  mdiPlaylistEdit
} from '@mdi/js';
import {mapGetters, mapActions} from "vuex";

export default {
  name: "handle_franchisee",
  data() {
    return {
      // enable or disable #sendBtn
      valid: false,
      // existing modules that can be selected, used in the select input
      modules: [
        {
          text: 'abonnements',
          value: 'subscriptions'
        },
        {
          text: 'cours collectifs',
          value: 'group_lessons'
        },
        {
          text: 'coachings privés',
          value: 'private_coaching'
        },
        {
          text: 'effectif',
          value: 'workforce'
        },
        {
          text: 'agenda',
          value: 'plannings'
        },
        {
          text: 'équipements',
          value: 'equipments'
        },
        {
          text: 'publicité',
          value: 'advertising'
        },
        {
          text: 'collations',
          value: 'snacks'
        },
      ],
      // bunch of icons
      icons: [mdiPlaylistPlus, mdiClose, mdiAccount, mdiMapMarker, mdiPhone, mdiFormatListChecks, mdiPlaylistEdit],
      // field name regex: required, length <= 100
      nameRules: [
        v => !!v || 'Le nom est requis',
        v => v && v.length <= 100 || 'Le nom ne peut faire plus de 100 caractères',
      ],
      // field address regex: length <= 255
      addressRules: [
        v => v.length <= 255 || "l'adresse ne peut faire plus de 255 caractères",
      ],
      // field phone regex: length <= 50
      phoneRules: [
        v => v.length <= 50 || "le téléphone ne peut faire plus de 50 caractères",
      ],
    }
  },
  computed: {
    ...mapGetters({
      // id of the handle franchisee, used when editing one
      id: 'franchisees/id',
      // mutate dialog type in store
      dialogType: 'franchisees/dialogType',
    }),

    // way to use v-models with vuex state. Used in the form to create or edit a franchisee
    name: {
      get() {
        return this.$store.getters["franchisees/name"]
      },
      set(newValue) {
        return this.$store.dispatch('franchisees/updateName', newValue)
      },
    },
    address: {
      get() {
        return this.$store.getters["franchisees/address"]
      },
      set(newValue) {
        return this.$store.dispatch('franchisees/updateAddress', newValue)
      },
    },
    phone: {
      get() {
        return this.$store.getters["franchisees/phone"]
      },
      set(newValue) {
        return this.$store.dispatch('franchisees/updatePhone', newValue)
      },
    },
    isActive: {
      get() {
        return this.$store.getters["franchisees/isActive"]
      },
      set(newValue) {
        return this.$store.dispatch('franchisees/updateIsActive', newValue)
      },
    },
    selectedModules: {
      get() {
        return this.$store.getters["franchisees/selectedModules"]
      },
      set(newValue) {
        return this.$store.dispatch('franchisees/updateSelectedModules', newValue)
      },
    },
    // return the good banner title depending on the dialog type
    bannerTitle() {
      return this.dialogType === 'create' ? 'Ajouter un franchisé' : this.dialogType === 'patch' ?
        'Modifier un franchisé' : ''
    },
    // return the good banner icon depending on the dialog type
    bannerIcon() {
      return this.dialogType === 'create' ? this.icons[0] : this.dialogType === 'patch' ?
        this.icons[6] : null
    }
  },
  methods: {
    ...mapActions({
      // get all franchisees from API
      getFranchisees: 'franchisees/getFranchisees',
      // mutate dialog value and type
      updateDialog: 'franchisees/updateDialog',
      // display success or error alert
      alertError: 'errors/error',
      alertSuccess: 'errors/success',
      // clear values used to handle a specific franchisee
      clearFranchisee: 'franchisees/clearFranchisee'
    }),

    // function used to validate the form
    send(franchisee) {
      this.postFranchisee(franchisee).then(() => {
        this.clear();
        this.getFranchisees()
      })
    },

    // function to post a new franchisee or edit an existing one
    async postFranchisee() {

      try {

        // if the dialog type is create
        if (this.dialogType === 'create') {

          // calls setFranchisee to set the payload
          let franchisee = this.setFranchisee();

          // send request to API
          return await this.$axios.$post('api/franchisees/', franchisee)
            .then((response) => {

              // if response ok
              if (response.status === 200) {

                // set a success alert
                this.alertSuccess(`'${franchisee.name}' à été créé avec succès'`)
              }

              // and calls clear
              this.clear();
            })
        }

        // if the dialog type is patch
        if (this.dialogType === 'patch') {

          // calls setFranchisee to set the payload
          let franchisee = this.setFranchisee();

          // send request to API
          return await this.$axios.$patch(`api/franchisees/${this.id}`, franchisee)
            .then((response) => {

              // if response ok
              if (response.status === 200) {

                // set a success alert
                this.alertSuccess(`Franchisé '${franchisee.name}' modifié avec succès'`)
              }

              // and calls clear
              this.clear();
            })
        }

        // else catch error and set error alert
      } catch (error) {
        this.alertError(error.message)
      }
    },

    // used to set a formatted payload before sending a request to API
    setFranchisee() {
      let franchisee = {
        name: this.name,
        address: this.address,
        phone: this.phone,
        isactive: this.isActive,
        default_modules: {
          subscriptions: false,
          group_lessons: false,
          private_coaching: false,
          workforce: false,
          plannings: false,
          equipments: false,
          advertising: false,
          snacks: false,
        }
      }

      // for each value in the selected modules (sets by select input and kept in store)
      // set its value to true in the default_modules property
      this.selectedModules.map((element) => {
        for (let [key, value] of Object.entries(franchisee.default_modules)) {
          if (key === element) {
            franchisee.default_modules[key] = !value
          }
        }
      })

      // return the formatted object
      return franchisee
    },

    // function to clear values of the handled franchisee in store and close the dialog
    clear() {
      this.clearFranchisee();
      this.updateDialog({value: false, type: ''})
    },
  }
}
</script>

<style scoped>
#bannerHandleFranchisee:deep(label) {
  color: white !important;
}

:deep(.v-chip), :deep(.v-chip__close) {
  color: white !important;
  background-color: #24cfaa !important;
}

</style>
