<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$store.dispatch('tags/getAllTags')
    this.$store.dispatch('article/getAllArticle')
  }
}
</script>
