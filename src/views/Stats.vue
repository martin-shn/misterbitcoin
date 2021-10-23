<template>
  <div class="about">
    <h1>Statistics</h1>
    <MarketPriceChart v-if="isLoaded" :data="marketPrice"  />
    <TradeVolumeChart class="trade-chart" v-if="isLoaded" :data="tradeVolume" />
  </div>
</template>

<script>
import bitcoinService from '@/services/bitcoin.service'
import MarketPriceChart from '@/components/MarketPriceChart'
import TradeVolumeChart from '@/components/TradeVolumeChart'

export default {
  name: "Stats",
  data(){
    return{
      marketPrice: {},
      tradeVolume: {},
      isLoaded: false
    }
  },
  async created(){
    this.marketPrice = await bitcoinService.getMarketPrice()
    this.tradeVolume = await bitcoinService.getTradeVolume()
    this.isLoaded=true
  },
  components:{
    MarketPriceChart,
    TradeVolumeChart
    },
 
}
</script>

<style scoped lang="scss">
  h1{
    text-align: center;
  }
  .trade-chart{
    margin-top: 50px;
  }
</style>
