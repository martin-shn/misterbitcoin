<script>
  import { Line } from 'vue-chartjs'

  export default {
    props:["data"],
    extends: Line,
    created(){
    },
    data () {
      return {
        chartData: {
          labels: this.data.values.map(value=>(new Date(value.x*1000)).toLocaleDateString('en-GB')),
          datasets: [
            {
              label: this.data.name,
              data: this.data.values.map(value=>value.y),
              fill: false,
              borderColor: '#2554FF',
              backgroundColor: '#2554FF',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  }
</script>
