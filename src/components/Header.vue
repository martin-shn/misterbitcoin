<template>
  <header class="nav flex align-center">
    <nav class="menu flex align-center">
      <router-link to="/">Home</router-link>
      <router-link to="/contacts">Contacts</router-link>
      <router-link to="/stats">Statistics</router-link>
    </nav>
    <button v-if="loggedInUser" @click="onLogout">Logout</button>
  </header>
</template>

<script>

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

<style scoped lang="scss">
.nav{
  justify-content: space-between;
  padding: 0 15px;
  .menu{
    &>a{
      margin-right: 10px;
      text-decoration: none;
      color: slategray;
      &:hover{
        text-shadow: 0 0 2px #928383;
      }
    }
  }
  button{
    outline: 1px solid #333;
    background-color: rgb(219, 219, 219);
    &:hover{
      text-shadow: 0 0 2px #333;
    }
  }
}
</style>
