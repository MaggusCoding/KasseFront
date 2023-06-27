<template>
    <h3>Select Employee</h3>
    <select v-model="selectedEmployeeId">
      <option v-for="employee in employees" :value="employee.id" :key="employee.id">
        {{ employee.vorname }} {{ employee.nachname }}
      </option>
    </select>
    <h3>Update Employee</h3>
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
      <button type="submit" class="btn btn-primary">Update</button>
    </form>
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
      }
    }
  },
  mounted () {
    this.fetchEmployees()
  },
  methods: {
    fetchEmployees () {
      const endpoint = 'http://localhost:8080/api/mitarbeiter'
      fetch(endpoint)
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
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }

      fetch(endpoint, requestOptions)
        .then(response => {
          if (response.ok) {
            console.log('Employee updated successfully')
          } else {
            console.log('Failed to update employee')
          }
        })
        .catch(error => console.log('error', error))
    }
  }
}
</script>

<style scoped>
</style>
