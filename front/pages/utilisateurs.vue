<template>
<div>
  {{users}}
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "utilisateurs",
  mounted() {
    this.getUsers();
  },
  computed: {
    ...mapGetters({
      users: "users/users",
    }),
  },
  methods: {
    ...mapActions({
      getUsers: 'users/getUsers',
    }),
  }
}

// todo: page to manage users
</script>

<style scoped>

</style>
