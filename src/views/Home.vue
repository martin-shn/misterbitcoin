<template>
  <div class="home">
    <img alt="Logo" src="../assets/logo.png" />
    <!-- <Login /> -->
    <h3>{{ userName }}</h3>
    <h4>Balance: {{ bitCoinAmount }} ₿</h4>
    <h5>Current BitCoin rate: {{ bitCoinRate }}</h5>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import bitcoinService from "@/services/bitcoin.service.js";
import contactService from "@/services/contacts.service.js";
export default {
  name: "Home",
  async created() {
      this.bitCoinRate = await bitcoinService.getBitcoinRate();
      this.contacts = await contactService.loadContacts();
  },
  data() {
    return {
      userName: "Dude",
      bitCoinAmount: 100,
      bitCoinRate: 0,
      contacts: [],
    };
  },
  components: {
    HelloWorld,
  },
};
</script>
