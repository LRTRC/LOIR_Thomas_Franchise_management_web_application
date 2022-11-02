export const state = () => ({
  structures: [], // to store all structures
  id: null, // when handling one structure
  id_franchise: null, // when handling one structure
  name: '', // when handling one structure
  address: '', // when handling one structure
  phone: '', // when handling one structure
  isActive: false, // when handling one structure
  advertising: false, // when handling one structure
  equipments: false, // when handling one structure
  group_lessons: false, // when handling one structure
  plannings: false, // when handling one structure
  private_coaching: false, // when handling one structure
  snacks: false, // when handling one structure
  subscriptions: false, // when handling one structure
  workforce: false, // when handling one structure
  dialog: false, // to enable or disable a v-dialog component
  dialogType: '', // use to choose which component to be displayed in the v-dialog 'create', 'patch' or 'delete'
  formatted_franchisees: [] // use to feed select input's items when creating a structure
})

export const getters = {
  structures: state => state.structures,
  id: state => state.id,
  id_franchise: state => state.id_franchise,
  name: state => state.name,
  address: state => state.address,
  phone: state => state.phone,
  isActive: state => state.isActive,
  advertising: state => state.advertising,
  equipments: state => state.equipments,
  group_lessons: state => state.group_lessons,
  plannings: state => state.plannings,
  private_coaching: state => state.private_coaching,
  snacks: state => state.snacks,
  subscriptions: state => state.subscriptions,
  workforce: state => state.workforce,
  dialog: state => state.dialog,
  dialogType: state => state.dialogType,
  formatted_franchisees: state => state.formatted_franchisees
}

export const mutations = {
  MUTATE_STRUCTURES(state, payload) {
    state.structures = payload;
  },
  MUTATE_ID(state, payload) {
    state.id = payload;
  },
  MUTATE_ID_FRANCHISE(state, payload) {
    state.id_franchise = payload;
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
  MUTATE_ADVERTISING(state, payload) {
    state.advertising = payload;
  },
  MUTATE_EQUIPMENTS(state, payload) {
    state.equipments = payload;
  },
  MUTATE_GROUP_LESSONS(state, payload) {
    state.group_lessons = payload;
  },
  MUTATE_PLANNINGS(state, payload) {
    state.plannings = payload;
  },
  MUTATE_PRIVATE_COACHING(state, payload) {
    state.private_coaching = payload;
  },
  MUTATE_SNACKS(state, payload) {
    state.snacks = payload;
  },
  MUTATE_SUBSCRIPTIONS(state, payload) {
    state.subscriptions = payload;
  },
  MUTATE_WORKFORCE(state, payload) {
    state.workforce = payload;
  },

  MUTATE_DIALOG(state, payload) {
    state.dialog = payload;
  },
  MUTATE_DIALOG_TYPE(state, payload) {
    state.dialogType = payload;
  },
  // reset all values
  CLEAR_STRUCTURE(state) {
    state.id = null;
    state.id_franchise = null;
    state.name = '';
    state.address = '';
    state.phone = '';
    state.isActive = false;
    state.advertising = false;
    state.equipments = false;
    state.group_lessons = false;
    state.plannings = false;
    state.private_coaching = false;
    state.snacks = false;
    state.subscriptions = false;
    state.workforce = false;
  },
  // reset value
  CLEAR_STRUCTURES(state) {
    state.structures = [];
  },
  MUTATE_FORMATTED_FRANCHISEES(state, payload) {
    state.formatted_franchisees = payload
  },
  SET_DEFAULT_MODULES(state, payload) {
    for (let [key, value] of Object.entries(payload)) {
      state[key] = value
    }
  }
}

export const actions = {

  // send a request to API to get all franchisees
  async getStructures({commit, dispatch}) {
    try {
      const structures = await this.$axios.$get("/api/structures/")
      // if response mutate franchisees
      if (structures) {
        commit('MUTATE_STRUCTURES', structures.data)
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
  updateAdvertising({commit}, payload) {
    commit('MUTATE_ADVERTISING', payload)
  },
  updateEquipments({commit}, payload) {
    commit('MUTATE_EQUIPMENTS', payload)
  },
  updateGroupLessons({commit}, payload) {
    commit('MUTATE_GROUP_LESSONS', payload)
  },
  updatePlannings({commit}, payload) {
    commit('MUTATE_PLANNINGS', payload)
  },
  updatePrivateCoaching({commit}, payload) {
    commit('MUTATE_PRIVATE_COACHING', payload)
  },
  updateSnacks({commit}, payload) {
    commit('MUTATE_SNACKS', payload)
  },
  updateSubscriptions({commit}, payload) {
    commit('MUTATE_SUBSCRIPTIONS', payload)
  },
  updateWorkforce({commit}, payload) {
    commit('MUTATE_WORKFORCE', payload)
  },
  // value will disable or enable a v-dialog and type will be defined to display a selected component
  updateDialog({commit}, payload) {
    commit('MUTATE_DIALOG', payload.value)
    commit('MUTATE_DIALOG_TYPE', payload.type)
  },
  clearStructure({commit}) {
    commit('CLEAR_STRUCTURE')
  },
  // used to pass default modules values if user wants to create a structure and add a franchisee
  setDefaultModules({commit}, payload) {
    commit('SET_DEFAULT_MODULES', payload)
  },
  // used for v select franchise input in handle_franchisee component
  updateFormattedFranchisees({commit}, payload) {
    commit('MUTATE_FORMATTED_FRANCHISEES', payload)
  }
}

