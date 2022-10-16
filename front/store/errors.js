export const state = () => ({
  // defines the value of the type attribute to pass to a component <v-alert> (Success, info, warning or error)
  type: null,
  // defines a message to pass to a component <v-alert>
  message: null,
})

export const getters = {
  // computes state's data
  type: state => state.type,
  message: state => state.message,
}

export const mutations = {
  // Mutates state's properties 'type' and 'message'
  SET_TYPE_AND_MESSAGE(state, payload) {
    state.type = String(payload.type);
    state.message = String(payload.message);
  },
  // Resets to default value state's properties 'type' and 'message'
  CLEAR(state) {
    state.type = null;
    state.message = null;
  },
}

export const actions = {
  // Action to dispatch to pass success type values to a <v-alert> component
  success({commit}, message) {
    commit('SET_TYPE_AND_MESSAGE', {type: 'success', message: message.message})
    setTimeout(() => {
      commit('CLEAR')
    }, 3000);
  },
  // Action to dispatch to pass error type values to a <v-alert> component
  error({commit}, message) {
    commit('SET_TYPE_AND_MESSAGE', {type: 'error', message: message.message})
    setTimeout(() => {
      commit('CLEAR')
    }, 5000);
  },
  // Action to dispatch to pass info type values to a <v-alert> component
  info({commit}, message) {
    commit('SET_TYPE_AND_MESSAGE', {type: 'info', message: message.message})
    setTimeout(() => {
      commit('CLEAR')
    }, 3000);
  },
  // Action to dispatch to pass warning type values to a <v-alert> component
  warning({commit}, message) {
    commit('SET_TYPE_AND_MESSAGE', {type: 'warning', message: message.message})
    setTimeout(() => {
      commit('CLEAR')
    }, 3000);
  },

  generic({commit}, payload) {
    commit('SET_TYPE_AND_MESSAGE', {type: payload.type, message: payload.message})
    setTimeout(() => {
      commit('CLEAR')
    }, 3000);
  },
}
