<template>
  <div id="app">
    <nav v-if="isNotHome">
      <router-link to="/">Users</router-link>
    </nav>
    <router-view />
  </div>
</template>
<script>
export default {
  methods: {
    isNotHome() {
      return this.route.name !== "Home";
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 14px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}
</style>
