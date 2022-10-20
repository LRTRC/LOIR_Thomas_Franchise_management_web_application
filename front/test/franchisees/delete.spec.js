import {createLocalVue, mount, shallowMount} from '@vue/test-utils';
import Vuex from 'vuex';
import vuetifyStub from "../mocks/vuetify_stub";
import axiosMock from "../mocks/axios_mock";
import delete_franchisee from "../../components/franchisees/delete_franchisee";
import * as errors from '../../store/errors.js'
import * as franchisees from '../../store/franchisees.js'

const localVue = createLocalVue();
localVue.use(Vuex);
let wrapper;
let options;

// $ npm test franchisees/delete
describe('component delete_franchisee', () => {
  beforeEach(() => {
    const store = new Vuex.Store({
      modules: {
        errors: {
          namespaced: true,
          state: errors.state,
          getters: errors.getters,
          mutations: errors.mutations,
          actions: errors.actions
        },
        franchisees: {
          namespaced: true,
          state: franchisees.state,
          getters: franchisees.getters,
          mutations: franchisees.mutations,
          actions: franchisees.actions
        }
      },
    })
    store.$axios = axiosMock;

    options = {
      propsData: {},
      localVue,
      store,
      stubs: vuetifyStub,
      mocks: {
        $axios: axiosMock
      },
    }
    wrapper = shallowMount(delete_franchisee, options);
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it('STATE franchisees is unchanged', () => {
    expect(wrapper.vm.$store.state.franchisees)
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
  it('COMPONENT name is "index"', () => {
    expect(wrapper.vm.$options.name).toStrictEqual('deleteFranchisee')
  });
  it('DOM bannerDeleteFranchisee attributes is unchanged', () => {
    expect(wrapper.find("[id='bannerDeleteFranchisee']").attributes()).toStrictEqual({
      "color": "error",
      "dark": "",
      "icon": "M14 10H3V12H14V10M14 6H3V8H14V6M3 16H10V14H3V16M14.4 22L17 19.4L19.6 22L21 20.6L18.4 18L21 15.4L19.6 14L17 16.6L14.4 14L13 15.4L15.6 18L13 20.6L14.4 22Z",
      "icon-color": "white",
      "id": "bannerDeleteFranchisee",
      "single-line": "",
      "width": "100%"
    })
  });
  it('DOM bannerDeleteFranchisee text is unchanged', () => {
    expect(wrapper.find("[id='bannerDeleteFranchisee']").text()).toStrictEqual('Supprimer le franchisé')
  });
  it('DOM iconAlert attributes is unchanged', () => {
    expect(wrapper.find("[id='iconAlert']").attributes()).toStrictEqual({
      "class": "px-4",
      "color": "error",
      "id": "iconAlert"
    });
  });
  it('DOM bannerDeleteFranchisee text is unchanged', () => {
    expect(wrapper.find("[id='iconAlert']").text()).toStrictEqual('M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z')
  });
  it('DOM cardTitle attributes is unchanged', () => {
    expect(wrapper.find("[id='cardTitle']").attributes()).toStrictEqual({
      "class": "text-h6 justify-center",
      "id": "cardTitle"
    });
  });
  it('DOM btnCancelDelete attributes is unchanged', () => {
    expect(wrapper.find("[id='btnCancelDelete']").attributes()).toStrictEqual({
      "color": "error",
      "id": "btnCancelDelete",
      "text": ""
    });
  });
  it('DOM btnCancelDelete attributes is unchanged', () => {
    expect(wrapper.find("[id='btnCancelDelete']").text()).toStrictEqual("ANNULER");
  });
  it("DOM btnCancelDelete trigger click calls clear function", async () => {
    const apiSpy = jest.spyOn(wrapper.vm, 'clear');
    const btn = wrapper.find("[id='btnCancelDelete']")
    await btn.trigger('click');
    expect(apiSpy).toHaveBeenCalledTimes(1)
  });
  it('DOM btnValidateDelete attributes is unchanged', () => {
    expect(wrapper.find("[id='btnValidateDelete']").attributes()).toStrictEqual({
      "color": "success",
      "id": "btnValidateDelete",
      "text": ""
    });
  });
  it('DOM btnValidateDelete attributes is unchanged', () => {
    expect(wrapper.find("[id='btnValidateDelete']").text()).toStrictEqual("OUI");
  });
  it("DOM btnValidateDelete trigger click calls clear function", async () => {
    const apiSpy = jest.spyOn(wrapper.vm, 'send');
    const btn = wrapper.find("[id='btnValidateDelete']")
    await btn.trigger('click');
    expect(apiSpy).toHaveBeenCalledTimes(1)
  });
  it("DATA icons is unchanged", () => {
    expect(wrapper.vm.icons).toStrictEqual(["M14 10H3V12H14V10M14 6H3V8H14V6M3 16H10V14H3V16M14.4 22L17 19.4L19.6 22L21 20.6L18.4 18L21 15.4L19.6 14L17 16.6L14.4 14L13 15.4L15.6 18L13 20.6L14.4 22Z", "M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z"])
  });
  it("COMPUTED id = store's id", () => {
    wrapper.vm.$store.commit('franchisees/MUTATE_ID', 1)
    expect(wrapper.vm.id).toStrictEqual(wrapper.vm.$store.getters["franchisees/id"])
  });
  it("COMPUTED name = store's name", () => {
    wrapper.vm.$store.commit('franchisees/MUTATE_NAME', 'toto')
    expect(wrapper.vm.name).toStrictEqual(wrapper.vm.$store.getters["franchisees/name"])
  });
  it("METHOD send calls getFranchisees ", async () => {
    const apiSpy = jest.spyOn(wrapper.vm, 'getFranchisees');
    await wrapper.vm.send()
    expect(apiSpy).toHaveBeenCalledTimes(1)
  });
  it("METHOD send calls clearFranchisee ", async () => {
    const apiSpy = jest.spyOn(wrapper.vm, 'clearFranchisee');
    await wrapper.vm.send()
    expect(apiSpy).toHaveBeenCalledTimes(1)
  });
  it("METHOD send calls updateDialog ", async () => {
    const apiSpy = jest.spyOn(wrapper.vm, 'updateDialog');
    await wrapper.vm.send()
    expect(apiSpy).toHaveBeenCalledTimes(1)
  });
  it("METHOD clear calls clearFranchisee ", () => {
    const apiSpy = jest.spyOn(wrapper.vm, 'clearFranchisee');
    wrapper.vm.clear()
    expect(apiSpy).toHaveBeenCalledTimes(1)
  });
  it("METHOD clear calls updateDialog ", () => {
    const apiSpy = jest.spyOn(wrapper.vm, 'updateDialog');
    wrapper.vm.clear()
    expect(apiSpy).toHaveBeenCalledTimes(1)
  });
  it("METHOD clear reset dialog ", () => {
    wrapper.vm.$store.commit('franchisees/MUTATE_DIALOG', 1)
    wrapper.vm.clear()
    expect(wrapper.vm.$store.state.franchisees.dialog).toStrictEqual(false)
  });
  it("METHOD clear reset dialogType ", () => {
    wrapper.vm.$store.commit('franchisees/MUTATE_DIALOG_TYPE', 1)
    wrapper.vm.clear()
    expect(wrapper.vm.$store.state.franchisees.dialogType).toStrictEqual('')
  });

});


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
