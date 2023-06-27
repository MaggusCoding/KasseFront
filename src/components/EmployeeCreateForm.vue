<template>
  <form>
  <button class="btn btn-success sticky-button" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Create new Employee
    <i class="bi bi-person-plus-fill"> </i>
  </button>
  <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Create new Employee</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div class="mb-3">
        <label for="vorname" class="form-label">Vorname</label>
        <input type="text" class="form-control" id="vorname" placeholder="Vorname" v-model="vorname" required />
      </div>
      <div class="mb-3">
        <label for="nachname" class="form-label">Nachname</label>
        <input type="text" class="form-control" id="nachname" placeholder="Nachname" v-model="nachname" required />
      </div>
      <div class="mb-3">
        <label for="studiengang" class="form-label">Studiengang</label>
        <input type="text" class="form-control" id="studiengang" placeholder="Studiengang" v-model="studiengang" required />
      </div>
      <div class="m-auto">
        <button type="submit" @click="createEmployee" class="btn btn-primary">Create</button>
      </div>
    </div>
  </div>
  </form>
</template>

<script>
export default {
  name: 'EmployeeCreateForm',
  data () {
    return {
      vorname: '',
      nachname: '',
      studiengang: ''
    }
  },
  methods: {
    createEmployee () {
      const endpoint = 'http://localhost:8080/api/mitarbeiter'
      const headers = new Headers()
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
        .catch(error => console.log('error', error))
    }
  }
}
</script>

<style scoped>
.sticky-button{
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 15px;
  border-radius: 30px;
}
</style>
