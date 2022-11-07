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
            v-model="email"
            label="Email"
            type="email"
            class="pa-4"
            color="success"
            :prepend-icon="icons[3]"
            :clear-icon="icons[1]"
            :rules="emailRules"
            clearable
            dense
            :disabled="disabled"
          />
        </v-col>
        <v-col cols="12" lg="6" v-if="dialogType === 'create'">
          <v-text-field
            id="password"
            v-model="password"
            label="Mot de passe"
            class="pa-4"
            color="success"
            type="password"
            :prepend-icon="icons[7]"
            :clear-icon="icons[1]"
            :rules="passwordRules"
            :counter="60"
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
            :prepend-icon="icons[6]"
            :rules="nameRules"
            :counter="100"
            :clear-icon="icons[1]"
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
            :prepend-icon="icons[6]"
            :rules="nameRules"
            :counter="100"
            :clear-icon="icons[1]"
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
            :rules="roleRules"
            item-color="success"
            deletable-chips
            small-chips
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
  mdiPlaylistPlus,
  mdiLock
} from "@mdi/js";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "handle_user",
  data() {
    return {
      // enable or disable #sendBtn
      valid: false,
      // bunch of icons
      icons: [mdiPlaylistPlus, mdiClose, mdiAccount, mdiEmail, mdiPhone, mdiAccountCog, mdiPlaylistEdit, mdiLock],
      // items for select input 'roles'
      roles: ["admin", "visitor"],
      // field name regex: length <= 100
      nameRules: [
        v => v ? v.length <= 100 || 'Le nom ne peut faire plus de 100 caractères' : true
      ],
      // field phone regex: length <= 50
      phoneRules: [
        v => v ? v.length <= 50 || "le téléphone ne peut faire plus de 50 caractères" : true
      ],
      // regex for email : required, length < 255 and must contain one '@' and a '.' after
      emailRules: [
        v => !!v || "L'email est requis",
        v => v && v.length <= 255 || "L'email doit contenir moins de 255 caractères",
        v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "L'email doit être valide",
      ],
      // password regex : required, length < 60, must contain 1 upper case 1 lower case, a number, a symbol and length >= 8
      passwordRules: [
        v => !!v || 'Le mot de passe est requis',
        v => v && v.length <= 60 || "le mot de passe doit contenir moins de 60 caractères",
        v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}/.test(v) || "Le mot de pass doit contenir au moins une majuscule, une minuscule, un chiffre, un symbole et 8 caractères minimum",
      ],
      // regex for role : required
      roleRules: [
        v => !!v || 'Le rôle est requis'
      ]
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
    email: {
      get() {
        return this.$store.getters["users/email"]
      },
      set(newValue) {
        return this.$store.dispatch('users/updateEmail', newValue)
      },
    },
    password: {
      get() {
        return this.$store.getters["users/password"]
      },
      set(newValue) {
        return this.$store.dispatch('users/updatePassword', newValue)
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
      try {
        this.postUser().then(() => {
          this.clear();
          this.getUsers()
        })
      } catch (error) {
        this.alertError(error.message)
      }
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
      if (this.dialogType === 'create') {
        // according to users controller, on methode create a user, join email and password
        return {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          passphrase: this.password,
          phone: this.phone,
          role: this.role,
        }
      } else {
        return {
          first_name: this.first_name,
          last_name: this.last_name,
          phone: this.phone,
          role: this.role,
        }
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
