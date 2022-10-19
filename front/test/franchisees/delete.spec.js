// import {createLocalVue, mount, shallowMount} from '@vue/test-utils';
// import Vuex from 'vuex';
// import vuetifyStub from "../mocks/vuetify_stub";
// import axiosMock from "../mocks/axios_mock";
// import delete_franchisee from "../../components/franchisees/delete_franchisee";
// import {mutations, state, getters, actions} from '../../store/franchisees.js'
//
// // $ npm test franchisees/store_franchisees
//
// describe('store franchisees', () => {
//   const createStore = () => {
//     const localVue = createLocalVue()
//     localVue.use(Vuex)
//
//     const store = new Vuex.Store({mutations, state, getters, actions})
//     store.$axios = axiosMock;
//
//     return {store}
//   }
//
//   it('STATE is unchanged', () => {
//     const {store} = createStore()
//     expect(store.state)
//       .toStrictEqual({
//         franchisees: [],
//         id: null,
//         name: '',
//         address: '',
//         phone: '',
//         isActive: false,
//         selectedModules: [],
//         dialog: false,
//         dialogType: '',
//       })
//   });
//   it("GETTERS franchisees = state's franchisees", () => {
//     const {store} = createStore()
//     store.commit('MUTATE_FRANCHISEES', 1)
//     expect(store.state.franchisees)
//       .toStrictEqual(store.getters.franchisees)
//   });
//   it("GETTERS id = state's id", () => {
//     const {store} = createStore()
//     store.commit('MUTATE_ID', 1)
//     expect(store.state.id)
//       .toStrictEqual(store.getters.id)
//   });
//   it("GETTERS name = state's name", () => {
//     const {store} = createStore()
//     store.commit('MUTATE_NAME', 1)
//     expect(store.state.name)
//       .toStrictEqual(store.getters.name)
//   });
//   it("GETTERS address = state's address", () => {
//     const {store} = createStore()
//     store.commit('MUTATE_ADDRESS', 1)
//     expect(store.state.address)
//       .toStrictEqual(store.getters.address)
//   });
//   it("GETTERS phone = state's phone", () => {
//     const {store} = createStore()
//     store.commit('MUTATE_PHONE', 1)
//     expect(store.state.phone)
//       .toStrictEqual(store.getters.phone)
//   });
//   it("GETTERS isActive = state's isActive", () => {
//     const {store} = createStore()
//     store.commit('MUTATE_IS_ACTIVE', 1)
//     expect(store.state.isActive)
//       .toStrictEqual(store.getters.isActive)
//   });
//   it("GETTERS selectedModules = state's selectedModules", () => {
//     const {store} = createStore()
//     store.commit('MUTATE_SELECTED_MODULES', 1)
//     expect(store.state.selectedModules)
//       .toStrictEqual(store.getters.selectedModules)
//   });
//   it("GETTERS dialog = state's dialog", () => {
//     const {store} = createStore()
//     store.commit('MUTATE_DIALOG', 1)
//     expect(store.state.dialog)
//       .toStrictEqual(store.getters.dialog)
//   });
//   it("GETTERS dialogType = state's dialogType", () => {
//     const {store} = createStore()
//     store.commit('MUTATE_DIALOG_TYPE', 1)
//     expect(store.state.dialogType)
//       .toStrictEqual(store.getters.dialogType)
//   });
//   it("MUTATION franchisees = state's franchisees", () => {
//     const {store} = createStore()
//     store.commit('MUTATE_FRANCHISEES', 1)
//     expect(store.state.franchisees)
//       .toStrictEqual(1)
//   });
//   it("MUTATION id = state's id", () => {
//     const {store} = createStore()
//     store.commit('MUTATE_ID', 2)
//     expect(store.state.id)
//       .toStrictEqual(2)
//   });
//   it("MUTATION name = state's name", () => {
//     const {store} = createStore()
//     store.commit('MUTATE_NAME', 3)
//     expect(store.state.name)
//       .toStrictEqual(3)
//   });
//   it("MUTATION address = state's address", () => {
//     const {store} = createStore()
//     store.commit('MUTATE_ADDRESS', 4)
//     expect(store.state.address)
//       .toStrictEqual(4)
//   });
//   it("MUTATION phone = state's phone", () => {
//     const {store} = createStore()
//     store.commit('MUTATE_PHONE', 5)
//     expect(store.state.phone)
//       .toStrictEqual(5)
//   });
//   it("MUTATION isActive = state's isActive", () => {
//     const {store} = createStore()
//     store.commit('MUTATE_IS_ACTIVE', 6)
//     expect(store.state.isActive)
//       .toStrictEqual(6)
//   });
//   it("MUTATION selectedModules = state's selectedModules", () => {
//     const {store} = createStore()
//     store.commit('MUTATE_SELECTED_MODULES', 7)
//     expect(store.state.selectedModules)
//       .toStrictEqual(7)
//   });
//   it("MUTATION dialog = state's dialog", () => {
//     const {store} = createStore()
//     store.commit('MUTATE_DIALOG', 8)
//     expect(store.state.dialog)
//       .toStrictEqual(8)
//   });
//   it("MUTATION dialogType = state's dialogType", () => {
//     const {store} = createStore()
//     store.commit('MUTATE_DIALOG_TYPE', 9)
//     expect(store.state.dialogType)
//       .toStrictEqual(9)
//   });
//   it("MUTATION CLEAR_FRANCHISEE resets id, name, address, phone, isActive, selectedModules", () => {
//     const {store} = createStore()
//     store.commit('MUTATE_ID', 2)
//     store.commit('MUTATE_NAME', 2)
//     store.commit('MUTATE_ADDRESS', 2)
//     store.commit('MUTATE_PHONE', 2)
//     store.commit('MUTATE_IS_ACTIVE', 2)
//     store.commit('MUTATE_SELECTED_MODULES', 2)
//     store.commit('CLEAR_FRANCHISEE')
//     expect(store.state).toStrictEqual({
//       franchisees: [],
//       id: null,
//       name: '',
//       address: '',
//       phone: '',
//       isActive: false,
//       selectedModules: [],
//       dialog: false,
//       dialogType: '',
//     })
//   });
//   it("MUTATION CLEAR_FRANCHISEES resets franchisees value", () => {
//     const {store} = createStore()
//     store.commit('MUTATE_FRANCHISEES', 2)
//     store.commit('CLEAR_FRANCHISEES')
//     expect(store.state.franchisees).toStrictEqual([])
//   });
//   it("ACTION getFranchisees commits MUTATE_ID", async () => {
//     const {store} = createStore()
//     store.$axios.$get = jest.fn(() => Promise.resolve({
//       status: 200,
//       data: [{
//         name: 'name',
//         id: 87,
//       }]
//     }))
//     await store.dispatch('getFranchisees')
//     expect(store.state.franchisees)
//       .toStrictEqual([{"id": 87, "name": "name"}])
//   });
//
//
//   it("ACTION updateID commits MUTATE_ID", () => {
//     const {store} = createStore()
//     store.dispatch('updateID', 8)
//     expect(store.state.id).toStrictEqual(8)
//   });
//   it("ACTION updateName commits MUTATE_NAME", () => {
//     const {store} = createStore()
//     store.dispatch('updateName', 7)
//     expect(store.state.name).toStrictEqual(7)
//   });
//   it("ACTION updateAddress commits MUTATE_ADDRESS", () => {
//     const {store} = createStore()
//     store.dispatch('updateAddress', 6)
//     expect(store.state.address).toStrictEqual(6)
//   });
//   it("ACTION updatePhone commits MUTATE_PHONE", () => {
//     const {store} = createStore()
//     store.dispatch('updatePhone', 5)
//     expect(store.state.phone).toStrictEqual(5)
//   });
//   it("ACTION updateIsActive commits MUTATE_IS_ACTIVE", () => {
//     const {store} = createStore()
//     store.dispatch('updateIsActive', 4)
//     expect(store.state.isActive).toStrictEqual(4)
//   });
//   it("ACTION updateSelectedModules commits MUTATE_SELECTED_MODULES", () => {
//     const {store} = createStore()
//     store.dispatch('updateSelectedModules', 3)
//     expect(store.state.selectedModules).toStrictEqual(3)
//   });
//   it("ACTION updateDialog commits MUTATE_DIALOG & MUTATE_DIALOG_TYPE", () => {
//     const {store} = createStore()
//     store.dispatch('updateDialog', {value: 1, type: '2'})
//     expect(store.state.dialog).toStrictEqual(1)
//     expect(store.state.dialogType).toStrictEqual('2')
//   });
//   it("ACTION clearFranchisee commits CLEAR_FRANCHISEE", () => {
//     const {store} = createStore()
//     store.commit('MUTATE_ID', 2)
//     store.commit('MUTATE_ADDRESS', 2)
//     store.commit('MUTATE_IS_ACTIVE', 2)
//     store.dispatch('clearFranchisee')
//     expect(store.state).toStrictEqual({
//       franchisees: [],
//       id: null,
//       name: '',
//       address: '',
//       phone: '',
//       isActive: false,
//       selectedModules: [],
//       dialog: false,
//       dialogType: '',
//     })
//   });
// });











