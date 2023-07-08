<template>
  <nav class="navbar navbar-expand-lg bg-light-black">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Treslounge</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-link" to="/">Home</router-link>
          <router-link class="nav-link" to="/about">About</router-link>
          <router-link v-if="currentUser" class="nav-link" to="/employee">Employee</router-link>
          <router-link v-if="currentUser" class="nav-link" to="/kassenbuchung">Cash Booking</router-link>
          <router-link v-if="currentUser" class="nav-link" to="/dashboard">Dashboard</router-link>
        </div>
        <div class="navbar-nav ms-auto">
          <router-link v-if="!currentUser" class="nav-link" to="/login">Login</router-link>
          <router-link v-if="currentUser" class="nav-link" to="/register">Sign up</router-link>
          <a class="nav-link" @click.prevent="logOut" v-if="currentUser">
            Logout
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    currentUser () {
      return this.$store.state.auth.user
    }
  },
  methods: {
    logOut () {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.bg-light-black {
  background-color: rgba(0, 0, 0, 0.2); /* Adjust the opacity and color as needed */
}
</style>
