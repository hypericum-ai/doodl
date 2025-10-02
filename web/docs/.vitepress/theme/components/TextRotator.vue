<template>
  <div class="text-rotator-container">
    <!-- <span class="static-text">Your awesome project </span> -->
    <transition name="fade-slide" mode="out-in">
      <span :key="currentText" class="rotating-text">{{ currentText }}</span>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const rotatingTexts = [
  'Markdown',
  'HTML',
  'Angular',
  'Vue',
  'React',
  'Data Science',
  'PDF reports',
  'Word documents',
  'Jupyter Notebooks',
  'Colab Notebooks',
  'Tufte layout',
];
const currentIndex = ref(0);
const currentText = ref(rotatingTexts[0]);
let intervalId;

onMounted(() => {
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % rotatingTexts.length;
    currentText.value = rotatingTexts[currentIndex.value];
  }, 3000); // Change text every 3 seconds
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.text-rotator-container {
  display: inline-flex; /* Or block, depending on your layout */
  font-size: 2em; /* Adjust as needed */
  font-weight: bold;
}

/* CSS for fade-slide transition */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
