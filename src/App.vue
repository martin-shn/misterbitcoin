<template>
  <div id="app">
    <app-header @logout="onLogout" :loggedInUser="loggedInUser" />
    <router-view @login="onLogin" />
  </div>
</template>
<script>
import AppHeader from "@/components/Header.vue";
import userService from "@/services/user.service.js";

export default {
  data() {
    return {
      loggedInUser: null,
    };
  },

  methods: {
    onLogout() {
      userService.logout();
      this.loggedInUser = null;
      this.$router.push("/login");
    },
    async onLogin(cred) {
      await userService.login(cred);
      this.loggedInUser = userService.getLoggedInUser();
      this.$router.push("/");
    },
  },

  async created() {
    this.loggedInUser = await userService.getLoggedInUser();
  },

  components: {
    AppHeader,
  },
};
</script>

<style lang="scss">
</style>
