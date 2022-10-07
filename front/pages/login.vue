<template>
  <v-row justify="center">
    <v-col cols="11" sm="8" md="7" lg="5">
      <v-card class="card-neumorphism py-12">
        <v-card-title class="justify-center">
          Connexion
        </v-card-title>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
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
                color="success"
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
import {mdiEmail, mdiLock} from '@mdi/js';

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
      icons: [mdiEmail, mdiLock],
      valid: false,
      email: '',
      emailRules: [
        v => !!v || 'Email is required',
        v => v && v.length <= 255 || 'Email must be less than 255 characters',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => v && v.length <= 60 || 'Password must be less than 60 characters',
      ],
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
      this.userLogin()
    },
    reset() {
      this.$refs.form.reset()
    },
    async userLogin() {
      try {
        let response = await this.$auth.loginWith('local',
          {data: {email: this.email, passphrase: this.password}})
        let user = response.data.data
        this.$auth.setUser(user)
        await this.$router.push('/')
      } catch (err) {
        throw err
      }
    },
  },
}
</script>

<style scoped>

</style>


