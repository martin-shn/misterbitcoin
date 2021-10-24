<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/contacts">Contacts</router-link> |
    <router-link to="/stats">Statistics</router-link>|
    <button v-if="loggedInUser" @click="onLogout">Logout</button>
  </nav>
</template>

<script>
import userService from "@/services/user.service.js";

export default {
  data() {
    return {
    };
  },
  async created() {
  },

  props:['loggedInUser'],
  methods: {
    onLogout() {
      this.$emit('logout')
    },
  },
};
</script>

<style>
</style>