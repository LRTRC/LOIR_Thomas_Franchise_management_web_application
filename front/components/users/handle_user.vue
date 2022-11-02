<template>
  <v-card class="v-card-glass">
    <v-banner
      id="bannerHandleUser"
      color="primary"
      width="100%"
      :icon="bannerIcon"
      icon-color="white"
      single-line
      dark
    >
      {{ bannerTitle }}
    </v-banner>
    <v-form
      class="pa-4"
      ref="form"
      v-model="valid"
    >
      <v-row>
        <v-col cols="12" lg="6">
          <v-text-field
            id="address"
            :value="email"
            label="Email"
            class="pa-4"
            color="success"
            :prepend-icon="icons[3]"
            :clear-icon="icons[1]"
            clearable
            dense
            :disabled="disabled"
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
          <v-text-field
            id="last_name"
            v-model="last_name"
            label="Nom"
            class="pa-4"
            color="success"
            :rules="nameRules"
            :counter="100"
            :clear-icon="icons[1]"
            required
            clearable
            dense
          />
        </v-col>
        <v-col cols="12" lg="6">
          <v-text-field
            id="first_name"
            v-model="first_name"
            label="Prénom"
            class="pa-4"
            color="success"
            :rules="nameRules"
            :counter="100"
            :clear-icon="icons[1]"
            required
            clearable
            dense
          />
        </v-col>
        <v-col cols="12" lg="6">
          <v-select
            id="selectRoles"
            class="pa-4"
            color="success"
            :prepend-icon="icons[5]"
            v-model="role"
            label="Rôle"
            :items="roles"
            item-color="success"
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
  mdiAccount,
  mdiClose,
  mdiEmail,
  mdiAccountCog,
  mdiPhone,
  mdiPlaylistEdit,
  mdiPlaylistPlus
} from "@mdi/js";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "handle_user",
  data() {
    return {
      // enable or disable #sendBtn
      valid: false,
      // bunch of icons
      icons: [mdiPlaylistPlus, mdiClose, mdiAccount, mdiEmail, mdiPhone, mdiAccountCog, mdiPlaylistEdit],
      // field name regex: required, length <= 100
      nameRules: [
        v => !!v || 'Le nom est requis',
        v => v && v.length <= 100 || 'Le nom ne peut faire plus de 100 caractères',
      ],
      // field address regex: length <= 255
      mailRules: [
        v => v ? v.length <= 255 || "l'adresse ne peut faire plus de 255 caractères" : true
      ],
      // field phone regex: length <= 50
      phoneRules: [
        v => v ? v.length <= 50 || "le téléphone ne peut faire plus de 50 caractères" : true
      ],
      roles: ["admin", "visitor"],
    }
  },
  computed: {
    ...mapGetters({
      // id of the handle user, used when editing one
      id: 'users/id',
      email: 'users/email',
      // mutate dialog type in store
      dialogType: 'users/dialogType',
    }),

    // way to use v-models with vuex state. Used in the form to create or edit an user
    first_name: {
      get() {
        return this.$store.getters["users/first_name"]
      },
      set(newValue) {
        return this.$store.dispatch('users/updateFirstName', newValue)
      },
    },
    last_name: {
      get() {
        return this.$store.getters["users/last_name"]
      },
      set(newValue) {
        return this.$store.dispatch('users/updateLastName', newValue)
      },
    },
    phone: {
      get() {
        return this.$store.getters["users/phone"]
      },
      set(newValue) {
        return this.$store.dispatch('users/updatePhone', newValue)
      },
    },
    role: {
      get() {
        return this.$store.getters["users/role"]
      },
      set(newValue) {
        return this.$store.dispatch('users/updateRole', newValue)
      },
    },
    // return the good banner title depending on the dialog type
    bannerTitle() {
      return this.dialogType === 'create' ? 'Ajouter une utilisateur' : this.dialogType === 'patch' ?
        'Modifier un utilisateur' : ''
    },
    // return the good banner icon depending on the dialog type
    bannerIcon() {
      return this.dialogType === 'create' ? this.icons[0] : this.dialogType === 'patch' ?
        this.icons[6] : null
    },
    // use to sets disabled property on edit a users email
    disabled() {
      return this.dialogType === 'patch'
    }
  },
  methods: {
    ...mapActions({
      // get all users from API
      getUsers: 'users/getUsers',
      // mutate dialog value and type
      updateDialog: 'users/updateDialog',
      // display success or error alert
      alertError: 'errors/error',
      alertSuccess: 'errors/success',
      // clear values used to handle a specific user
      clearUser: 'users/clearUser',
    }),

    // function used to validate the form
    send() {
      this.postUser().then(() => {
        this.clear();
        this.getUsers()
      })
    },

    // function to post a new user or edit an existing one
    async postUser() {

      try {

        // if the dialog type is create
        if (this.dialogType === 'create') {

          // calls setUser to set the payload
          let user = this.setUser();

          // send request to API
          return await this.$axios.$post('api/users/', user)
            .then((response) => {

              // if response ok
              if (response.status === 200) {

                // set a success alert
                this.alertSuccess(`'${user.email}' à été créée avec succès'`)
              }

              // and calls clear
              this.clear();
            })
        }

        // if the dialog type is patch
        if (this.dialogType === 'patch') {

          // calls setUser to set the payload
          let user = this.setUser();

          // send request to API
          return await this.$axios.$patch(`api/users/${this.id}`, user)
            .then((response) => {

              // if response ok
              if (response.status === 200) {

                // set a success alert
                this.alertSuccess(`utilisateur '${user.email}' modifiée avec succès'`)
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
    setUser() {
      // return the formatted object
      return {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        phone: this.phone,
        role: this.role,
      }
    },

    // function to clear values of the handled user in store and close the dialog
    clear() {
      this.clearUser();
      this.updateDialog({value: false, type: ''})
    },
  }
}
</script>

<style scoped>
#bannerHandleUser:deep(label) {
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
