<template>
  <div id='app'>
    <UserVerification />
    <div id='nav'>
      <router-link to='/'>Home</router-link>
      <router-link to='/register'>Register</router-link>
      <router-link to='/login'>Login</router-link>
      <router-link to='/dashboard'>Dashboard</router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import UserVerification from './components/UserVerification.vue';

@Component({
  components: {
    UserVerification,
  },
})
export default class App extends Vue {}
</script>

<style lang='scss'>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 10px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
