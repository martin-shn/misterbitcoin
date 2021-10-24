<template>
  <div class="home">
    <img alt="Logo" src="../assets/logo.png" />
    <template v-if="loggedInUser">
      <h3>{{ loggedInUser.name }}</h3>
      <h4>Balance: {{ loggedInUser.balance }} ₿</h4>
      <h5>Current BitCoin rate: {{ bitCoinRate }}</h5>
      <move-list :loggedInUser="loggedInUser" />
    </template>
  </div>
</template>

<script>
// @ is an alias to /src
import bitcoinService from "@/services/bitcoin.service.js";
import contactService from "@/services/contacts.service.js";
import userService from "@/services/user.service.js";
import MoveList from "@/components/MoveList"

export default {
  name: "Home",
  async created() {
    this.bitCoinRate = await bitcoinService.getBitcoinRate();
    this.contacts = await contactService.loadContacts();
    this.loggedInUser = await userService.getLoggedInUser();
  },
  data() {
    return {
      bitCoinRate: 0,
      contacts: [],
      loggedInUser: null,
    };
  },
  components:{
    MoveList
  }
};
</script>
