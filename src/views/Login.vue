<template>
  <div class="login flex column align-center">
    <form
      class="flex column align-center justify-center"
      @submit.prevent="onLogin"
    >
      <h1>Login</h1>
      <input v-model="cred.email" type="email" placeholder="Email" />
      <input v-model="cred.password" type="password" placeholder="Password" />
      <button>Login</button>
      <div class="msg">{{msg}}</div>
    </form>
    <router-link to="/signup">Signup</router-link>
  </div>
</template>

<script>

export default {
  created(){
  },
  data() {
    return {
      msg:'',
      cred: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async onLogin() {
      if (!this.cred.email || !this.cred.password) return
      await this.$store.dispatch({ type: 'login', cred:this.cred });
      if (this.$store.getters.loggedInUser) this.$router.push("/")
      else {
        this.msg = 'Wrong username and password. Please try again'
        setTimeout(()=>{this.msg=''},5000)
      }
    },
  },
};
</script>

<style scoped lang="scss">
.msg{
  min-height: 1.3rem;
  color: lightcoral;
  font-weight: 600;
}
.login{
  gap:15px;
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
