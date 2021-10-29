<template>
  <ul v-if="moves.length" class="move-list clean-list flex column">
    <h2 @click="toggleMoves" :title="`Click to ${isOpen?'collapse':'Expand'}`">
      Your Moves <span :class="isOpen ? 'open' : ''"></span>
    </h2>
    <template v-if="isOpen">
      <li
        class="flex align-center justify-center"
        v-for="transfer in moves"
        :key="transfer.id"
      >
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
    </template>
  </ul>
</template>

<script>
export default {
  props: ["contact"],
  data() {
    return {
      isOpen: false,
    };
  },
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
  methods: {
    toggleMoves() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped lang="scss">
@font-face {
  font-family: "FA-Solid";
  src: url("../assets/fonts/FA/fa-solid-900.ttf");
}

.move-list {
  width: 100%;
  max-width: 300px;
  box-sizing: border-box;
  h5 {
    margin: 5px 0;
  }
  h2 {
    text-align: center;
    cursor: pointer;
    span {
      font-family: "FA-Solid";
      margin-left: 15px;
      &:before {
        content: "\f0da";
      }
      &.open:before {
        content: "\f0d7";
      }
    }
      transition: .2s;
    &:hover{
      color: darken($color: #fff, $amount: 40%);
      transition: .2s;
      span{
        color: darken($color: #fff, $amount: 30%);
        &:hover{
          color: darken($color: #fff, $amount: 60%);
        }
      }
    }
  }
  & > li {
    color: #333;
    background-color: lightgreen;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid #333;
    margin: 0 10px 5px;
  }
}
</style>
