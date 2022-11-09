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
        v-if="!isLoading"
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
        <v-divider class="my-4"/>
        <v-row v-if="dialogType === 'patch'">
          <v-col>
            <v-select
              id="selectStructures"
              class="px-4"
              color="success"
              :prepend-icon="icons[7]"
              v-model="selectedStructures"
              label="Structures du franchisé"
              :items="structures"
              item-color="success"
              multiple
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
              :prepend-icon="icons[8]"
              v-model="selectedUsers"
              label="Utilisateurs du franchisé"
              :items="users"
              item-color="success"
              multiple
              deletable-chips
              small-chips
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              id="selectModules"
              class="pa-x"
              color="success"
              :prepend-icon="icons[5]"
              v-model="selectedModules"
              label="Modules activés par défault"
              :items="modules"
              item-color="success"
              multiple
              deletable-chips
              small-chips
            />
          </v-col>
        </v-row>
      </v-form>
      <v-card-actions v-if="!isLoading" class="px-4">
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
  mdiAccountMultiple,
  mdiClose,
  mdiFormatListChecks,
  mdiMapMarker,
  mdiOfficeBuildingPlus,
  mdiPhone,
  mdiPlaylistEdit,
  mdiPlaylistPlus
} from '@mdi/js';
import {mapActions, mapGetters} from "vuex";

export default {
  name: "handle_franchisee",
  data() {
    return {
      // used to close form after validate it
      isLoading: false,
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
      icons: [mdiPlaylistPlus,
        mdiClose,
        mdiAccount,
        mdiMapMarker,
        mdiPhone,
        mdiFormatListChecks,
        mdiPlaylistEdit,
        mdiOfficeBuildingPlus,
        mdiAccountMultiple],
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
      // use to edit with select input the franchisee's structures
      selectedStructures: [],
      // use to edit with select input the franchisee's users
      selectedUsers: [],
    }
  },
  mounted() {
    this.selectedStructures = [...this.findFranchiseeStructures(this.id, this.structuresImport)]
    this.selectedUsers = [...this.findFranchiseeUsers(this.id, this.franchises_users, this.usersImport)]
  },
  computed: {
    ...mapGetters({
      // id of the handle franchisee, used when editing one
      id: 'franchisees/id',
      // mutate dialog type in store
      dialogType: 'franchisees/dialogType',
      // get all structures from the store
      structuresImport: 'structures/structures',
      // get all users from the store
      usersImport: 'users/users',
      // get all franchisees_users from the store
      franchises_users: 'franchisees_users/franchisees_users'
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
    },
    structures() {
      let array = [];
      for (let structure of this.structuresImport) {
        array.push({
          text: structure.name,
          value: structure.id
        })
      }
      return array
    },
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
  methods: {
    ...mapActions({
      // get all franchisees from API
      getFranchisees: 'franchisees/getFranchisees',
      // get franchisees_users
      getFranchisesUsers: 'franchisees_users/getFranchiseesUsers',
      // mutate dialog value and type
      updateDialog: 'franchisees/updateDialog',
      // display success or error alert
      alertError: 'errors/error',
      alertSuccess: 'errors/success',
      // clear values used to handle a specific franchisee
      clearFranchisee: 'franchisees/clearFranchisee'
    }),

    // function used to validate the form
    send() {
      this.isLoading = true
      this.postFranchisee().then(() => {
        this.clear();
        this.getFranchisees();
        this.getFranchisesUsers();
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
            })
        }

        // if the dialog type is patch
        if (this.dialogType === 'patch') {

          // post or patch franchiseesUsers
          await this.postFranchiseesUsers();

          // patch structures owner
          await this.patchStructures();

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
            })
        }
        // and calls clear
        this.clear();
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

    // returns all the structures possesses by the franchisee
    findFranchiseeStructures(franchiseeID, structures) {
      let array = []
      // v select and v model push only the value property in the array of selected items (when using UI)
      structures.find(structure => {
        if (structure.id_franchise === franchiseeID) {
          array.push(structure.id)
        }
      });
      return array
    },

    // returns all the users bound to the franchisee
    findFranchiseeUsers(franchiseeID, franchisees_users, users) {
      let franchiseesUsers = franchisees_users.filter(franchisee_user => franchisee_user.id_franchise === franchiseeID)
      let result = []
      for (let franchiseUser of franchiseesUsers) {
        let user = users.find(el => el.id === franchiseUser.id_user)
        result.push(user.id)
      }
      return result
    },

    // get structures by id
    getStructuresByID(selectedStructures, structures) {
      return structures.filter(el => {
        if (selectedStructures.includes(el.id)) {
          return el
        }
      })
    },

    // get franchisees users by id
    getUsersByID(selectedUsers, users) {
      return users.filter(el => {
        if (selectedUsers.includes(el.id)) {
          return el
        }
      })
    },

    // sort users that do not belong to the franchisee
    getNotOwnedUsers(selectedUsers, users) {
      return users.filter(el => {
        if (!selectedUsers.includes(el.id)) {
          return el
        }
      })
    },


    // patch structures when the user changes the owner of a structure
    // todo: find a way in controller to avoid loop
    async patchStructures() {
      try {
        const franchiseeID = this.id
        let structures = this.getStructuresByID(this.selectedStructures, this.structuresImport)
        for (let structure of structures) {
          structure.id_franchise = franchiseeID
          await this.$axios.$patch(`api/structures/${structure.id}`, structure)
        }
      } catch (error) {
        this.alertError(error.message)
      }
    },

    // post franchisee's users
    async postFranchiseesUsers() {
      try {
        // get current franchisee id
        const franchiseeID = this.id
        // get users selected in select input
        let users = this.getUsersByID(this.selectedUsers, this.usersImport)
        // for each user find its pair in the junction table franchisees_users
        for (let user of users) {
          let item = this.franchises_users.find(el => el.id_user === user.id)
          // if a selected tuple already exist, patch it
          if (item) {
            item.id_franchise = franchiseeID
            await this.$axios.$patch(`api/franchisees_users/${item.id}`, item)
          }
          // else create it
          else {
            const payload = {id_user: user.id, id_franchise: franchiseeID}
            await this.$axios.$post('api/franchisees_users/', payload)
          }
        }
        // delete old tuples
        let notOwnerUsers = this.getNotOwnedUsers(this.selectedUsers, this.usersImport)
        for (let user of notOwnerUsers) {
          let item = this.franchises_users.find(el => el.id_user === user.id && this.id === el.id_franchise)
          if (item) {
            await this.$axios.delete(`api/franchisees_users/${item.id}`)
          }
        }
      } catch (error) {
        this.alertError(error.message)
      }
    },

    // function to clear values of the handled franchisee in store and close the dialog
    clear() {
      this.clearFranchisee();
      this.updateDialog({value: false, type: ''});
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
