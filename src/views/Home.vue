<template>
  <div class="home">
    <img alt="Logo" src="../assets/logo.png" />
    <!-- <Login /> -->
    <h3>{{ userName }}</h3>
    <h4>Balance: {{ bitCoinAmount }}</h4>
    <h5>Current BitCoin rate: {{ bitCoinRate }}</h5>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { httpService } from "@/services/http.service.js";
import contactService from "@/services/contacts.service.js";
export default {
  name: "Home",
  async created() {
    let DB = localStorage.getItem("BTDB");
    if (DB) DB = JSON.parse(DB);
    if (!DB?.rate) {
      const rate = await httpService.get(
        "https://blockchain.info/tobtc?currency=USD&value=1"
      );
      this.bitCoinRate = rate;
      const contacts = await contactService.query();
      this.contacts = contacts;
      localStorage.setItem("BTDB", JSON.stringify({ rate, contacts }));
    }
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
