<template>
  <div>
    <form
      class="flex column align-center justify-center"
      @submit.prevent="onLogin"
    >
      <h1>Login</h1>
      <input v-model="cred.email" type="email" placeholder="Email" />
      <input v-model="cred.password" type="password" placeholder="Password" />
      <button>Login</button>
    </form>
    <router-link to="/signup">Signup</router-link>
  </div>
</template>

<script>
import userService from "@/services/user.service.js";

export default {
  data() {
    return {
      cred: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async onLogin() {
      this.$emit("login", this.cred);

      // this.loggedInUser = await userService.getLoggedInUser();
    },
  },
};
</script>

<style scoped lang="scss">
form {
  gap: 15px;
  input {
    outline: 1px solid #333;
    border: 0;
    padding: 10px;
    height: 33px;
    border-radius: 3px;
  }
  button {
    color: snow;
    background-color: #789;
  }
  button {
    padding: 10px;
    border-radius: 2px;
    cursor: pointer;
    border: 0;
    &:hover {
      background-color: #708090;
    }
  }
}
</style>