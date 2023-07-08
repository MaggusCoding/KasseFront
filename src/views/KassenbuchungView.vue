<template>
  <div class="container-fluid bg-light-black">
    <ul class="nav">
      <img src="../assets/cash.png" class="img-fluid rounded-start cash-icon" alt="...">
      <li class="nav-item" style="margin-left: 1rem;">
        <h1 class="display-6 mt-2">Cash Booking</h1>
      </li>
      <li class="nav-item mt-2" style="margin-top: 2rem; margin-left: 1rem;">
        <kassenbuchung-create-form></kassenbuchung-create-form>
      </li>
      <li class="nav-item mt-2" style="margin-top: 2rem; margin-left: 1rem;">
        <KassenbuchungUpdateFrom></KassenbuchungUpdateFrom>
      </li>
    </ul>
  </div>
  <div class="container text-center">
    <div class="row align-items-start">
      <div class="col">
        <strong>Date</strong>
      </div>
      <div class="col">
        <strong>Team Member</strong>
      </div>
      <div class="col">
        <strong>Booking Amount</strong>
      </div>
      <div class="col">
        <strong>Comment</strong>
      </div>
    </div>
    <div class="row align-items-start" v-for="kassenbuchung in kassenbuchungen" :key="kassenbuchung.id">
      <div class="col">
        {{ formatTimestamp(kassenbuchung.timestamp) }}
      </div>
      <div class="col">
        {{ getMitarbeiterFullName(kassenbuchung.mitarbeiter_id) }}
      </div>
      <div class="col">
        {{ kassenbuchung.buchungsbetrag }}€
      </div>
      <div class="col">
        {{ kassenbuchung.comment }}
      </div>
    </div>
  </div>
</template>

<script>
import KassenbuchungCreateForm from '@/components/KassenbuchungCreateForm'
import KassenbuchungUpdateFrom from '@/components/KassenbuchungUpdateFrom'
// import authHeader from '~/auth-header'
export default {
  name: 'KassenbuchungView',
  components: { KassenbuchungCreateForm, KassenbuchungUpdateFrom },
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
      const user = JSON.parse(localStorage.getItem('user'))
      const myHeaders = new Headers()
      myHeaders.append('Authorization', 'Bearer ' + user.accessToken)
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      }
      const endpoint = 'http://tresebackendinternal.railway.internal/api/kassenbuchung'
      fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.kassenbuchungen = data.sort((a, b) => b.timestamp - a.timestamp)
        })
        .catch((error) => console.log('error', error))
    },
    fetchMitarbeiter () {
      const endpoint = 'http://tresebackendinternal.railway.internal/api/mitarbeiter'
      const user = JSON.parse(localStorage.getItem('user'))
      const myHeaders = new Headers()
      myHeaders.append('Authorization', 'Bearer ' + user.accessToken)
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      }
      fetch(endpoint, requestOptions)
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
.container-fluid.bg-light-black {
  background-color: rgba(0, 0, 0, 0.1); /* Adjust the opacity and color as needed */
}
.cash-icon {
  width: 4rem; /* Adjust the width as needed */
  height: auto;
}
</style>
