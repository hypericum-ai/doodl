<template>
  <div class="HomeFeaturesAfter">
    <div class="container">
      <h2>This is rendered after the features section</h2>
      <p>The paragraph with text</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeFeaturesAfter'
})
</script>

<style scoped>
.HomeFeaturesAfter {
padding: 1rem 64px;
}

.HomeFeaturesAfter .container {
  margin: 0 auto;
  max-width: 1152px;
  text-align: center;
}

.HomeFeaturesAfter h2 {
  font-size: 1.5rem;
}

.HomeFeaturesAfter p {
  color: #333;
  font-size: 1rem;
}
</style>