<template>
  <div>
    <button class="btn btn-success sticky-button" type="button" data-bs-toggle="offcanvas" data-bs-target="#employeeUpdate" aria-controls="employeeUpdate">
      Update existing employee
      <i class="bi bi-person-plus-fill"></i>
    </button>
    <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="employeeUpdate" aria-labelledby="offcanvasScrollingLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Update existing employee</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div class="form-group">
          <label for="selectEmployeesUpdate" class="form-label"><strong>Select employee</strong></label>
          <div class="dropdown">
            <select v-model="selectedEmployeeId" class="form-select">
              <option v-for="employee in employees" :value="employee.id" :key="employee.id">
                {{ employee.vorname }} {{ employee.nachname }}
              </option>
            </select>
            <div class="dropdown-arrow"></div>
          </div>
        </div>
        <label for="updateEmployees" class="form-label mt-3" id="updateForm"><strong>New credentials employee</strong></label>
        <form @submit.prevent="updateEmployee">
          <div class="mb-3">
            <label for="vorname" class="form-label">Vorname</label>
            <input type="text" class="form-control" id="vorname" v-model="updatedEmployee.vorname" required />
          </div>
          <div class="mb-3">
            <label for="nachname" class="form-label">Nachname</label>
            <input type="text" class="form-control" id="nachname" v-model="updatedEmployee.nachname" required />
          </div>
          <div class="mb-3">
            <label for="studiengang" class="form-label">Studiengang</label>
            <input
              type="text"
              class="form-control"
              id="studiengang"
              v-model="updatedEmployee.studiengang"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary mt-3">Update</button>
        </form>
        <div v-if="updateSuccess" class="alert alert-success mt-3" role="alert">
          Employee updated successfully!
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
      updatedEmployee: { // Object to hold the updated employee data
        vorname: '',
        nachname: '',
        studiengang: ''
      },
      updateSuccess: false // Flag to track update success
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
    updateEmployee () {
      if (!this.selectedEmployeeId) {
        return // No employee selected, do nothing
      }

      const endpoint = `http://localhost:8080/api/mitarbeiter/${this.selectedEmployeeId}`
      const payload = {
        vorname: this.updatedEmployee.vorname,
        nachname: this.updatedEmployee.nachname,
        studiengang: this.updatedEmployee.studiengang
      }
      const headers = new Headers()
      const user = JSON.parse(localStorage.getItem('user'))
      headers.append('Authorization', 'Bearer ' + user.accessToken)
      headers.append('Content-Type', 'application/json')
      const requestOptions = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(payload)
      }

      fetch(endpoint, requestOptions)
        .then(response => {
          if (response.ok) {
            this.updateSuccess = true // Set update success flag
            console.log('Employee updated successfully')
            // Perform any necessary actions after successful update
          } else {
            console.log('Failed to update employee')
            // Handle the error scenario
          }
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
