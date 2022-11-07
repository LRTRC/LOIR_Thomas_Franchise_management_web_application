<template>
  <v-row justify="center" class="ma-auto">
    <v-col cols="12" sm="7" md="4" lg="3" xl="3">
      <v-card class="card-neumorphism py-12">
        <v-card-title style="font-family: 'Poppins', sans-serif;font-weight: bold" class="justify-center">
          Franchises
          <br>
          GYM CLUB
        </v-card-title>
        <v-card-subtitle style="font-weight: bold" class="text-center">
          Connexion
        </v-card-subtitle>
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-row justify="center">
            <v-col cols="10">
              <v-text-field
                class="ma-4 mb-10 pa-4 username field"
                color="success"
                v-model="email"
                :rules="emailRules"
                :counter="255"
                :prepend-icon="icons[0]"
                :clear-icon="icons[2]"
                type="email"
                placeholder="Email"
                required
                clearable
                dense
              />
              <v-text-field
                class="ma-4 pa-4 password field"
                color="success"
                v-model="password"
                :rules="passwordRules"
                :counter="60"
                :prepend-icon="icons[1]"
                :clear-icon="icons[2]"
                type="password"
                placeholder="mot de passe"
                required
                clearable
                dense
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="text-center">
              <v-btn
                class="btn-neumorphism"
                :disabled="!valid"
                color="primary"
                width="60%"
                rounded
                @click="validate"
              >
                Valider
              </v-btn>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="text-center">
              <v-btn
                class="btn-neumorphism"
                width="60%"
                rounded
                @click="reset"
              >
                Annuler
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {mdiEmail, mdiLock, mdiClose} from '@mdi/js';
import {mapActions} from 'vuex'

export default {
  name: "login",
  // disable nuxt auth middleware
  auth: false,
  beforeCreate() {
    // if the user is already logged in, redirect to '/'
    if (this.$auth.loggedIn) {
      this.$router.push('/')
    }
  },
  data() {
    return {
      // bunch of icons
      icons: [mdiEmail, mdiLock, mdiClose],
      // used to disable form before validate
      valid: false,
      // todo: for demo version we will set a default existing user but for production replace by ''
      email: 'toto@dev.fr',
      // regex for email : required, length < 255 and must contain one '@' and a '.' after
      emailRules: [
        v => !!v || "L'email est requis",
        v => v && v.length <= 255 || "L'email doit contenir moins de 255 caractères",
        v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "L'email doit être valide",
      ],
      // todo: for demo version we will set a default existing user but for production replace by ''
      password: 'AZE1234a!',
      // password regex : required, length < 60, must contain 1 upper case 1 lower case, a number, a symbol and length >= 8
      passwordRules: [
        v => !!v || 'Le mot de passe est requis',
        v => v && v.length <= 60 || "le mot de passe doit contenir moins de 60 caractères",
        v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}/.test(v) || "Le mot de pass doit contenir au moins une majuscule, une minuscule, un chiffre, un symbole et 8 caractères minimum",
      ],
    }
  },
  methods: {
    ...mapActions({
      // calls error and success actions from errors store (used to display alert)
      alertError: 'errors/error',
      alertSuccess: 'errors/success'
    }),
    validate() {
      // validate forms and calls login method
      this.$refs.form.validate()
      this.userLogin()
    },
    // reset forms and fields
    reset() {
      this.$refs.form.reset()
    },

    // calls nuxt auth loginWith method ( https://auth.nuxtjs.org/api/auth#loginwithstrategyname-args )
    async userLogin() {

      try {

        // send request to API with email and password to login
        let response = await this.$auth.loginWith('local',
          {data: {email: this.email.toString(), passphrase: this.password.toString()}})

        // set response to user const
        let user = response.data.data

        // if user exists
        if (user) {

          // set user in nuxt auth ( https://auth.nuxtjs.org/api/auth#setuseruser )
          this.$auth.setUser(user)
          // set user in session storage as well (to keep it save avoiding nuxt auth errors)
          sessionStorage.setItem('user', JSON.stringify(user))
          // then redirect to '/'
          await this.$router.push('/')
          // and display a success alert
          this.alertSuccess('Authentification réussie')
        }

        // or catch error
      } catch (error) {
        this.alertError(error.message)
      }
    },
  },
}
</script>

<style scoped>
.v-btn {
  font-weight: bold;
}
</style>


