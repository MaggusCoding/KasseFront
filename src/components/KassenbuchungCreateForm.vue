<template>
  <button class="btn btn-success sticky-button" type="button" data-bs-toggle="offcanvas" data-bs-target="#kassenbuchung" aria-controls="kassenbuchung">Create new cash booking
    <i class="bi bi-person-plus-fill"> </i>
  </button>
  <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="kassenbuchung" aria-labelledby="offcanvasWithBothOptionsLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Create new employee</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <form>
    <div class="offcanvas-body">
        <div class="mb-3">
          <label for="Team member" class="form-label">Team member</label>
          <div class="form-group">
            <div class="dropdown">
              <label for="selectEmployees" class="form-label">Select employee</label>
              <select v-model="selectedEmployeeId" class="form-control dropdown-select">
                <option v-for="employee in employees" :value="employee.id" :key="employee.id">
                  {{ employee.vorname }} {{ employee.nachname }}
                </option>
              </select>
              <div class="dropdown-arrow"></div>
        </div>
        <div class="mb-3">
          <label for="bookingamount" class="form-label">Booking amount (€)</label>
          <input type="text" class="form-control" id="bookingamount" placeholder="Booking amount" v-model="buchungsbetrag" required/>
        </div>
        <div class="m-auto">
          <button type="button" @click="createKassenbuchung" class="btn btn-primary mt-3">Create</button>
        </div>
    </div>
        </div>
    </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'KassenbuchungCreateForm',
  data () {
    return {
      employees: [], // Array of employees fetched from the backend
      selectedEmployeeId: null, // ID of the selected employee
      buchungsbetrag: null
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
    createKassenbuchung () {
      if (!this.selectedEmployeeId) {
        return // No employee selected, do nothing
      }
      const endpoint = 'http://localhost:8080/api/kassenbuchung'
      const payload = {
        mitarbeiter_id: this.selectedEmployeeId,
        buchungsbetrag: this.buchungsbetrag
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
      fetch(endpoint, requestOptions)
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
.btn{
  background-color: darkgreen;
}
</style>
