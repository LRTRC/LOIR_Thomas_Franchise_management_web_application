<template>
  <v-card class="v-card-glass">
    <v-banner
      id="bannerHandleFranchisee"
      color="info"
      width="100%"
      :icon="icons[0]"
      icon-color="white"
      single-line
      dark
    >
      Ajouter un franchisé
      <v-spacer/>
      <template v-slot:actions>
        <v-switch
          class="px-4"
          id="isActive"
          label="Activé / désactivé"
          v-model="franchisee.isactive"
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
            v-model="franchisee.name"
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
            v-model="franchisee.address"
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
            v-model="franchisee.phone"
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
        @click.native="send(franchisee)"
      >
        sauvegarder
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mdiPlaylistPlus, mdiClose, mdiAccount, mdiMapMarker, mdiPhone, mdiFormatListChecks} from '@mdi/js';
import {mapActions} from "vuex";

export default {
  name: "handle_franchisee",
  data() {
    return {
      valid: false,
      selectedModules: [],
      franchisee: {
        name: '',
        address: '',
        phone: '',
        isactive: false,
        default_modules: {
          subscriptions: false,
          group_lessons: false,
          private_coaching: false,
          workforce: false,
          plannings: false,
          equipments: false,
          advertising: false,
          snacks: false,
        },
      },
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
      icons: [mdiPlaylistPlus, mdiClose, mdiAccount, mdiMapMarker, mdiPhone, mdiFormatListChecks],
      nameRules: [
        v => !!v || 'Le nom est requis',
        v => v && v.length <= 100 || 'Le nom ne peut faire plus de 100 caractères',
      ],
    }
  },
  methods: {
    ...mapActions({
      alertError: 'errors/error',
      alertSuccess: 'errors/success'
    }),
    send(franchisee) {
      this.setPayload(franchisee);
      this.createFranchisee(franchisee).then(() => this.getFranchisees())
      this.clear()
    },
    async createFranchisee(franchisee) {
      try {
        this.alertSuccess({
          type: 'success',
          message: `Franchisé '${franchisee.name}' créé avec succès'`
        })
        return await this.$axios.$post('api/franchisees/', franchisee)
      } catch (error) {
        this.alertError({
          type: 'error',
          message: error.message
        })
      }
    },
    async getFranchisees() {
      try {
        const franchisees = await this.$axios.$get("/api/franchisees/")
        return this.$emit('updated-franchisees-list', franchisees.data)
      } catch (error) {
        this.alertError({
          type: 'error',
          message: error.message
        })
      }
    },
    setPayload(franchisee) {
      this.selectedModules.map((element) => {
        console.log(element)
        for (let [key, value] of Object.entries(franchisee.default_modules)) {
          if (key === element) {
            franchisee.default_modules[key] = !value
          }
        }
      })
      return franchisee
    },
    clear() {
      this.franchisee = {
        name: '',
        address: '',
        phone: '',
        isactive: false,
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
      this.selectedModules = [];
      this.emitCloseDialog();
    },
    emitCloseDialog() {
      return this.$emit('close-dialog');
    },
  }
}
</script>

<style scoped>

</style>
