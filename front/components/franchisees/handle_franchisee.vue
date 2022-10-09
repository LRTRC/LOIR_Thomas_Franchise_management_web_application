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
            v-model="default_modules"
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
        @click.native="setPayload(franchisee)"
      >
        sauvegarder
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mdiPlaylistPlus, mdiClose, mdiAccount, mdiMapMarker, mdiPhone, mdiFormatListChecks} from '@mdi/js';

export default {
  name: "handle_franchisee",
  data() {
    return {
      valid: false,
      default_modules: [],
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
    async createFranchisee(franchisee) {
      return await this.$axios.$post('api/franchisees/', franchisee)
    },
    send(franchisee) {
      this.setPayload(franchisee);
      this.createFranchisee(franchisee);
      this.clear()
    },
    setPayload(franchisee) {
      console.log(franchisee)

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
