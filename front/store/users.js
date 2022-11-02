export const state = () => ({
  users: [], // to store all franchisees
  id: null, // used when a specific user is handled
  first_name: '', // used when a specific user is handled
  last_name: '', // used when a specific user is handled
  email: '', // used when a specific user is handled
  phone: '', // used when a specific user is handled
  role: '', // used when a specific user is handled
  franchisees_users: [], // to store all franchisees_users
  structures_users: [], // to store all structures_users
  dialog: false, // to enable or disable a v-dialog component
  dialogType: '', // use to choose which component to be displayed in the v-dialog 'create', 'patch' or 'delete'
})

export const getters = {
  franchisees_users: state => state.franchisees_users,
  structures_users: state => state.structures_users,
  users: state => state.users,
  id: state => state.id,
  first_name: state => state.first_name,
  last_name: state => state.last_name,
  email: state => state.email,
  phone: state => state.phone,
  role: state => state.role,
  dialog: state => state.dialog,
  dialogType: state => state.dialogType,

}

export const mutations = {
  MUTATE_USERS(state, payload) {
    state.users = payload;
  },
  MUTATE_USER(state, user) {
    state.id = user.id
    state.first_name = user.first_name
    state.last_name = user.last_name
    state.email = user.email
    state.phone = user.phone
    state.role = user.role
  },
  CLEAR_USER(state) {
    state.id = null
    state.first_name = ''
    state.last_name = ''
    state.email = ''
    state.phone = ''
    state.role = ''
  },
  MUTATE_FRANCHISEES_USERS(state, payload) {
    state.franchisees_users = payload;
  },
  MUTATE_STRUCTURES_USERS(state, payload) {
    state.structures_users = payload;
  },
  MUTATE_FIRST_NAME(state, payload) {
    state.first_name = payload;
  },
  MUTATE_LAST_NAME(state, payload) {
    state.last_name = payload;
  },
  // MUTATE_EMAIL(state, payload) {
  //   state.email = payload;
  // },
  MUTATE_PHONE(state, payload) {
    state.phone = payload;
  },
  MUTATE_ROLE(state, payload) {
    state.role = payload;
  },
  MUTATE_DIALOG(state, payload) {
    state.dialog = payload;
  },
  MUTATE_DIALOG_TYPE(state, payload) {
    state.dialogType = payload;
  },

}

export const actions = {

  // send a request to API to get all franchisees
  async getUsers({commit, dispatch}) {
    try {
      const users = await this.$axios.$get("/api/users/")
      // if response mutate franchisees
      if (users) {
        commit('MUTATE_USERS', users.data)
        return true
      }
      // else catch error
    } catch (error) {
      dispatch('errors/error', error.message, {root: true})
    }
  },
  // used when handling a specific user in v dialog
  updateUser({commit}, user) {
    commit('MUTATE_USER', user)
  },
  updateFirstName({commit}, user) {
    commit('MUTATE_FIRST_NAME', user)
  },
  updateLastName({commit}, user) {
    commit('MUTATE_LAST_NAME', user)
  },
  //  updateEmail({commit}, user) {
  //   commit('MUTATE_EMAIL', user)
  // },
  updatePhone({commit}, user) {
    commit('MUTATE_PHONE', user)
  },
  updateRole({commit}, user) {
    commit('MUTATE_ROLE', user)
  },
  clearUser({commit}) {
    commit("CLEAR_USER")
  },
  // value will disable or enable a v-dialog and type will be defined to display a selected component
  updateDialog({commit}, payload) {
    commit('MUTATE_DIALOG', payload.value)
    commit('MUTATE_DIALOG_TYPE', payload.type)
  },

}

