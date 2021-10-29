<template>
  <section class="transfer-fund flex column">
    <h4>Transfer coins to {{ user.n }}:</h4>
    <div class="flex align-center">
      <label for="amount">Amount:</label>
      <input id="amount" type="number" ref="input" v-model.number="amount" @click="setFocus('input')"/>
      <button @click="onTransfer">Transfer</button>
    </div>
  </section>
</template>

<script>
import userService from "@/services/user.service.js";
import {showMsg} from "@/services/eventBus.service";

export default {
  data() {
    return {
      amount: 0,
    };
  },
  props: ["user"], // contact
  methods: {
    async onTransfer() {
      try{
        await userService.transferFund(this.amount,{...this.user})
        showMsg(this.amount+' coins transferred to '+this.user.n+' successfully', 'ok')
        this.$store.dispatch({type:'loadLoggedInUser'})
        }catch(err){
          showMsg(err, 'error')
        }
    },
    setFocus(refName){
      eval(`this.$refs.${refName}.select()`)
    }
  },
};
</script>

<style scoped lang="scss">
.transfer-fund{
    background-color: rgb(148, 176, 204);
    padding: 25px 10px;
    margin: 25px 10px 0;
    border-radius: 2px;
    width: calc(100% - 22px);
    max-width: 300px;
    align-items: center;
    box-sizing: border-box;
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
        width: 100%;
        justify-content: center;
        &>input{
          flex-grow: 1;
          width: 0px;
        }
    }
}
</style>
