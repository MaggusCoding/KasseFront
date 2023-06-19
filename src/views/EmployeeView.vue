
<template>
  <h1>Unsere Mitarbeiter</h1>
  <div class="container-fluid">
    <div class="row row-cols-1 row row-cols-md-4 g-4">
      <div class="col" v-for="person in persons" :key="person.id">
        <div class="card h-100">
          <img :src="getAvatar(person)" class="card-img-top" :alt="person.firstname + ' ' + person.lastname">
          <div class="card-body">
            <h5 class="card-title">{{ person.firstname }} {{ person.lastname }}</h5>
            <p class="card-text">
              {{ person.firstname }} {{ person.lastname }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmployeeView',
  data () {
    return {
      persons: [
        {
          id: 1,
          firstname: 'Maggus',
          lastname: 'Meeresdublone',
          gender: 'MALE'
        },
        {
          id: 2,
          firstname: 'Merv',
          lastname: 'van Nerv',
          gender: 'FEMALE'
        }
      ]
    }
  },
  methods: {
    getAvatar (person) {
      if (person.gender === 'MALE') {
        return require('../assets/Mann.png')
      } else if (person.gender === 'FEMALE') {
        return require('../assets/Frau.png')
      }
    }
  }
}
</script>
