<template>
  <v-card class="v-card-glass" style="overflow-x: hidden!important;">
      <v-col v-if="isLoading" class="text-center">
        <v-progress-circular
          class="ma-8 pa-8"
          color="primary"
          indeterminate
          size="120"
          width="5"
        />
      </v-col>
      <v-banner
        v-if="!isLoading"
        id="bannerHandleStructure"
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
        v-if="!isLoading"
        class="pa-4"
        ref="form"
        v-model="valid"
      >
        <v-row>
          <v-col cols="12" lg="6">
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
          <v-col cols="12" lg="6">
            <v-text-field
              id="address"
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
          <v-col cols="12" lg="6">
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
          <v-col cols="12" lg="6">
            <v-select
              id="selectFranchise"
              class="pa-4"
              color="success"
              :prepend-icon="icons[5]"
              v-model="id_franchise"
              label="Franchisé"
              :items="formatted_franchisees"
              item-color="success"
              deletable-chips
              small-chips
            />
          </v-col>
        </v-row>
        <v-row v-if="dialogType === 'patch'">
          <v-col>
            <v-select
              id="selectUsers"
              class="px-4"
              color="success"
              :prepend-icon="icons[7]"
              v-model="selectedUsers"
              label="Utilisateurs de la structure"
              :items="users"
              item-color="success"
              multiple
              deletable-chips
              small-chips
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="flex">
            <v-divider class="mb-4"/>
            <span id="modulesTitles">
            Modules activés :
          </span>
            <v-card id="permissionsCard" flat>
              <v-checkbox v-model="advertising" label="publicité" color="success" class="px-2"/>
              <v-checkbox v-model="equipments" label="équipements" color="success" class="px-2"/>
              <v-checkbox v-model="group_lessons" label="cours collectifs" color="success" class="px-2"/>
              <v-checkbox v-model="plannings" label="agenda" color="success" class="px-2"/>
              <v-checkbox v-model="private_coaching" label="cours privés" color="success" class="px-2"/>
              <v-checkbox v-model="snacks" label="boissons & nourriture" color="success" class="px-2"/>
              <v-checkbox v-model="subscriptions" label="abonnements" color="success" class="px-2"/>
              <v-checkbox v-model="workforce" label="effectif" color="success" class="px-2"/>
            </v-card>
          </v-col>
        </v-row>
      </v-form>
      <v-card-actions class="px-4" v-if="!isLoading">
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
  mdiAccount,
  mdiClose,
  mdiMapMarker,
  mdiOfficeBuilding,
  mdiPhone,
  mdiPlaylistEdit,
  mdiPlaylistPlus,
  mdiAccountMultiple
} from "@mdi/js";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "handle_structure",
  data() {
    return {
      // enable or disable #sendBtn
      valid: false,
      // used to close form after validate it
      isLoading: false,
      // bunch of icons
      icons: [mdiPlaylistPlus, mdiClose, mdiAccount, mdiMapMarker, mdiPhone, mdiOfficeBuilding, mdiPlaylistEdit, mdiAccountMultiple],
      // field name regex: required, length <= 100
      nameRules: [
        v => !!v || 'Le nom est requis',
        v => v && v.length <= 100 || 'Le nom ne peut faire plus de 100 caractères',
      ],
      // field address regex: length <= 255
      addressRules: [
        v => v ? v.length <= 255 || "l'adresse ne peut faire plus de 255 caractères" : true
      ],
      // field phone regex: length <= 50
      phoneRules: [
        v => v ? v.length <= 50 || "le téléphone ne peut faire plus de 50 caractères" : true
      ],
      // use to edit with select input the franchisee's users
      selectedUsers: [],
    }
  },
  mounted() {
    // sync the structure's users with selected users in the structure's users select input
    this.selectedUsers = [...this.findStructureUsers(this.id, this.structures_users, this.usersImport)]
  },
  computed: {
    ...mapGetters({
      // id of the handle structure, used when editing one
      id: 'structures/id',
      // id of the handle structure, used when editing one
      id_franchise: 'structures/id_franchise',
      // mutate dialog type in store
      dialogType: 'structures/dialogType',
      // get franchisees for the select input when creating a structure
      formatted_franchisees: 'structures/formatted_franchisees',
      // get all franchisees_users from the store
      structures_users: 'structures_users/structures_users',
      // get all users from the store
      usersImport: 'users/users',
    }),

    // way to use v-models with vuex state. Used in the form to create or edit a structure
    name: {
      get() {
        return this.$store.getters["structures/name"]
      },
      set(newValue) {
        return this.$store.dispatch('structures/updateName', newValue)
      },
    },
    address: {
      get() {
        return this.$store.getters["structures/address"]
      },
      set(newValue) {
        return this.$store.dispatch('structures/updateAddress', newValue)
      },
    },
    phone: {
      get() {
        return this.$store.getters["structures/phone"]
      },
      set(newValue) {
        return this.$store.dispatch('structures/updatePhone', newValue)
      },
    },
    isActive: {
      get() {
        return this.$store.getters["structures/isActive"]
      },
      set(newValue) {
        return this.$store.dispatch('structures/updateIsActive', newValue)
      },
    },
    id_franchise: {
      get() {
        return this.$store.getters["structures/id_franchise"]
      },
      set(newValue) {
        return this.$store.dispatch('structures/updateIdFranchise', newValue)
      },
    },
    advertising: {
      get() {
        return this.$store.getters["structures/advertising"]
      },
      set(newValue) {
        return this.$store.dispatch('structures/updateAdvertising', newValue)
      },
    },
    equipments: {
      get() {
        return this.$store.getters["structures/equipments"]
      },
      set(newValue) {
        return this.$store.dispatch('structures/updateEquipments', newValue)
      },
    },
    group_lessons: {
      get() {
        return this.$store.getters["structures/group_lessons"]
      },
      set(newValue) {
        return this.$store.dispatch('structures/updateGroupLessons', newValue)
      },
    },
    plannings: {
      get() {
        return this.$store.getters["structures/plannings"]
      },
      set(newValue) {
        return this.$store.dispatch('structures/updatePlannings', newValue)
      },
    },
    private_coaching: {
      get() {
        return this.$store.getters["structures/private_coaching"]
      },
      set(newValue) {
        return this.$store.dispatch('structures/updatePrivateCoaching', newValue)
      },
    },
    snacks: {
      get() {
        return this.$store.getters["structures/snacks"]
      },
      set(newValue) {
        return this.$store.dispatch('structures/updateSnacks', newValue)
      },
    },
    subscriptions: {
      get() {
        return this.$store.getters["structures/subscriptions"]
      },
      set(newValue) {
        return this.$store.dispatch('structures/updateSubscriptions', newValue)
      },
    },
    workforce: {
      get() {
        return this.$store.getters["structures/workforce"]
      },
      set(newValue) {
        return this.$store.dispatch('structures/updateWorkforce', newValue)
      },
    },

    // return the good banner title depending on the dialog type
    bannerTitle() {
      return this.dialogType === 'create' ? 'Ajouter une structure' : this.dialogType === 'patch' ?
        'Modifier une structure' : ''
    },
    // return the good banner icon depending on the dialog type
    bannerIcon() {
      return this.dialogType === 'create' ? this.icons[0] : this.dialogType === 'patch' ?
        this.icons[6] : null
    },
    // format users for select input
    users() {
      let array = [];
      for (let user of this.usersImport) {
        array.push({
          text: user.email,
          value: user.id
        })
      }
      return array
    }
  },
  watch: {
    id_franchise: function (newValue, oldValue) {
      // when user create or edit a structure and select a franchise, it sets the franchise's default values
      // of enabled or disabled modules
      if (newValue) {
        let currentFranchisee = this.formatted_franchisees.find(el => el.value === newValue)
        let payload = currentFranchisee.default_modules
        return this.setDefaultModules(payload)
      } else return null
    }
  },
  methods: {
    ...mapActions({
      // get all structures from API
      getStructures: 'structures/getStructures',
      // get all structures users from API
      getStructuresUsers: 'structures_users/getStructuresUsers',
      // mutate dialog value and type
      updateDialog: 'structures/updateDialog',
      // display success or error alert
      alertError: 'errors/error',
      alertSuccess: 'errors/success',
      // clear values used to handle a specific structure
      clearStructure: 'structures/clearStructure',
      // used to pass default modules values if user wants to create a structure and add a franchisee
      setDefaultModules: 'structures/setDefaultModules',
    }),

    // function used to validate the form
    send() {
      this.isLoading = true
      this.postStructure().then(() => {
        this.clear();
        this.getStructures();
        this.getStructuresUsers();
      })
    },

    // function to post a new structure or edit an existing one
    async postStructure() {

      try {

        // if the dialog type is create
        if (this.dialogType === 'create') {

          // calls setStructure to set the payload
          let structure = this.setStructure();

          // send request to API
          return await this.$axios.$post('api/structures/', structure)
            .then((response) => {

              // if response ok
              if (response.status === 200) {

                // set a success alert
                this.alertSuccess(`'${structure.name}' à été créée avec succès'`)
              }

              // and calls clear
              this.clear();
            })
        }

        // if the dialog type is patch
        if (this.dialogType === 'patch') {

          // post or patch structures users
          await this.postStructuresUsers();

          // calls setStructure to set the payload
          let structure = this.setStructure();

          // send request to API
          return await this.$axios.$patch(`api/structures/${this.id}`, structure)
            .then((response) => {

              // if response ok
              if (response.status === 200) {

                // set a success alert
                this.alertSuccess(`Structure '${structure.name}' modifiée avec succès'`)
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
    setStructure() {
      // return the formatted object
      return {
        id_franchise: this.id_franchise,
        name: this.name,
        address: this.address,
        phone: this.phone,
        isactive: this.isActive,
        advertising: this.advertising,
        equipments: this.equipments,
        group_lessons: this.group_lessons,
        plannings: this.plannings,
        private_coaching: this.private_coaching,
        snacks: this.snacks,
        subscriptions: this.subscriptions,
        workforce: this.workforce,
      }
    },

    // returns all the users bound to the structure
    findStructureUsers(structureID, structures_users, users) {
      let structuresUsers = structures_users.filter(franchisee_user => franchisee_user.id_structure === structureID)
      let result = []
      for (let structureUser of structuresUsers) {
        let user = users.find(el => el.id === structureUser.id_user)
        result.push(user.id)
      }
      return result
    },

    // get franchisees users by id
    getUsersByID(selectedUsers, users) {
      return users.filter(el => {
        if (selectedUsers.includes(el.id)) {
          return el
        }
      })
    },

    // post structure's users
    async postStructuresUsers() {
      try {
        // get current structure id
        const structureID = this.id
        // get users selected in select input
        let users = this.getUsersByID(this.selectedUsers, this.usersImport)
        // for each user find its pair in the junction table structures_users
        for (let user of users) {
          let item = this.structures_users.find(el => el.id_user === user.id)
          // if a selected tuple already exist, patch it
          if (item) {
            item.id_structure = structureID
            await this.$axios.$patch(`api/structures_users/${item.id}`, item)
          }
          // else create it
          else {
            const payload = {id_user: user.id, id_structure: structureID}
            await this.$axios.$post('api/structures_users/', payload)
          }
        }
      } catch (error) {
        this.alertError(error.message)
      }
    },

    // function to clear values of the handled structure in store and close the dialog
    clear() {
      this.clearStructure();
      this.updateDialog({value: false, type: ''})
    },
  }
}
</script>

<style scoped>
#bannerHandleStructure:deep(label) {
  color: white !important;
}

:deep(.v-chip), :deep(.v-chip__close) {
  color: white !important;
  background-color: #24cfaa !important;
}

#permissionsCard {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: space-around;
}

#modulesTitles {
  font-family: Poppins, sans-serif;
}
</style>
