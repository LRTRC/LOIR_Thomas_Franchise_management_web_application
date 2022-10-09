<template>
  <v-card>
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
    </v-banner>
    <v-form
      class="pa-4"
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        id="name"
        v-model="name"
        label="Nom"
        class="pa-4"
        color="success"
        :rules="nameRules"
        :counter="100"
        :prepend-icon="icons[0]"
        :clear-icon="icons[1]"
        required
        clearable
        dense
      />
      <v-text-field
        id="adress"
        v-model="address"
        label="Adresse"
        class="pa-4"
      />
      <v-text-field
        id="phone"
        v-model="phone"
        label="Téléphone"
        class="pa-4"
      />
      <v-switch
        id="isActive"
        label="Activé / désactivé"
        v-model="isactive"
      >
      </v-switch>
      <v-select
        id="selectModules"
        class="pa-4"
        v-model="default_modules"
        label="Modules par défault"
        :items="modules "
        multiple
      />
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
        text
        @click.native="send"
      >
        sauvegarder
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mdiPlaylistPlus, mdiClose} from '@mdi/js';

export default {
  name: "handle_franchisee",
  data() {
    return {
      valid: false,
      franchisee: {},
      name: '',
      address: '',
      phone: '',
      default_modules: '',
      isactive: '',
      modules: [
        {
          text: 'abonnements',
          value: 'subscriptions'
        },
        {
          text: 'abonnements',
          value: 'cours collectifs'
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
      icons: [mdiPlaylistPlus, mdiClose],
      nameRules: [
        v => !!v || 'Le nom est requis',
        v => v && v.length <= 100 || 'Le nom ne peut faire plus de 100 caractères',
      ],
    }
  },
  methods: {
    async createFranchisee(franchisee) {
      return await this.$axios.$post('api/franchisees/', franchisee)
    },
    send(franchisee) {
      this.createFranchisee(franchisee);
      this.clear()
    },
    clear() {
      this.franchisee = {};
      this.emitCloseDialog();
    },
    emitCloseDialog() {
      return this.$emit('close-dialog');
    }
  }
}
</script>

<style scoped>

</style>
