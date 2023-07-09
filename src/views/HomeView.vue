<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <div class="card mb-3 mt-4">
          <div class="row g-0">
            <div class="col-md-12 mb-5 mt-5 d-flex align-items-center justify-content-center">
              <img src="../assets/treslounge.png" class="img-fluid rounded-start" alt="Treslounge Logo">
            </div>
            <div class="col-md-12 mt-5">
              <div class="card-body">
                <h5 class="card-title text-center">What is Treslounge?</h5>
                <p class="card-text">Treslounge is a student bar located on the HTW Campus Treskowallee, founded by students with the aim of providing a vibrant and inclusive space for students to come together and enjoy themselves. We are committed to enhancing the student experience by offering affordable drinks and amenities, ensuring that everyone can make the most out of their time on campus. Join us at Treslounge and let's create unforgettable moments that will enrich your university journey.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card mb-3 mt-4">
          <div class="row g-0">
            <div class="col-md-12 d-flex align-items-center justify-content-center">
                <img src="../assets/location.png" class="img-fluid rounded-start" alt="Treslounge Location">
            </div>
            <div class="col-md-12">
              <div class="card-body">
                <h5 class="card-title text-center">Location</h5>
                <p class="card-text">We are located directly next to the main entrance to Building A. Just enter the glass sliding doors and go left through the metal door.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card mb-3 mt-4">
          <div class="row g-0">
            <div class="col-md-12 d-flex align-items-center justify-content-center">
              <img src="../assets/mail.png" class="img-fluid rounded-start smaller-icon" alt="Treslounge Email">
            </div>
            <div class="col-md-12">
              <div class="card-body">
                <h5 class="card-title text-center">Contact</h5>
                <p class="card-text">Contact us at tresloungeteam@gmail.com. We are searching for new team members! Don't hesitate to write us, and we can set up a meeting over a beer.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {}
}
</script>

<style>
.card {
  height: 100%;
}

.smaller-icon {
  width: 353px;
  height: 353px;
}

.card-title {
  text-align: center;
}
</style>
