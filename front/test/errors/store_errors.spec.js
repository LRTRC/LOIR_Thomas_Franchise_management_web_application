import {createLocalVue} from '@vue/test-utils';
import Vuex from 'vuex';
import axiosMock from "../mocks/axios_mock";
import {mutations, state, getters, actions} from '../../store/errors.js'

// $ npm test errors/store_errors
// todo: tests setTimout without waiting

describe('store errors', () => {
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
        type: null,
        message: null,
      })
  });
  it("GETTERS type = state's type", () => {
    const {store} = createStore()
    store.commit('SET_TYPE_AND_MESSAGE', {type: 1})
    expect(store.state.type)
      .toStrictEqual(store.getters.type)
  });
  it("GETTERS message = state's message", () => {
    const {store} = createStore()
    store.commit('SET_TYPE_AND_MESSAGE', {message: 2})
    expect(store.state.message)
      .toStrictEqual(store.getters.message)
  });
  it("MUTATION SET_TYPE_AND_MESSAGE sets state's type and message", () => {
    const {store} = createStore()
    store.commit('SET_TYPE_AND_MESSAGE', {type: 3, message: 4})
    expect(store.state.type).toStrictEqual("3")
    expect(store.state.message).toStrictEqual("4")
  });
  it("MUTATION CLEAR resets state's type and message", () => {
    const {store} = createStore()
    store.commit('SET_TYPE_AND_MESSAGE', {type: 5, message: 6})
    store.commit('CLEAR')
    expect(store.state.type).toStrictEqual(null)
    expect(store.state.message).toStrictEqual(null)
  });
  it("ACTION success commits SET_TYPE_AND_MESSAGE", () => {
    const {store} = createStore()
    store.dispatch('success', 'test')
    expect(store.state.type).toStrictEqual("success")
    expect(store.state.message).toStrictEqual("test")
  });
  it("ACTION error commits SET_TYPE_AND_MESSAGE", () => {
    const {store} = createStore()
    store.dispatch('error', 'test')
    expect(store.state.type).toStrictEqual("error")
    expect(store.state.message).toStrictEqual("test")
  });
  it("ACTION info commits SET_TYPE_AND_MESSAGE", () => {
    const {store} = createStore()
    store.dispatch('info', 'test')
    expect(store.state.type).toStrictEqual("info")
    expect(store.state.message).toStrictEqual("test")
  });
  it("ACTION warning commits SET_TYPE_AND_MESSAGE", () => {
    const {store} = createStore()
    store.dispatch('warning', 'test')
    expect(store.state.type).toStrictEqual("warning")
    expect(store.state.message).toStrictEqual("test")
  });
});
