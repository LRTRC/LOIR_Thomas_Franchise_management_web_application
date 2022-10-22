<template>
  <v-row justify="center" class="ma-auto">
    <v-col cols="11" sm="8" md="7" lg="4" xl="3">
      <v-card class="card-neumorphism py-12">
        <v-card-title class="justify-center">
          Connexion
        </v-card-title>
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
                placeholder="password"
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
  auth: false,
  beforeCreate() {
    // todo: do better
    if (this.$auth.loggedIn) {
      this.$router.push('/')
    }
  },
  data() {
    return {
      icons: [mdiEmail, mdiLock, mdiClose],
      valid: false,
      email: 'toto@dev.fr',
      emailRules: [
        v => !!v || "L'email est requis",
        v => v && v.length <= 255 || "L'email doit contenir moins de 255 caractères",
        v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "L'email doit être valide",
      ],
      password: 'AZE1234a!',
      passwordRules: [
        v => !!v || 'Le mot de passe est requis',
        v => v && v.length <= 60 || "le mot de passe doit contenir moins de 60 caractères",
        v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}/.test(v) || "Le mot de pass doit contenir au moins une majuscule, une minuscule, une chiffre, un symbole et 8 caractères minimum",
      ],
    }
  },
  methods: {
    ...mapActions({
      alertError: 'errors/error',
      alertSuccess: 'errors/success'
    }),
    validate() {
      this.$refs.form.validate()
      this.userLogin()
    },
    reset() {
      this.$refs.form.reset()
    },
    async userLogin() {
      try {
        // let passRegex = new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Z\\d!@#$%^&*]{8}$");
        // let password = passRegex.test(this.password) ?
        //   this.password : ''

        let response = await this.$auth.loginWith('local',
          {data: {email: this.email.toString(), passphrase: this.password.toString()}})
        let user = response.data.data
        this.$auth.setUser(user)
        await this.$router.push('/')
        this.alertSuccess('Authentification réussie')
      } catch (error) {
        this.alertError(error.message)
      }
    },
  },
}
</script>

<style scoped>

</style>


