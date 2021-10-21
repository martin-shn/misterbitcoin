<template>
  <div class="home">
    <img alt="Logo" src="../assets/logo.png">
    <!-- <Login /> -->
    <h3>{{userName}}</h3>
    <h4>Balance: {{bitCoinAmount}}</h4>
    <h5>Current BitCoin rate: {{bitCoinRate}}</h5>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data(){
      return{
        userName: 'Dude',
        bitCoinAmount: 100,
        bitCoinRate: 0.001
      }
    },
  components: {
    HelloWorld
  }
}
</script>
