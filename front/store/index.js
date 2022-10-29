// avoid errors while manipulate v-data table, because vuex will always keep a reference to its state values, and
// it will provoke vuex error ( do not mutate state outside mutations ) while changing v data table items
export const strict = false