// import {createLocalVue, mount, shallowMount} from '@vue/test-utils';
// import Vuex from 'vuex';
// import vuetifyStub from "../mocks/vuetify_stub";
// import axiosMock from "../mocks/axios_mock";
// import {franchisees} from "../../store/franchisees";
// import {errors} from "../../store/errors";
// import delete_franchisee from "../../components/franchisees/delete_franchisee";
//
// const localVue = createLocalVue();
// localVue.use(Vuex);
// let wrapper;
// let options;
//
// // $ npm test franchisees/delete
//
// describe('component delete_franchisee', () => {
//   beforeEach(() => {
//     const store = new Vuex.Store({
//       modules: {
//         franchisees,
//         errors,
//       },
//     });
//     store.$axios = axiosMock;
//     options = {
//       propsData: {},
//       localVue,
//       store,
//       stubs: vuetifyStub,
//     }
//     wrapper = shallowMount(delete_franchisee, options);
//   });
//   afterEach(() => {
//     wrapper.destroy();
//   });
//   it('COMPONENT name is "index"', () => {
//     expect(wrapper.vm.$options.name).toStrictEqual('deleteFranchisee')
//   });
  // it('COMPONENT tableSettings component is imported', () => {
  //   expect(wrapper.vm.$options.components['tableSettings']).toBeTruthy()
  // });
  // it('COMPONENT deleteSettings component is imported', () => {
  //   expect(wrapper.vm.$options.components['deleteSettings']).toBeTruthy()
  // });
  // it('COMPONENT handleSettings component is imported', () => {
  //   expect(wrapper.vm.$options.components['handleSettings']).toBeTruthy()
  // });
  // it('DOM table-settings component exists in DOM', () => {
  //   expect(wrapper.find('table-settings-stub').exists()).toBeTruthy()
  // });
  // it('DOM handle-settings component exists in DOM', async () => {
  //   await wrapper.setData({selectedDialog: 1})
  //   expect(wrapper.find('handle-settings-stub').exists()).toBeTruthy()
  // });
  // it('DOM delete-settings component exists in DOM', async () => {
  //   await wrapper.setData({selectedDialog: 3})
  //   expect(wrapper.find('delete-settings-stub').exists()).toBeTruthy()
  // });
  // it('DOM settingsDialog exists in DOM', () => {
  //   expect(wrapper.find("[id='settingsDialog']").exists()).toBeTruthy()
  // });
  // it('DOM settingsDialog attributes is unchanged', () => {
  //   expect(wrapper.find("[id='settingsDialog']").attributes()).toStrictEqual({
  //     "id": "settingsDialog",
  //     "max-width": "60%",
  //     "persistent": ""
  //   })
  // });
  // it('DOM table-settings attributes is unchanged', () => {
  //   expect(wrapper.find('table-settings-stub').attributes()).toStrictEqual({
  //     "bannericon": "M14,10H2V12H14V10M14,6H2V8H14V6M2,16H10V14H2V16M21.5,11.5L23,13L16,20L11.5,15.5L13,14L16,17L21.5,11.5Z",
  //     "bannertitle": "Liste des groupes",
  //     "btncreatecontent": "Créer un groupe",
  //     "datatableitems": "",
  //     "headers": "[object Object],[object Object],[object Object],[object Object],[object Object]"
  //   })
  // });
  // it('DOM handle-settings attributes is unchanged', async () => {
  //   await wrapper.setData({selectedDialog: 1})
  //   expect(wrapper.find('handle-settings-stub').attributes()).toStrictEqual({
  //     "bannericon": "M2,16H10V14H2M18,14V10H16V14H12V16H16V20H18V16H22V14M14,6H2V8H14M14,10H2V12H14V10Z",
  //     "bannertitle": "Créer un groupe",
  //     "inputs": "[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],,"
  //   })
  // });
  // it('DOM handle-settings attributes is unchanged', async () => {
  //   await wrapper.setData({selectedDialog: 2})
  //   expect(wrapper.find('handle-settings-stub').attributes()).toStrictEqual({
  //     "bannericon": "M2,6V8H14V6H2M2,10V12H14V10H2M20.04,10.13C19.9,10.13 19.76,10.19 19.65,10.3L18.65,11.3L20.7,13.35L21.7,12.35C21.92,12.14 21.92,11.79 21.7,11.58L20.42,10.3C20.31,10.19 20.18,10.13 20.04,10.13M18.07,11.88L12,17.94V20H14.06L20.12,13.93L18.07,11.88M2,14V16H10V14H2Z",
  //     "bannertitle": "Modifier le groupe",
  //     "inputs": "[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],,"
  //   })
  // });
  // it('DOM delete-settings attributes is unchanged', async () => {
  //   await wrapper.setData({selectedDialog: 3})
  //   expect(wrapper.find('delete-settings-stub').attributes()).toStrictEqual({
  //     "deletesettingscontent": "Supprimer le groupe,Êtes-vous sûr de vouloir supprimer le groupe"
  //   })
  // });
  // it('DATA bannerTitles is unchanged', () => {
  //   expect(wrapper.vm.bannerTitles).toStrictEqual(['Liste des groupes', 'Créer un groupe', 'Modifier le groupe', 'Supprimer le groupe'])
  // });
  // it('DATA bannerIcons is unchanged', () => {
  //   expect(wrapper.vm.bannerIcons).toStrictEqual([
  //     'M14,10H2V12H14V10M14,6H2V8H14V6M2,16H10V14H2V16M21.5,11.5L23,13L16,20L11.5,15.5L13,14L16,17L21.5,11.5Z',
  //     'M2,16H10V14H2M18,14V10H16V14H12V16H16V20H18V16H22V14M14,6H2V8H14M14,10H2V12H14V10Z',
  //     'M2,6V8H14V6H2M2,10V12H14V10H2M20.04,10.13C19.9,10.13 19.76,10.19 19.65,10.3L18.65,11.3L20.7,13.35L21.7,12.35C21.92,12.14 21.92,11.79 21.7,11.58L20.42,10.3C20.31,10.19 20.18,10.13 20.04,10.13M18.07,11.88L12,17.94V20H14.06L20.12,13.93L18.07,11.88M2,14V16H10V14H2Z'
  //   ])
  // });
  // it('DATA roles is unchanged', () => {
  //   expect(wrapper.vm.roles).toStrictEqual([])
  // });
  // it('DATA menus is unchanged', () => {
  //   expect(wrapper.vm.menus).toStrictEqual([])
  // });
  // it('DATA homes is unchanged', () => {
  //   expect(wrapper.vm.homes).toStrictEqual([{value: '/administration/', text: 'administration'}, // array for home's v-select
  //     {value: '/direction/', text: 'direction'},
  //     {value: '/accounting/', text: 'accounting'},
  //     {value: '/sales/', text: 'sales'},
  //     {value: '/production/', text: 'production'},
  //     {value: '/advanced_research/', text: 'advanced research'},
  //   ])
  // });
  // it('DATA headers is unchanged', () => {
  //   expect(wrapper.vm.headers).toStrictEqual([
  //     [{text: "Nom", value: "name"},
  //       {text: "Lieu", value: "location"},
  //       {text: "Page d'accueil", value: "home"},
  //       {text: "Description", value: "description"},
  //       {text: "Actions", value: "actions", sortable: false}],
  //   ])
  // });
  // it('DATA deleteSettingsContent is unchanged', () => {
  //   expect(wrapper.vm.deleteSettingsContent).toStrictEqual(['Supprimer le groupe', 'Êtes-vous sûr de vouloir supprimer le groupe'])
  // });
  // it('DATA dialog is unchanged', () => {
  //   expect(wrapper.vm.dialog).toStrictEqual(false)
  // });
  // it('DATA selectedDialog is unchanged', () => {
  //   expect(wrapper.vm.selectedDialog).toStrictEqual(0)
  // });
  // it('COMPUTED groups = $store.getters["settingsGroups/groups"]', () => {
  //   expect(wrapper.vm.groups).toStrictEqual(wrapper.vm.$store.getters["settingsGroups/groups"])
  // });
  // it('COMPUTED rolesImport = $store.getters["settingsRoles/roles"]', () => {
  //   expect(wrapper.vm.rolesImport).toStrictEqual(wrapper.vm.$store.getters["settingsRoles/roles"])
  // });
  // it('COMPUTED menusImport = $store.getters["settingsMenus/menus"]', () => {
  //   expect(wrapper.vm.menusImport).toStrictEqual(wrapper.vm.$store.getters["settingsMenus/menus"])
  // });
  // it("METHOD editDialog() returns vm.dialog = payload.dialog", () => {
  //   wrapper.vm.editDialog({dialog: true, selectedDialog: 1,})
  //   expect(wrapper.vm.dialog).toStrictEqual(true)
  // });
  // it("METHOD editDialog() returns vm.selectedDialog = payload.selectedDialog", () => {
  //   wrapper.vm.editDialog({dialog: true, selectedDialog: 1,})
  //   expect(wrapper.vm.selectedDialog).toStrictEqual(1)
  // });
  // it("METHOD editItem() edit item in store", () => {
  //   wrapper.vm.editItem({
  //     id: 1,
  //     name: 'nom',
  //     home: 'accueil',
  //     location: 'here',
  //     role_id: 2,
  //     menu: "menu",
  //     description: 'desc'
  //   })
  //   expect(wrapper.vm.$store.state.settingsGroups.item).toStrictEqual({
  //     "description": "desc",
  //     "home": "accueil",
  //     "id": 1,
  //     "location": "here",
  //     "menu": "menu",
  //     "name": "nom",
  //     "role_id": 2
  //   })
  // });
  // it("METHOD editItem() calls the function editItemStore()", () => {
  //   const apiSpy = jest.spyOn(wrapper.vm, 'editItemStore');
  //   wrapper.vm.editItem({
  //     id: 1,
  //     name: 'nom',
  //     home: 'accueil',
  //     location: 'here',
  //     role_id: 2,
  //     menu: "menu",
  //     description: 'desc'
  //   })
  //   expect(apiSpy).toHaveBeenCalledTimes(1)
  // });
  // it("METHOD rolesFilter() returns objects with properties text = role.name and value = role.id", () => {
  //   wrapper.vm.rolesFilter([{id: 1, name: 'role1'}, {id: 2, name: 'role2'}], wrapper.vm.roles)
  //   expect(wrapper.vm.roles).toStrictEqual([{"text": "role1", "value": 1}, {"text": "role2", "value": 2}])
  // });
  // it("METHOD menusFilter() returns objects with properties text = role.name and value = role.id", () => {
  //   wrapper.vm.menusFilter([{title: 'titre 1', other: false}, {title: 'titre 2', other: true}], wrapper.vm.menus)
  //   expect(wrapper.vm.menus).toStrictEqual([{
  //     "text": "titre 1",
  //     "value": {"other": false, "title": "titre 1"}
  //   }, {"text": "titre 2", "value": {"other": true, "title": "titre 2"}}])
  // });
// });
