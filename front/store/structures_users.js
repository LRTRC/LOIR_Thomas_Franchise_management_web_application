export const state = () => ({
  structures_users: [], // to store all structures_users
  id: null, // when handling one structure_user
  id_structure: null, // when handling one structure_user
  id_user: null, // when handling one structure_user

})

export const getters = {
  structures_users: state => state.structures_users,
  id: state => state.id,
  id_structure: state => state.id_structure,
  id_user: state => state.id_user,
}

export const mutations = {
  MUTATE_STRUCTURES_USERS(state, payload) {
    state.structures_users = payload;
  },
  MUTATE_ID(state, payload) {
    state.id = payload;
  },
  MUTATE_ID_STRUCTURE(state, payload) {
    state.id_structure = payload;
  },
  MUTATE_ID_USER(state, payload) {
    state.id_user = payload;
  },
  // reset all values
  CLEAR_STRUCTURE_USER(state) {
    state.id = null;
    state.id_structure = null;
    state.id_user = null;
  },
  // reset value
  CLEAR_STRUCTURES_USERS(state) {
    state.structures_users = [];
  },
}

export const actions = {

  // send a request to API to get all franchisees
  async getStructuresUsers({commit, dispatch}) {
    try {
      const structures_users = await this.$axios.$get("/api/structures_users/")
      // if response mutate franchisees
      if (structures_users) {
        commit('MUTATE_STRUCTURES_USERS', structures_users.data)
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
  updateIdStructure({commit}, payload) {
    commit('MUTATE_ID_STRUCTURE', payload)
  },
  updateIdUser({commit}, payload) {
    commit('MUTATE_ID_USER', payload)
  },
  clearStructureUser({commit}) {
    commit('CLEAR_STRUCTURE_USER')
  },
}

