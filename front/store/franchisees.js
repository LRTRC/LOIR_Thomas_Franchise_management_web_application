export const state = () => ({
  franchisees: [],
  franchisee: {},
  dialog: false,
  dialogType: '',
})

export const getters = {
  franchisees: state => state.franchisees,
  franchisee: state => state.franchisee,
  dialog: state => state.dialog,
  dialogType: state => state.dialogType,

}

export const mutations = {
  MUTATE_FRANCHISEES(state, payload) {
    state.franchisees = payload;
  },
  MUTATE_FRANCHISEE(state, payload) {
    state.franchisee = payload;
  },
  MUTATE_DIALOG(state, payload) {
    state.dialog = payload;
  },
  MUTATE_DIALOG_TYPE(state, payload) {
    state.dialogType = payload;
  },
  CLEAR_FRANCHISEE(state, payload) {
    state.franchisee = {};
  },
  CLEAR_FRANCHISEES(state, payload) {
    state.franchisees = [];
  },

}

export const actions = {

  async getFranchisees({commit, dispatch}) {
    try {
      const franchisees = await this.$axios.$get("/api/franchisees/")
      if (franchisees) {
        commit('MUTATE_FRANCHISEES', franchisees.data)
      }
    } catch (error) {
      dispatch('errors/error', {
        message: error.message
      }, {root: true})
    }
  },
  updateDialog({commit}, payload) {
    commit('MUTATE_DIALOG', payload.value)
    commit('MUTATE_DIALOG_TYPE', payload.type)
  },
  updateFranchisee({commit}, payload) {
    commit('MUTATE_FRANCHISEE', payload)
  },
  clearFranchisee({commit}) {
    commit('CLEAR_FRANCHISEE')
  },


}

