export const state = () => ({
  franchisees: [], // to store all franchisees
  id: null, // when handling one franchisee
  name: '', // when handling one franchisee
  address: '', // when handling one franchisee
  phone: '', // when handling one franchisee
  isActive: false, // when handling one franchisee
  selectedModules: [], // when handling one franchisee
  dialog: false, // to enable or disable a v-dialog component
  dialogType: '', // use to choose which component to be displayed in the v-dialog 'create', 'patch' or 'delete'
})

export const getters = {
  franchisees: state => state.franchisees,
  id: state => state.id,
  name: state => state.name,
  address: state => state.address,
  phone: state => state.phone,
  isActive: state => state.isActive,
  selectedModules: state => state.selectedModules,
  dialog: state => state.dialog,
  dialogType: state => state.dialogType,
}

export const mutations = {
  MUTATE_FRANCHISEES(state, payload) {
    state.franchisees = payload;
  },
  MUTATE_ID(state, payload) {
    state.id = payload;
  },
  MUTATE_NAME(state, payload) {
    state.name = payload;
  },
  MUTATE_ADDRESS(state, payload) {
    state.address = payload;
  },
  MUTATE_PHONE(state, payload) {
    state.phone = payload;
  },
  MUTATE_IS_ACTIVE(state, payload) {
    state.isActive = payload;
  },
  MUTATE_SELECTED_MODULES(state, payload) {
    state.selectedModules = payload;
  },
  MUTATE_DIALOG(state, payload) {
    state.dialog = payload;
  },
  MUTATE_DIALOG_TYPE(state, payload) {
    state.dialogType = payload;
  },
  // reset all values
  CLEAR_FRANCHISEE(state) {
    state.id = null;
    state.name = '';
    state.address = '';
    state.phone = '';
    state.isActive = false;
    state.selectedModules = [];
  },
  // reset value
  CLEAR_FRANCHISEES(state) {
    state.franchisees = [];
  },
}

export const actions = {

  // send a request to API to get all franchisees
  async getFranchisees({commit, dispatch}) {
    try {
      const franchisees = await this.$axios.$get("/api/franchisees/")
      // if response mutate franchisees
      if (franchisees) {
        commit('MUTATE_FRANCHISEES', franchisees.data)
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
  updateName({commit}, payload) {
    commit('MUTATE_NAME', payload)
  },
  updateAddress({commit}, payload) {
    commit('MUTATE_ADDRESS', payload)
  },
  updatePhone({commit}, payload) {
    commit('MUTATE_PHONE', payload)
  },
  updateIsActive({commit}, payload) {
    commit('MUTATE_IS_ACTIVE', payload)
  },
  updateSelectedModules({commit}, payload) {
    commit('MUTATE_SELECTED_MODULES', payload)
  },
  // value will disable or enable a v-dialog and type will be defined to display a selected component
  updateDialog({commit}, payload) {
    commit('MUTATE_DIALOG', payload.value)
    commit('MUTATE_DIALOG_TYPE', payload.type)
  },
  clearFranchisee({commit}) {
    commit('CLEAR_FRANCHISEE')
  },
}

