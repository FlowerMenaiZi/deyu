<template>
  <footer id="footer">
    <p>copyright©183计网502 2021-2022</p>
  </footer>
</template>
<script lang="ts">
  import {defineComponent} from 'vue'

  export default defineComponent({
    name: "Footer",
    setup() {

      return {}
    }
  })
</script>

<style scoped>
  #footer {
    position:fixed;
    bottom: 0;
    width: 100%;
    height: 30px;
    background: #555;
    z-index: 9;
    /*min-width: 1170px;*/
  }

  #footer p {
    width: 100%;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    color: #d9d9d9;
  }
</style>