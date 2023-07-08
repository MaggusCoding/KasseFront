<template>
  <div>
    <button class="btn btn-success sticky-button" type="button" data-bs-toggle="offcanvas" data-bs-target="#kassenbuchung" aria-controls="kassenbuchung">
      Create new cash booking
      <i class="bi bi-person-plus-fill"> </i>
    </button>
    <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="kassenbuchung" aria-labelledby="offcanvasWithBothOptionsLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Create new cash booking</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <form @submit.prevent="createKassenbuchung">
        <div class="offcanvas-body">
          <div class="mb-3">
            <label for="Team member" class="form-label">Team member</label>
            <div class="form-group">
              <div class="dropdown">
                <label for="selectEmployees" class="form-label">Select employee</label>
                <select v-model="selectedEmployeeId" class="form-select" required>
                  <option disabled value="">Please select an employee</option>
                  <option v-for="employee in employees" :value="employee.id" :key="employee.id">
                    {{ employee.vorname }} {{ employee.nachname }}
                  </option>
                </select>
                <div class="dropdown-arrow"></div>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="bookingamount" class="form-label">Booking amount (€)</label>
            <input type="number" class="form-control" id="bookingamount" placeholder="Booking amount" v-model="buchungsbetrag" required/>
          </div>
          <div class="mb-3">
            <label for="comment" class="form-label">Comment</label>
            <input type="text" class="form-control" id="bookingamount" placeholder="Comment" v-model="comment" required/>
          </div>
          <div class="m-auto">
            <button type="submit" class="btn btn-primary mt-3">Create</button>
          </div>
          <div v-if="createSuccess" class="alert alert-success mt-3" role="alert">
            Cash booking created successfully!
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KassenbuchungCreateForm',
  data () {
    return {
      employees: [], // Array of employees fetched from the backend
      selectedEmployeeId: null, // ID of the selected employee
      buchungsbetrag: null,
      createSuccess: false, // Flag to track create success
      comment: ''
    }
  },
  mounted () {
    this.fetchEmployees()
  },
  methods: {
    fetchEmployees () {
      const myHeaders = new Headers()
      const user = JSON.parse(localStorage.getItem('user'))
      myHeaders.append('Authorization', 'Bearer ' + user.accessToken)
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      }
      const endpoint = 'http://tresebackendinternal.railway.internal/api/mitarbeiter'
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(data => {
          this.employees = data
        })
        .catch(error => console.log('error', error))
    },
    createKassenbuchung () {
      if (!this.selectedEmployeeId || !this.buchungsbetrag) {
        // Check if all fields are populated
        console.log('Please fill in all required fields.')
        return
      }
      const endpoint = 'http://tresebackendinternal.railway.internal/api/kassenbuchung'
      const payload = {
        mitarbeiter_id: this.selectedEmployeeId,
        buchungsbetrag: this.buchungsbetrag,
        comment: this.comment
      }
      const headers = new Headers()
      const user = JSON.parse(localStorage.getItem('user'))
      headers.append('Authorization', 'Bearer ' + user.accessToken)
      headers.append('Content-Type', 'application/json')
      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      }
      fetch(endpoint, requestOptions)
        .then(response => {
          if (response.ok) {
            this.createSuccess = true // Set create success flag
            console.log('Cash booking created successfully')
            this.$router.go()
            // Perform any necessary actions after successful creation
          } else {
            console.log('Failed to create cash booking')
            // Handle the error scenario
          }
        })
        .catch(error => console.log('Error occurred while creating cash booking', error))
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
