<template>
  <div id="app">
    <app-header v-if="loggedInUser" @logout="onLogout" :loggedInUser="loggedInUser" />
    <router-view />
    <div :class="`msg ${this.msg.type}`">{{ this.msg.txt }}</div>
  </div>
</template>



<script>
import AppHeader from "@/components/Header.vue";
import eventBus, {showMsg} from "@/services/eventBus.service";

export default {
  data() {
    return {
      msg: {},
    };
  },

  methods: {
    async onLogout() {
      this.$store.dispatch({type: 'logout'});
      showMsg('Logged out. See you soon', 'ok')
      this.$router.push("/login");
    },
    
  },

  async created() {
    this.$store.dispatch({type:'getLoggedInUser'})
    this.$store.dispatch({type:'setContacts'})

    eventBus.$on("msg", (msg) => {
      this.msg = msg;
      setTimeout(() => {
        this.msg = {};
      }, 5000);
    });
  },
  computed:{
    loggedInUser(){
      return this.$store.getters.loggedInUser
    }
  },
  components: {
    AppHeader,
  },
};
</script>

<style scoped lang="scss">
.msg {
  position: fixed;
  bottom: 20px;
  left: -240px;
  max-width: fit-content;
  min-width: fit-content;
  height: 50px;
  display: flex;
  padding: 0 15px;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  border: 1px solid slategray;
  transition: 0.5s;
  color: #333;
  &.ok {
    transition: 0.5s;
    left: 10px;
    background-color: lightgreen;
  }
  &.error {
    transition: 0.5s;
    left: 10px;
    background-color: lightcoral;
  }
}
</style>
