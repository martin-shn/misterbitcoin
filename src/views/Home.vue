<template>
  <div class="home">
    <img alt="Logo" src="../assets/logo.png" />
    <template v-if="loggedInUser">
      <h3>{{ loggedInUser.name }}</h3>
      <h4>Balance: {{ convertedBalance}}$ = {{ loggedInUser.balance }} ₿</h4>
      <h5>Current BitCoin rate: 1$ = {{ bitcoinRate }}₿</h5>
      <move-list :loggedInUser="loggedInUser" />
    </template>
  </div>
</template>

<script>
// @ is an alias to /src
import MoveList from '@/components/MoveList';

export default {
  name: 'Home',
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    convertedBalance() {
      return (this.loggedInUser.balance / this.bitcoinRate).toLocaleString('en-GB', { maximumFractionDigits: 2 });
    },
    bitcoinRate() {
      return this.$store.getters.bitcoinRate;
    },
  },
  components: {
    MoveList,
  },
};
</script>
