export const state = () => ({
  franchisees_users: [], // to store all franchisees_users
  id: null, // when handling one franchisee_user
  id_franchise: null, // when handling one franchisee_user
  id_user: null, // when handling one franchisee_user

})

export const getters = {
  franchisees_users: state => state.franchisees_users,
  id: state => state.id,
  id_franchise: state => state.id_franchise,
  id_user: state => state.id_user,
}

export const mutations = {
  MUTATE_FRANCHISEES_USERS(state, payload) {
    state.franchisees_users = payload;
  },
  MUTATE_ID(state, payload) {
    state.id = payload;
  },
  MUTATE_ID_FRANCHISE(state, payload) {
    state.id_franchise = payload;
  },
  MUTATE_ID_USER(state, payload) {
    state.id_user = payload;
  },
  // reset all values
  CLEAR_FRANCHISEE(state) {
    state.id = null;
    state.id_franchise = null;
    state.id_user = null;
  },
  // reset value
  CLEAR_FRANCHISEES(state) {
    state.franchisees_users = [];
  },
}

export const actions = {

  // send a request to API to get all franchisees
  async getFranchiseesUsers({commit, dispatch}) {
    try {
      const franchisees_users = await this.$axios.$get("/api/franchisees_users/")
      // if response mutate franchisees
      if (franchisees_users) {
        commit('MUTATE_FRANCHISEES_USERS', franchisees_users.data)
        return true
      }
      // else catch error
    } catch (error) {
      dispatch('errors/error', error.message, {root: true})
    }
  },
  updateID({commit}, payload) {
    commit('MUTATE_ID', payload)
  },
  updateIdFranchise({commit}, payload) {
    commit('MUTATE_ID_FRANCHISE', payload)
  },
  updateIdUser({commit}, payload) {
    commit('MUTATE_ID_USER', payload)
  },
  clearFranchisee({commit}) {
    commit('CLEAR_FRANCHISEE')
  },
}

