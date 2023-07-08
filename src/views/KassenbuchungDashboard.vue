<template>
  <div>
    <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  el: '#appl',
  data () {
    return {
      map: new Map(),
      options: {
        chart: {
          id: 'vuechart-example'
        }
      },
      series: [{
        name: 'series-1',
        data: []
      }]
    }
  },
  mounted () {
    this.fetchMonthlyRevenue()
  },
  methods: {
    fetchMonthlyRevenue () {
      const user = JSON.parse(localStorage.getItem('user'))
      const myHeaders = new Headers()
      myHeaders.append('Authorization', 'Bearer ' + user.accessToken)
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      }
      const endpoint = 'http://tresebackendinternal.railway.internal/api/kassenbuchung/monthly'
      fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.map = data
          console.dir(this.map)
          this.updateChartData()
        })
        .catch((error) => console.log('error', error))
    },
    updateChartData () {
      const seriesData = []
      // Iterate over the map entries and populate the seriesData array
      for (const [date, value] of Object.entries(this.map)) {
        // Extract the month and year from the date
        const [year, month] = date.split('-')
        // Format the month as two digits (e.g., "07")
        const formattedMonth = month.padStart(2, '0')
        // Format the year as desired (e.g., "2023")
        const formattedYear = year
        // Format the date as "MM.YYYY"
        const formattedDate = `${formattedMonth}.${formattedYear}`
        // Create an object with 'x' and 'y' properties
        const dataObject = {
          x: formattedDate,
          y: value
        }
        // Push the data object to the seriesData array
        seriesData.push(dataObject)
      }

      // Update the chart series with the new data
      this.series[0].data = seriesData
    }
  }
}
</script>

<style>

</style>
