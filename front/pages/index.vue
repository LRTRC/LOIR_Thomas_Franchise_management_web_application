<template>
  <div>
    <v-row justify="center">
      <v-col>
        <v-card class="card-neumorphism pa-4 ma-4">
          <v-skeleton-loader
            id="franchiseesLoader"
            class="pa-4"
            v-if="franchisees.length === 0"
            type=" table-heading, table-row-divider, table-row-divider, table-row-divider"
          />
          <div v-if="franchisees.length > 0">
            <v-row justify="center" class="text-center ma-4">
              <v-col cols="12" sm="6" md="4" class="d-flex">
                <v-text-field
                  id="franchiseesSearchBar"
                  v-model="search"
                  clearable
                  :prepend-icon="icons[0]"
                  label="Rechercher"
                  hide-details
                />
              </v-col>
              <v-spacer/>
              <v-btn
                id="btnCreateFranchisee"
                class="align-self-end"
                elevation="4"
                color="success"
                rounded
                dark
                @click.native="updateDialog({value: true, type: 'create'})"
              >
                Ajouter un franchisé
              </v-btn>
            </v-row>
            <v-data-table
              id="franchiseesDataTable"
              class="pa-4"
              :headers="headers"
              :items="franchisees"
              :items-per-page="franchisees.length"
              :search="search"
              item-key="id"
              loading-text="Chargement des données"
              no-data-text="Aucune donnée"
              no-results-text="Aucun résultat"
              hide-default-footer
              dense
              multi-sort

            >
              <template v-slot:item.isactive="{ item }">
                <v-switch
                  id="franchiseeIsActiveBtn"
                  v-model="item.isactive"
                  @change="patchFranchiseeIsActive(item, $event)"
                />
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn
                  id="btnEditItem"
                  icon
                  @click.native="setFranchiseeAndDialog(item, 'patch')"
                >
                  <v-icon
                    id="btnEditItemIcon"
                    small
                    class="mr-2"
                  >
                    {{ icons[1] }}
                  </v-icon>
                </v-btn>
                <v-btn
                  id="btnDeleteItem"
                  icon
                  @click.native="setFranchiseeAndDialog(item, 'delete')"
                >
                  <v-icon
                    id="btnDeleteItemIcon"
                    small
                  >
                    {{ icons[2] }}
                  </v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
      id="dialog"
      persistent
      v-model="dialog"
      max-width="50%"
    >
      <handle_franchisee
        v-if="dialogType === 'patch' || dialogType === 'create' && dialog"
        id="handleFranchisee"
      />
      <delete-franchisee
        v-if="(dialogType === 'delete') && dialog"
        id="deleteFranchisee"
      />
    </v-dialog>
  </div>
</template>

<script>
import Handle_franchisee from "../components/franchisees/handle_franchisee";
import DeleteFranchisee from "../components/franchisees/delete_franchisee";
import {mdiDelete, mdiMagnify, mdiPencil} from '@mdi/js';
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'IndexPage',
  components: {DeleteFranchisee, Handle_franchisee},
  data() {
    return {
      search: '',
      icons: [mdiMagnify, mdiPencil, mdiDelete],
      headers: [
        {text: 'Nom', value: 'name', align: 'center'},
        {text: 'Adresse', value: 'address', align: 'center'},
        {text: 'Téléphone', value: 'phone', align: 'center'},
        {text: "Actif", value: "isactive", align: 'center'},
        {text: "Modifier / supprimer", value: "actions", sortable: false, align: 'center'},
        {text: "Structures", sortable: false, align: 'center'},
        {text: "Membres", sortable: false, align: 'center'},
      ],
    }
  },
  mounted() {
    this.getFranchisees()
  },
  computed: {
    ...mapGetters({
      franchisees: 'franchisees/franchisees',
      dialog: 'franchisees/dialog',
      dialogType: 'franchisees/dialogType',
    }),
  },
  methods: {
    ...mapActions({
      getFranchisees: 'franchisees/getFranchisees',
      updateName: 'franchisees/updateName',
      updateID: 'franchisees/updateID',
      updateAddress: 'franchisees/updateAddress',
      updatePhone: 'franchisees/updatePhone',
      updateIsActive: 'franchisees/updateIsActive',
      updateSelectedModules: 'franchisees/updateSelectedModules',
      updateDialog: 'franchisees/updateDialog',
      alertError: 'errors/error',
      alertSuccess: 'errors/success'
    }),

    async patchFranchiseeIsActive(franchisee, value) {
      try {
        franchisee.isactive = value
        return await this.$axios.$patch(`api/franchisees/${franchisee.id}`, franchisee).then(() => {
          this.getFranchisees()
          this.alertSuccess(`Franchisé '${franchisee.name}' modifié avec succès'`)
        })
      } catch (error) {
        this.alertError(error.message)
      }
    },
    setFranchiseeAndDialog(franchisee, dialogType) {
      this.updateID(franchisee.id)
      this.updateName(franchisee.name)
      this.updateAddress(franchisee.address)
      this.updatePhone(franchisee.phone)
      this.updateIsActive(franchisee.isactive)
      let modules = (() => {
        let array = []
        for (let [key, value] of Object.entries(franchisee.default_modules)) {
          if (value) array.push(key)
        }
        return array
      })();
      this.updateSelectedModules(modules)
      this.updateDialog({value: true, type: dialogType})
    }
  }
}
</script>

<style scoped>
#franchiseesDataTable, #franchiseesLoader {
  background-color: #ecf0f3 !important;
  min-height: 50vh!important;
  max-width: 100vh!important;
}

#franchiseesDataTable:deep(td) {
  word-break: break-word!important;

}

</style>
