<template>
<div class="signup flex column align-center">
  <form
    class="flex column align-center justify-center"
    @submit.prevent="onSignup"
  >
    <h1>Signup</h1>

    <input v-model.trim="user.name" type="text" placeholder="Full name" />
    <input v-model.trim="user.email" type="email" placeholder="Email" />
    <input v-model.trim="user.password" type="password" placeholder="Password" />
    <button>Signup</button>
    <div class="msg">{{msg}}</div>
  </form>
  <router-link to='/login'>Back to Login page</router-link>
</div>
</template>

<script>
import userService from "@/services/user.service.js";

export default {
  data() {
    return {
      msg:"",
      user: {
        email: "",
        password: "",
        name: "",
      },
    };
  },
  methods: {
    async onSignup() {
      if (!this.user.email || !this.user.password || !this.user.name) {
        this.msg='All fields are mandatory. Please try again'
        setTimeout(()=>{this.msg=''},5000)
        return
        }
      await userService.signup(this.user);
      await this.$store.dispatch({ type: 'login', cred:this.user });
      if (this.$store.getters.loggedInUser) this.$router.push("/")
    },
  },
};
</script>

<style scoped lang="scss">
.msg{
  color: lightcoral;
  font-weight: 600;
  min-height: 1.3rem;
}
.signup{
  gap: 15px;
  a{
    color: snow;
    &:hover{
      font-weight: 600;
    }
  }
}
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
