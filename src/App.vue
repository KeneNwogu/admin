<template>
  <TableLayout v-if="!error"/>
  <div class="error" v-else>
    An error occured while fetching data
  </div>
</template>

<script>
import { onBeforeMount, inject } from "vue"
import TableLayout from "@/components/TableLayout.vue"
import { fetchUsers } from "@/composables/fetchUsers.js"
// import { useStore } from "vuex"

export default {
  name: 'App',
  components: {
    TableLayout
  },
  setup(){
    const store = inject("store")
    let users = null
    let error = null
    onBeforeMount(async () => {
      let { errors, data } = await fetchUsers();
      if(!errors) {
        users = data;
        store.commit('SET_USERS', users)
      } 
      else error = errors
    })
    return {error, users}
  }
}
</script>

<style>
body{
  background: #F2F0F9;
}
#app {
  font-family: Inter, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
