<template>
  <div id="app">
    <nav class="navbar is-info" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <!-- <a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
    </a> -->
    <a class="navbar-item" href="/">
      <span class="icon-text has-text-warning">
        <span><h1 class="title is-4 has-text-warning">CARENT</h1></span>
        <span class="icon is-medium	">
          <font-awesome-icon icon="fa-solid fa-car-side" />
        </span>
      </span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      
      <a class="navbar-item">
        <router-link to="/order" class="has-text-white">
        <span>Order</span>
        </router-link>
      </a>

      <a class="navbar-item">
        <router-link to="/cars/getAllCars" class="has-text-white">
          <span>Our Car</span>
        </router-link>
      </a>

      <a class="navbar-item">
        <router-link to="/payments/getAllPayments" class="has-text-white">
          <span>Payment</span>
        </router-link>
      </a>

      <a class="navbar-item">
        <router-link to="/payments/addPayment" class="has-text-white">
          <span>Inform Evidence</span>
        </router-link>
      </a>

    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">
            Log in
          </a>
        </div>
      </div>
    </div>
  </div>
  </nav>

    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  // components: {
  //   OurCar
  // }
}
</script>


