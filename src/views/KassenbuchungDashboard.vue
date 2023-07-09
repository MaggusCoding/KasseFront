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
      const endpoint = 'https://tresebackend.up.railway.app/api/kassenbuchung/monthly'
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

      // Get the current month and year
      const currentDate = new Date()
      const currentYear = currentDate.getFullYear()
      const currentMonth = currentDate.getMonth() // Adding 1 since getMonth() returns zero-based index

      // Iterate over the map entries and populate the seriesData array
      for (const [date, value] of Object.entries(this.map)) {
        // Extract the month and year from the date
        const [year, month] = date.split('-')

        // Calculate the month and year to display
        const displayYear = parseInt(year)
        let displayMonth = parseInt(month)

        // Adjust the display month and year if necessary
        if (displayYear === currentYear && displayMonth < currentMonth) {
          // If the month is in the past but within the same year, increment the display month
          displayMonth++
        } else if (displayYear < currentYear) {
          // If the year is in the past, set the display month to the current month
          displayMonth = currentMonth
        }

        // Format the month and year as desired (e.g., "07.2023")
        const formattedMonth = displayMonth.toString().padStart(2, '0')
        const formattedYear = displayYear.toString()

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
