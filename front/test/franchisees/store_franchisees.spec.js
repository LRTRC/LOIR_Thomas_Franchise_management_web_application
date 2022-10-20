import {createLocalVue} from '@vue/test-utils';
import Vuex from 'vuex';
import axiosMock from "../mocks/axios_mock";
import {mutations, state, getters, actions} from '../../store/franchisees.js'
import * as errors from '../../store/errors.js'

// $ npm test franchisees/store_franchisees

describe('store franchisees', () => {
  const createStore = () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store({mutations, state, getters, actions})

    store.$axios = axiosMock;
    return {store}
  }

  it('STATE is unchanged', () => {
    const {store} = createStore()

    expect(store.state)
      .toStrictEqual({
        franchisees: [],
        id: null,
        name: '',
        address: '',
        phone: '',
        isActive: false,
        selectedModules: [],
        dialog: false,
        dialogType: '',
      })
  });
  it("GETTERS franchisees = state's franchisees", () => {
    const {store} = createStore()
    store.commit('MUTATE_FRANCHISEES', 1)
    expect(store.state.franchisees)
      .toStrictEqual(store.getters.franchisees)
  });
  it("GETTERS id = state's id", () => {
    const {store} = createStore()
    store.commit('MUTATE_ID', 1)
    expect(store.state.id)
      .toStrictEqual(store.getters.id)
  });
  it("GETTERS name = state's name", () => {
    const {store} = createStore()
    store.commit('MUTATE_NAME', 1)
    expect(store.state.name)
      .toStrictEqual(store.getters.name)
  });
  it("GETTERS address = state's address", () => {
    const {store} = createStore()
    store.commit('MUTATE_ADDRESS', 1)
    expect(store.state.address)
      .toStrictEqual(store.getters.address)
  });
  it("GETTERS phone = state's phone", () => {
    const {store} = createStore()
    store.commit('MUTATE_PHONE', 1)
    expect(store.state.phone)
      .toStrictEqual(store.getters.phone)
  });
  it("GETTERS isActive = state's isActive", () => {
    const {store} = createStore()
    store.commit('MUTATE_IS_ACTIVE', 1)
    expect(store.state.isActive)
      .toStrictEqual(store.getters.isActive)
  });
  it("GETTERS selectedModules = state's selectedModules", () => {
    const {store} = createStore()
    store.commit('MUTATE_SELECTED_MODULES', 1)
    expect(store.state.selectedModules)
      .toStrictEqual(store.getters.selectedModules)
  });
  it("GETTERS dialog = state's dialog", () => {
    const {store} = createStore()
    store.commit('MUTATE_DIALOG', 1)
    expect(store.state.dialog)
      .toStrictEqual(store.getters.dialog)
  });
  it("GETTERS dialogType = state's dialogType", () => {
    const {store} = createStore()
    store.commit('MUTATE_DIALOG_TYPE', 1)
    expect(store.state.dialogType)
      .toStrictEqual(store.getters.dialogType)
  });
  it("MUTATION MUTATE_FRANCHISEES sets state's franchisees", () => {
    const {store} = createStore()
    store.commit('MUTATE_FRANCHISEES', 1)
    expect(store.state.franchisees)
      .toStrictEqual(1)
  });
  it("MUTATION MUTATE_ID sets state's id", () => {
    const {store} = createStore()
    store.commit('MUTATE_ID', 2)
    expect(store.state.id)
      .toStrictEqual(2)
  });
  it("MUTATION MUTATION name sets state's name", () => {
    const {store} = createStore()
    store.commit('MUTATE_NAME', 3)
    expect(store.state.name)
      .toStrictEqual(3)
  });
  it("MUTATION MUTATE_ADDRESS sets state's address", () => {
    const {store} = createStore()
    store.commit('MUTATE_ADDRESS', 4)
    expect(store.state.address)
      .toStrictEqual(4)
  });
  it("MUTATION MUTATE_PHONE sets state's phone", () => {
    const {store} = createStore()
    store.commit('MUTATE_PHONE', 5)
    expect(store.state.phone)
      .toStrictEqual(5)
  });
  it("MUTATION MUTATE_IS_ACTIVE sets state's isActive", () => {
    const {store} = createStore()
    store.commit('MUTATE_IS_ACTIVE', 6)
    expect(store.state.isActive)
      .toStrictEqual(6)
  });
  it("MUTATION MUTATE_SELECTED_MODULES sets state's selectedModules", () => {
    const {store} = createStore()
    store.commit('MUTATE_SELECTED_MODULES', 7)
    expect(store.state.selectedModules)
      .toStrictEqual(7)
  });
  it("MUTATION MUTATE_DIALOG sets state's dialog", () => {
    const {store} = createStore()
    store.commit('MUTATE_DIALOG', 8)
    expect(store.state.dialog)
      .toStrictEqual(8)
  });
  it("MUTATION MUTATION dialogType sets state's dialogType", () => {
    const {store} = createStore()
    store.commit('MUTATE_DIALOG_TYPE', 9)
    expect(store.state.dialogType)
      .toStrictEqual(9)
  });
  it("MUTATION CLEAR_FRANCHISEE resets id, name, address, phone, isActive, selectedModules", () => {
    const {store} = createStore()
    store.commit('MUTATE_ID', 2)
    store.commit('MUTATE_NAME', 2)
    store.commit('MUTATE_ADDRESS', 2)
    store.commit('MUTATE_PHONE', 2)
    store.commit('MUTATE_IS_ACTIVE', 2)
    store.commit('MUTATE_SELECTED_MODULES', 2)
    store.commit('CLEAR_FRANCHISEE')
    expect(store.state).toStrictEqual({
      franchisees: [],
      id: null,
      name: '',
      address: '',
      phone: '',
      isActive: false,
      selectedModules: [],
      dialog: false,
      dialogType: '',
    })
  });
  it("MUTATION CLEAR_FRANCHISEES resets franchisees value", () => {
    const {store} = createStore()
    store.commit('MUTATE_FRANCHISEES', 2)
    store.commit('CLEAR_FRANCHISEES')
    expect(store.state.franchisees).toStrictEqual([])
  });
  it("ACTION getFranchisees commits MUTATE_FRANCHISEES", async () => {
    const {store} = createStore()
    store.$axios.$get = jest.fn(() => Promise.resolve({
      status: 200,
      data: [{
        name: 'name',
        id: 87,
      }]
    }))
    let response = await store.dispatch('getFranchisees')
    expect(response).toStrictEqual(true)
    expect(store.state.franchisees).toStrictEqual([{"id": 87, "name": "name"}])
  });
  it("ACTION getFranchisees dispatch error", async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store({
      modules: {
        errors: {
          namespaced: true,
          state: errors.state,
          getters: errors.getters,
          mutations: errors.mutations,
          actions: errors.actions
        },
        franchisees: {mutations, state, getters, actions,  namespaced: true}
      },
    })

    store.$axios = axiosMock;

    store.$axios.$get = jest.fn(() => Promise.reject('error'))
    await store.dispatch('franchisees/getFranchisees')
    expect(store.state.errors.type).toStrictEqual("error")
  });
  it("ACTION updateID commits MUTATE_ID", () => {
    const {store} = createStore()
    store.dispatch('updateID', 8)
    expect(store.state.id).toStrictEqual(8)
  });
  it("ACTION updateName commits MUTATE_NAME", () => {
    const {store} = createStore()
    store.dispatch('updateName', 7)
    expect(store.state.name).toStrictEqual(7)
  });
  it("ACTION updateAddress commits MUTATE_ADDRESS", () => {
    const {store} = createStore()
    store.dispatch('updateAddress', 6)
    expect(store.state.address).toStrictEqual(6)
  });
  it("ACTION updatePhone commits MUTATE_PHONE", () => {
    const {store} = createStore()
    store.dispatch('updatePhone', 5)
    expect(store.state.phone).toStrictEqual(5)
  });
  it("ACTION updateIsActive commits MUTATE_IS_ACTIVE", () => {
    const {store} = createStore()
    store.dispatch('updateIsActive', 4)
    expect(store.state.isActive).toStrictEqual(4)
  });
  it("ACTION updateSelectedModules commits MUTATE_SELECTED_MODULES", () => {
    const {store} = createStore()
    store.dispatch('updateSelectedModules', 3)
    expect(store.state.selectedModules).toStrictEqual(3)
  });
  it("ACTION updateDialog commits MUTATE_DIALOG & MUTATE_DIALOG_TYPE", () => {
    const {store} = createStore()
    store.dispatch('updateDialog', {value: 1, type: '2'})
    expect(store.state.dialog).toStrictEqual(1)
    expect(store.state.dialogType).toStrictEqual('2')
  });
  it("ACTION clearFranchisee commits CLEAR_FRANCHISEE", () => {
    const {store} = createStore()
    store.commit('MUTATE_ID', 2)
    store.commit('MUTATE_ADDRESS', 2)
    store.commit('MUTATE_IS_ACTIVE', 2)
    store.dispatch('clearFranchisee')
    expect(store.state).toStrictEqual({
      franchisees: [],
      id: null,
      name: '',
      address: '',
      phone: '',
      isActive: false,
      selectedModules: [],
      dialog: false,
      dialogType: '',
    })
  });
});
