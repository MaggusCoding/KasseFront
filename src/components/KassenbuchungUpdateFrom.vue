<template>
  <div>
    <button class="btn btn-success sticky-button" type="button" data-bs-toggle="offcanvas" data-bs-target="#kassenbuchungUpdate" aria-controls="kassenbuchungUpdate">
      Update Cash booking
      <i class="bi bi-person-plus-fill"> </i>
    </button>
    <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="kassenbuchungUpdate" aria-labelledby="offcanvasWithBothOptionsLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Update Kassenbuchung</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <form>
        <div class="offcanvas-body">
          <div class="mb-3" style="margin-top: 2rem; margin-left: 1rem;">
            <select v-model="selectedKassenbuchung" class="form-select">
              <option disabled value="">Select Kassenbuchung</option>
              <option v-for="kassenbuchung in kassenbuchungen" :value="kassenbuchung.id" :key="kassenbuchung.id">
                {{ formatTimestamp(kassenbuchung.timestamp) }} - {{ getMitarbeiterFullName(kassenbuchung.mitarbeiter_id) }} - {{kassenbuchung.buchungsbetrag}}€
              </option>
            </select>
          </div>
          <div class="container text-center">
            <form v-if="selectedKassenbuchung" @submit.prevent="updateKassenbuchung">
              <div class="row align-items-start">
                <div class="col">
                  <label for="buchungsbetrag">Buchungsbetrag (€):</label>
                  <input type="number" id="buchungsbetrag" v-model="updatedKassenbuchung.buchungsbetrag" required>
                </div>
              </div>
              <div class="row align-items-start">
                <div class="col">
                  <button type="submit" class="btn btn-primary">Update Kassenbuchung</button>
                </div>
              </div>
            </form>
          </div>
          <div v-if="updateSuccess" class="alert alert-success mt-3" role="alert">
            Kassenbuchung updated successfully!
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KassenbuchungView',
  data () {
    return {
      kassenbuchungen: [],
      mitarbeiterData: {},
      selectedKassenbuchung: null,
      updatedKassenbuchung: {
        buchungsbetrag: null
      },
      employees: [],
      selectedEmployeeId: null,
      bookingAmount: null,
      updateSuccess: false // Flag to track update success
    }
  },
  mounted () {
    this.fetchKassenbuchungen()
    this.fetchMitarbeiter()
    this.fetchEmployees()
  },
  methods: {
    fetchKassenbuchungen () {
      const endpoint = 'https://tresebackend.up.railway.app/api/kassenbuchung'
      const myHeaders = new Headers()
      const user = JSON.parse(localStorage.getItem('user'))
      myHeaders.append('Authorization', 'Bearer ' + user.accessToken)
      myHeaders.append('Content-Type', 'application/json')
      fetch(endpoint, {
        method: 'GET',
        headers: myHeaders
      })
        .then(response => response.json())
        .then(data => {
          this.kassenbuchungen = data
        })
        .catch(error => console.log('error', error))
    },
    fetchMitarbeiter () {
      const endpoint = 'https://tresebackend.up.railway.app/api/mitarbeiter'
      const myHeaders = new Headers()
      const user = JSON.parse(localStorage.getItem('user'))
      myHeaders.append('Authorization', 'Bearer ' + user.accessToken)
      myHeaders.append('Content-Type', 'application/json')
      fetch(endpoint, {
        method: 'GET',
        headers: myHeaders
      })
        .then(response => response.json())
        .then(data => {
          this.mitarbeiterData = data.reduce((map, mitarbeiter) => {
            map[mitarbeiter.id] = mitarbeiter
            return map
          }, {})
        })
        .catch(error => console.log('error', error))
    },
    getMitarbeiterFullName (mitarbeiterId) {
      const mitarbeiter = this.mitarbeiterData[mitarbeiterId]
      if (mitarbeiter) {
        return mitarbeiter.vorname + ' ' + mitarbeiter.nachname
      }
      return ''
    },
    formatTimestamp (timestamp) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }
      return new Date(timestamp * 1000).toLocaleString('en-GB', options)
    },
    updateKassenbuchung () {
      const myHeaders = new Headers()
      const user = JSON.parse(localStorage.getItem('user'))
      myHeaders.append('Authorization', 'Bearer ' + user.accessToken)
      myHeaders.append('Content-Type', 'application/json')
      const endpoint = `https://tresebackend.up.railway.app/api/kassenbuchung/${this.selectedKassenbuchung}`
      const payload = {
        buchungsbetrag: this.updatedKassenbuchung.buchungsbetrag
      }
      fetch(endpoint, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(payload)
      })
        .then(response => {
          if (response.ok) {
            this.updateSuccess = true // Set update success flag
            console.log('Kassenbuchung updated successfully')
            // Perform any necessary actions after successful update
          } else {
            console.log('Failed to update Kassenbuchung')
            // Handle the error scenario
          }
        })
        .catch(error => console.log('Error occurred while updating Kassenbuchung', error))
    },
    fetchEmployees () {
      const myHeaders = new Headers()
      const user = JSON.parse(localStorage.getItem('user'))
      myHeaders.append('Authorization', 'Bearer ' + user.accessToken)
      myHeaders.append('Content-Type', 'application/json')
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      }
      const endpoint = 'https://tresebackend.up.railway.app/api/mitarbeiter'
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(data => {
          this.employees = data
        })
        .catch(error => console.log('error', error))
    }
  }
}
</script>

<style scoped>

.sticky-button {
  padding: 12px 10px;
  border-radius: 30px;
}
.btn {
  background-color: darkgreen;
}
</style>
