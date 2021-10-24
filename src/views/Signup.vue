<template>
  <form
    class="flex column align-center justify-center"
    @submit.prevent="onSignup"
  >
    <h1>Signup</h1>

    <input v-model="user.name" type="text" placeholder="Full name" />
    <input v-model="user.email" type="email" placeholder="Email" />
    <input v-model="user.password" type="password" placeholder="Password" />
    <button>Signup</button>
  </form>
</template>

<script>
import userService from "@/services/user.service.js";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
        name: "",
      },
    };
  },
  methods: {
    async onSignup() {
      await userService.signup(this.user);
      this.$emit('login',this.user)
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