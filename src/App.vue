<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/contacts">Contacts</router-link> |
      <router-link to="/stats">Statistics</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
</style>
