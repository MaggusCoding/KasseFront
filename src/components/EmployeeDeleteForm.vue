<template>
  <button class="btn btn-success sticky-button" type="button" data-bs-toggle="offcanvas" data-bs-target="#employeeDelete" aria-controls="employeeDelete">Delete existing employee
    <i class="bi bi-person-plus-fill"> </i>
  </button>
  <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="employeeDelete" aria-labelledby="offcanvasScrollingLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Delete existing employee</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div class="form-group">
        <div class="dropdown">
          <label for="selectEmployees" class="form-label">Select employee</label>
          <select v-model="selectedEmployeeId" class="form-select">
            <option v-for="employee in employees" :value="employee.id" :key="employee.id">
              {{ employee.vorname }} {{ employee.nachname }}
            </option>
          </select>
          <div class="dropdown-arrow"></div>
          <form @submit.prevent="deleteEmployee">
            <button type="submit" class="btn btn-primary mt-3">Confirm Deletion</button>
          </form>
        </div>
        <div v-if="createSuccess" class="alert alert-danger mt-3" role="alert">
          {{error}}
        </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'EmployeeUpdateForm',
  data () {
    return {
      employees: [], // Array of employees fetched from the backend
      selectedEmployeeId: null, // ID of the selected employee
      updatedEmployee: {
        // Object to hold the updated employee data
        vorname: '',
        nachname: '',
        studiengang: ''
      },
      error: null, // Error message for deletion failure
      createSuccess: null
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
      const endpoint = 'http://localhost:8080/api/mitarbeiter'
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(data => {
          this.employees = data
        })
        .catch(error => console.log('error', error))
    },
    deleteEmployee () {
      if (!this.selectedEmployeeId) {
        return // No employee selected, do nothing
      }
      const headers = new Headers()
      const user = JSON.parse(localStorage.getItem('user'))
      headers.append('Authorization', 'Bearer ' + user.accessToken)
      headers.append('Content-Type', 'application/json')
      const endpoint = `http://localhost:8080/api/mitarbeiter/${this.selectedEmployeeId}`
      const payload = {
        id: this.selectedEmployeeId
      }
      const requestOptions = {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify(payload)
      }

      fetch(endpoint, requestOptions)
        .then(response => {
          if (response.ok) {
            console.log('Employee deleted successfully')
            this.error = 'Team member deleted successfully.'
            this.$router.go()
          } else {
            console.log('Failed to delete employee')
            this.error =
              'Team member already created a cash booking, deletion not possible.'
            this.createSuccess = true
          }
        })
        .catch(error => {
          console.log('error', error)
          this.error = 'An error occurred during deletion.'
        })
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
