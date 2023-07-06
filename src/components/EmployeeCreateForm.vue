<template>
  <div>
    <button class="btn btn-success sticky-button" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Create new employee
      <i class="bi bi-person-plus-fill"> </i>
    </button>
    <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Create new employee</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <form @submit.prevent="createEmployee">
        <div class="offcanvas-body">
          <div class="mb-3">
            <label for="vorname" class="form-label">Vorname</label>
            <input type="text" class="form-control" id="vorname" placeholder="Vorname" v-model="vorname" required/>
          </div>
          <div class="mb-3">
            <label for="nachname" class="form-label">Nachname</label>
            <input type="text" class="form-control" id="nachname" placeholder="Nachname" v-model="nachname" required/>
          </div>
          <div class="mb-3">
            <label for="studiengang" class="form-label">Studiengang</label>
            <input type="text" class="form-control" id="studiengang" placeholder="Studiengang" v-model="studiengang"
                   required/>
          </div>
          <div class="m-auto">
            <button type="submit" class="btn btn-primary mt-3">Create</button>
          </div>
          <div v-if="createSuccess" class="alert alert-success mt-3" role="alert">
            Employee created successfully!
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmployeeCreateForm',
  data () {
    return {
      vorname: '',
      nachname: '',
      studiengang: '',
      createSuccess: false // Flag to track create success
    }
  },
  methods: {
    createEmployee () {
      // Check if all required fields are filled
      if (!this.vorname || !this.nachname || !this.studiengang) {
        // Handle the validation error, e.g., display an error message
        console.log('Please fill in all required fields.')
        return
      }

      const endpoint = 'http://localhost:8080/api/mitarbeiter'
      const headers = new Headers()
      const user = JSON.parse(localStorage.getItem('user'))
      headers.append('Authorization', 'Bearer ' + user.accessToken)
      headers.append('Content-Type', 'application/json')

      const payload = JSON.stringify({
        vorname: this.vorname,
        nachname: this.nachname,
        studiengang: this.studiengang
      })

      const requestOptions = {
        method: 'POST',
        redirect: 'follow',
        body: payload,
        headers: headers
      }

      fetch(endpoint, requestOptions)
        .then(response => {
          if (response.ok) {
            this.createSuccess = true // Set create success flag
            console.log('Employee created successfully')
            this.$router.go()
          } else {
            console.log('Failed to create employee')
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
.btn{
  background-color: darkgreen;
}
</style>
