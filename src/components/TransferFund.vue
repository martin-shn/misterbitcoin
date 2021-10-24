<template>
  <section class="transfer-funds flex column">
    <h4>Transfer coins to {{ user.n }}:</h4>
    <div class="flex align-center">
      <label for="amount">Amount:</label>
      <input id="amount" type="number" v-model="amount" />
      <button @click="onTransfer">Transfer</button>
    </div>
  </section>
</template>

<script>
import userService from "@/services/user.service.js";

export default {
  data() {
    return {
      amount: 0,
    };
  },
  props: ["user"],
  methods: {
    onTransfer() {
        userService.transferFund(+this.amount,this.user)
        this.$emit('transfer')
    },
  },
};
</script>

<style scoped lang="scss">
.transfer-funds{
    background-color: rgb(148, 176, 204);
    padding: 25px 10px;
    margin-top: 25px;
    border-radius: 2px;
    h4{
        text-align: center;
        margin-top: 0;
    }
    input{
            height: 36px;
    box-sizing: border-box;
    padding: 5px;
    }
    button{
        &:hover{
            background-color: rgba(240, 128, 128, 0.4)
        }
    }
    &>div{
        height: 33px;
        gap: 10px;
    }
}
</style>