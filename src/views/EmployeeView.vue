
<template>
  <div class="container-fluid bg-light-black">
    <ul class="nav">
      <img src="../assets/icons8-employee-60.png" class="img-fluid rounded-start" alt="...">
      <li class="nav-item" style="margin-left: 1rem;">
        <h1 class="display-6 mt-2">Employees</h1>
      </li>
      <li class="nav-item mt-2" style="margin-top: 2rem; margin-left: 1rem;">
        <employee-create-form></employee-create-form>
      </li>
      <li class="nav-item mt-2" style="margin-top: 2rem; margin-left: 1rem;">
        <employee-update-form></employee-update-form>
      </li>
      <li class="nav-item mt-2" style="margin-top: 2rem; margin-left: 1rem;">
        <employee-delete-form></employee-delete-form>
      </li>
    </ul>
    </div>
  <div class="container-fluid" style="margin-top: 1rem;">
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
</template>

<script>
import EmployeeCreateForm from '@/components/EmployeeCreateForm'
import EmployeeUpdateForm from '@/components/EmployeeUpdateForm'
import EmployeeDeleteForm from '@/components/EmployeeDeleteForm'
// import authHeader from '@/services/auth-header'
export default {
  name: 'EmployeeView',
  components: { EmployeeUpdateForm, EmployeeCreateForm, EmployeeDeleteForm },
  data () {
    return {
      persons: []
    }
  },
  mounted () {
    const myHeaders = new Headers()
    const user = JSON.parse(localStorage.getItem('user'))
    myHeaders.append('Authorization', 'Bearer ' + user.accessToken)
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }
    fetch('https://tresebackend.up.railway.app/api/mitarbeiter', requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(person => {
        this.persons.push(person)
      }))
      .catch(error => console.log('error', error))
  }
}
</script>
<style scoped>
.container-fluid.bg-light-black {
  background-color: rgba(0, 0, 0, 0.1); /* Adjust the opacity and color as needed */
}
</style>
