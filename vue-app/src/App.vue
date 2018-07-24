<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item">Home</router-link>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  .navbar {
    background-color: rgb(28, 9, 0);
  }
  .navbar-item {
    color: #fff;
    font-family: 'Lato';
    font-size: 20px;
  }
</style>
