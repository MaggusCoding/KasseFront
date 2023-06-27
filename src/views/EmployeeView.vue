
<template>
  <h1>Unsere Mitarbeiter</h1>
  <div class="container-fluid">
    <div class="row row-cols-1 row row-cols-md-4 g-4">
      <div class="col" v-for="person in persons" :key="person.id">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ person.vorname}} {{ person.nachname }}</h5>
            <p class="card-text">
              {{ person.vorname }} {{ person.nachname }} {{ "studiert" }} {{ person.studiengang }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <employee-create-form></employee-create-form>
</template>

<script>
import EmployeeCreateForm from '@/components/EmployeeCreateForm'
export default {
  name: 'EmployeeView',
  components: { EmployeeCreateForm },
  data () {
    return {
      persons: []
    }
  },
  mounted () {
    const endpoint = 'http://localhost:8080/api/mitarbeiter'
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }
    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(person => {
        this.persons.push(person)
      }))
      .catch(error => console.log('error', error))
  }
}
</script>
