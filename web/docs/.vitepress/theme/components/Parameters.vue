<template>
  <section class="parameters">
    <h3 v-if="!no_header">
      {{ header }}
    </h3>
    <dl>
      <slot />
    </dl>
  </section>
</template>

<script setup>
defineProps({
  no_header: { type: Boolean, default: false },
  header: { type: String, default: 'Parameters' }
})
</script>

<style scoped>
.parameters {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.parameters h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.25rem;
}

.parameters dl {
  margin: 0;
  padding: 0;
}

.parameters dt {
  font-weight: 600;
  margin-top: 0.8em;
  margin-bottom: 0.2em;
}

.parameters dt code {
  font-weight: 400;
  background: #f6f8fa;
  padding: 0.1em 0.3em;
  border-radius: 4px;
  font-size: 0.9em;
  margin-left: 0.3em;
}

.parameters dd {
  margin: 0 0 0.8em 1.25em;
  line-height: 1.5;
}
</style>
