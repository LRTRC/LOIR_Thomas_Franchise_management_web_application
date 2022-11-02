export const state = () => ({
  users: [], // to store all franchisees
 })

export const getters = {
  users: state => state.users,

}

export const mutations = {
  MUTATE_USERS(state, payload) {
    state.users = payload;
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

}

