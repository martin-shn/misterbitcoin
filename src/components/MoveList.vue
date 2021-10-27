<template>
  <ul v-if="moves.length" class="move-list clean-list flex column">
    <h2>Your Moves</h2>
    <li class="flex align-center justify-center" v-for="transfer in moves" :key="transfer.id">
      <div>
        <h5>At: {{ new Date(transfer.date).toLocaleString("en-GB") }}</h5>
        <h5 v-if="!contact">To: {{ transfer.to.name }}</h5>
        <h5>
          Amount: {{ transfer.amount }}₿ ({{
            (transfer.amount / bitcoinRate).toFixed(2)
          }}$)
        </h5>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["contact"],
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    moves() {
      const moves = this.loggedInUser.moves.filter((move) => {
        return move.to.id === (this.contact ? this.contact._id : move.to.id);
      });
      if (!this.contact) {
        moves.splice(3);
      }
      return moves;
    },
    bitcoinRate() {
      return this.$store.getters.bitcoinRate;
    },
  },
};
</script>

<style scoped lang="scss">
.move-list {
  width: 100%;
  h5 {
    margin: 5px 0;
  }
  h2 {
    text-align: center;
  }
  & > li {
    color: #333;
    background-color: lightgreen;
    padding: 10px;
    border-radius: 2px;
    border: 1px solid #333;
    margin-bottom: 5px;
    width: 100%;
  }
}
</style>
