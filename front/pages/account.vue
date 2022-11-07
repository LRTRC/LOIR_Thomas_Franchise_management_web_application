<template>
  <v-row justify="center">
    <v-col cols="12" sm="4" class="text-center">
      <v-progress-circular
        v-if="isLoading"
        color="primary"
        indeterminate
        size="120"
        width="5"
      />
      <v-card v-if="!isLoading" class="card-neumorphism pa-6">
        <v-row>
          <v-col>
            <v-row justify="center">
              <v-col class="text-center mt-4">
                <v-icon color="primary" x-large>
                  {{ icons[0] }}
                </v-icon>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="5">
                <v-divider/>
              </v-col>
            </v-row>
            <v-card-title id="title" class="justify-center pb-0">
              Informations personnelles
            </v-card-title>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col class="text-center mb-10">
            <v-btn id="btnPw" rounded color="error" dark small>
              modifier votre mot de passe
            </v-btn>
          </v-col>
        </v-row>
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
                :prepend-icon="icons[2]"
                :clear-icon="icons[1]"
                :rules="emailRules"
                clearable
                dense
                disabled
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
                :prepend-icon="icons[3]"
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
                clearable
                dense
              />
            </v-col>
          </v-row>
        </v-form>
        <v-row justify="center">
          <v-col cols="5" class="mt-10">
            <v-divider/>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                id="clearBtn"
                text
                @click.native="getUser($auth.user)"
              >
                annuler
              </v-btn>
              <v-btn
                id="sendBtn"
                color="success"
                text
                @click.native="patchUser"
                :disabled="!valid"
              >
                sauvegarder
              </v-btn>
              <v-spacer/>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {mdiAccountCircle, mdiClose, mdiEmail, mdiPhone} from "@mdi/js";
import {mapActions} from "vuex";

export default {
  name: "account",
  data() {
    return {
      // enable or disable #sendBtn
      valid: false,
      icons: [mdiAccountCircle, mdiClose, mdiEmail, mdiPhone],
      email: '',
      password: '',
      last_name: '',
      first_name: '',
      phone: '',
      id: null,
      isLoading: false,
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

    }
  },
  mounted() {
    this.getUser(this.$auth.user);
  },
  methods: {
    ...mapActions({
      // display success or error alert
      alertError: 'errors/error',
      alertSuccess: 'errors/success',
    }),

    // get user information from nuxtAuth
    getUser(user) {
      let {last_name, first_name, email, phone, id, role} = user
      this.last_name = last_name;
      this.first_name = first_name;
      this.email = email;
      this.phone = phone;
      this.id = id;
      this.role = role
    },
    setUser() {
      return {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        phone: this.phone,
        role: this.role
      }
    },
    async patchUser() {
      try {
        // display loader
        this.isLoading = true;
        // calls setUser to set the payload
        let user = this.setUser();

        // send request to API
        return await this.$axios.$patch(`api/users/${this.id}`, user)
          .then((response) => {

            // if response ok
            if (response.status === 200) {
              const refreshedUsed = response.data

              // set refreshed user in nuxt auth
              this.$auth.setUser(refreshedUsed)

              // set user in session storage as well (to keep it save avoiding nuxt auth errors)
              sessionStorage.setItem('user', JSON.stringify(refreshedUsed))

              // restore component variables from nuxt auth user
              this.getUser(this.$auth.user)
              // set a success alert
              this.alertSuccess('Informations personnelles modifiées avec succès')

              // cancel loader
              this.isLoading = false;
            }
          })

      } catch (error) {
        this.alertError(error.message)
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
#title {
  font-family: 'Poppins', sans-serif !important;
}

#btnPw {
  box-shadow: 2px 2px 8px 0 rgba(31, 38, 135, 0.37),
  -2px -2px 8px #ffffff !important;
}

</style>
