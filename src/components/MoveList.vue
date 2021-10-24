<template>
  <ul class="move-list clean-list">
    <h2>Your Moves</h2>
    <li v-for="transfer in moves" :key="transfer.id">
      <div>
        <h5>At:{{ new Date(transfer.date).toLocaleString('en-GB') }}</h5>
        <h5 v-if="!contact">To: {{transfer.to}}</h5>
        <h5>
          Amount:{{ transfer.amount }}₿ ({{ (transfer.amount / bitcoinRate).toFixed(2) }}$)
        </h5>
      </div>
    </li>
  </ul>
</template>

<script>
import bitcoinService from "@/services/bitcoin.service.js";
import userService from "@/services/user.service.js";
import contactService from '@/services/contacts.service'
export default {
  data() {
    return {
      bitcoinRate: 0,
      moves: [],
    };
  },
  async created() {
    this.bitcoinRate = await bitcoinService.getBitcoinRate();
    this.moves = this.loggedInUser
      .moves.filter((move) =>{
          return move.to === (this.contact ? this.contact._id : move.to);
      })
    if (!this.contact) {
        this.moves.splice(3)
        this.moves.forEach(async (move)=>{
            const toUser = await contactService.getById(move.to)
            move.to = toUser[0].n
        })
    }
  },
  methods:{
  },
  props: ["contact", "loggedInUser"],
  watch:{
      loggedInUser:function(){
          const currUser = userService.getLoggedInUser()
          this.moves =  currUser.moves.filter((move) =>
        move.to === (this.contact ? this.contact._id : move.to)
      );
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
        background-color: lightgreen;
        padding: 10px;
        border-radius: 2px;
        border: 1px solid #333;
        margin-bottom: 5px;
    }
}
</style>