<template>
  <ul v-if="moves.length" class="move-list clean-list">
    <h2>Your Moves</h2>
    <li v-for="transfer in moves" :key="transfer.id">
      <div>
        <h5>At: {{ new Date(transfer.date).toLocaleString('en-GB') }}</h5>
        <h5 v-if="!contact">To: {{transfer.to.name}}</h5>
        <h5>
          Amount: {{ transfer.amount }}₿ ({{ (transfer.amount / bitcoinRate).toFixed(2) }}$)
        </h5>
      </div>
    </li>
  </ul>
</template>

<script>
import bitcoinService from "@/services/bitcoin.service.js";

export default {
  data() {
    return {
      bitcoinRate: 0,
      moves: [],
    };
  },
  async mounted() {
    this.bitcoinRate = await bitcoinService.getBitcoinRate();
    this.moves = this.loggedInUser
      .moves.filter((move) =>{
          return move.to.id === (this.contact ? this.contact._id : move.to.id);
      })
    if (!this.contact) {
        this.moves.splice(3)
    }
  },
  methods:{
  },
  props: ["contact"],
  computed:{
    loggedInUser(){
      return this.$store.getters.loggedInUser
    }
  },
  watch:{
      loggedInUser:function(){
          this.moves = this.loggedInUser?this.loggedInUser.moves.filter((move) =>
          move.to.id === (this.contact ? this.contact._id : move.to.id)
      ):[];
      }
  }
};
</script>

<style scoped lang="scss">
.move-list{
    width: 346px;
    h5{
        margin: 5px 0;
    }
    h2{
        text-align: center;
    }
    &>li{
        color: #333;
        background-color: lightgreen;
        padding: 10px;
        border-radius: 2px;
        border: 1px solid #333;
        margin-bottom: 5px;
    }
}
</style>
