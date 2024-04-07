<template >
  <div>
    <RouterView />
  </div>
</template>


<script>
  
  export default {
  name:'App',
  watch: {
    created() {
    
    },
    $route(to,) {
      const name = to.name.toLowerCase()
      const title = name 
        // ? `${name} (${to.href.split('/')[2].toLowerCase()})`
        // : name
      document.title = `Mcipme-Guinee - ${title}`

      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
  mounted() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
  },
  
}
</script>
<style lang="css" scoped>
  
</style>