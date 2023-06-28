<template>
  <kassenbuchung-create-form></kassenbuchung-create-form>
  <div class="container text-center">
    <div class="row align-items-start" v-for="kassenbuchung in kassenbuchungen" :key="kassenbuchung.mitarbeiter_id">
      <div class="col">
        {{ formatTimestamp(kassenbuchung.timestamp) }}
      </div>
      <div class="col">
        {{ getMitarbeiterFullName(kassenbuchung.mitarbeiter_id) }}
      </div>
      <div class="col">
        {{ kassenbuchung.buchungsbetrag }}€
      </div>
    </div>
  </div>
</template>

<script>
import KassenbuchungCreateForm from '@/components/KassenbuchungCreateForm'

export default {
  name: 'KassenbuchungView',
  components: { KassenbuchungCreateForm },
  data () {
    return {
      kassenbuchungen: [],
      mitarbeiterData: {} // To store Mitarbeiter data
    }
  },
  mounted () {
    this.fetchKassenbuchungen()
    this.fetchMitarbeiter()
  },
  methods: {
    fetchKassenbuchungen () {
      const endpoint = 'http://localhost:8080/api/kassenbuchung'
      fetch(endpoint)
        .then((response) => response.json())
        .then((data) => {
          this.kassenbuchungen = data
        })
        .catch((error) => console.log('error', error))
    },
    fetchMitarbeiter () {
      const endpoint = 'http://localhost:8080/api/mitarbeiter'
      fetch(endpoint)
        .then((response) => response.json())
        .then((data) => {
          // Create a map of mitarbeiter_id to Mitarbeiter object
          this.mitarbeiterData = data.reduce((map, mitarbeiter) => {
            map[mitarbeiter.id] = mitarbeiter
            return map
          }, {})
        })
        .catch((error) => console.log('error', error))
    },
    getMitarbeiterFullName (mitarbeiterId) {
      // Get the vorname from the mitarbeiterData using mitarbeiterId
      const mitarbeiter = this.mitarbeiterData[mitarbeiterId]
      if (mitarbeiter) {
        return mitarbeiter.vorname + ' ' + mitarbeiter.nachname
      }
      return ''
    },
    formatTimestamp (timestamp) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }
      return new Date(timestamp * 1000).toLocaleString('en-GB', options)
    }
  }
}
</script>
<style scoped>

</style>
