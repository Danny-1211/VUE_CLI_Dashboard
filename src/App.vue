<template>
  <!-- <nav>
    <router-link to="/">登入</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <navbar></navbar>
  <router-view/>
</template>

<script>
import navbar from '@/components/navbarView.vue';
export default {
  components: {
    navbar
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 }

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
