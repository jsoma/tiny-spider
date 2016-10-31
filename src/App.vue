<template>
  <div id="app">
    <Parent></Parent>
  </div>
</template>

<script>
import Parent from './components/Parent'

export default {
  name: 'app',
  components: {
    Parent
  }
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
}
</style>
