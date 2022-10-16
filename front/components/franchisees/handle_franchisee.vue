<template>
  <v-card class="v-card-glass">
    <v-banner
      id="bannerHandleFranchisee"
      color="info"
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
import {mdiPlaylistPlus, mdiClose, mdiAccount, mdiMapMarker, mdiPhone, mdiFormatListChecks, mdiPlaylistEdit} from '@mdi/js';
import {mapGetters, mapActions} from "vuex";

export default {
  name: "handle_franchisee",
  data() {
    return {
      valid: false,
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
      icons: [mdiPlaylistPlus, mdiClose, mdiAccount, mdiMapMarker, mdiPhone, mdiFormatListChecks, mdiPlaylistEdit],
      nameRules: [
        v => !!v || 'Le nom est requis',
        v => v && v.length <= 100 || 'Le nom ne peut faire plus de 100 caractères',
      ],
    }
  },
  computed: {
    ...mapGetters({
      id: 'franchisees/id',
      dialogType: 'franchisees/dialogType',
    }),
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
    bannerTitle() {
      return this.dialogType === 'create' ? 'Ajouter un franchisé' : this.dialogType === 'patch' ?
        'Modifier un franchisé' : ''
    },
    bannerIcon() {
      return this.dialogType === 'create' ? this.icons[0] : this.dialogType === 'patch' ?
        this.icons[6] : null
    }
  },
  methods: {
    ...mapActions({
      getFranchisees: 'franchisees/getFranchisees',
      updateDialog: 'franchisees/updateDialog',
      alertError: 'errors/error',
      alertSuccess: 'errors/success',
      clearFranchisee: 'franchisees/clearFranchisee'
    }),
    send(franchisee) {
      this.postFranchisee(franchisee).then(() => {
        this.clear();
        this.getFranchisees()
      })
    },
    async postFranchisee() {
      try {
        if (this.dialogType === 'create') {
          let franchisee = this.setFranchisee();
          return await this.$axios.$post('api/franchisees/', franchisee)
            .then(() => {
              this.alertSuccess({
                type: 'success',
                message: `'${franchisee.name}' à été créé avec succès'`
              })
              this.clear();
            })
        }
        if (this.dialogType === 'patch') {
          let franchisee = this.setFranchisee();
          return await this.$axios.$patch(`api/franchisees/${this.id}`, franchisee).then(() => {
            this.alertSuccess({
              type: 'success',
              message: `Franchisé '${franchisee.name}' modifié avec succès'`
            })
            this.clear();
          })
        }
      } catch (error) {
        this.alertError({
          type: 'error',
          message: error.message
        })
      }
    },
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
      this.selectedModules.map((element) => {
        for (let [key, value] of Object.entries(franchisee.default_modules)) {
          if (key === element) {
            franchisee.default_modules[key] = !value
          }
        }
      })
      return franchisee
    },
    clear() {
      this.clearFranchisee();
      this.updateDialog({value: false, type: ''})
    },
  }
}
</script>

<style scoped>

</style>
