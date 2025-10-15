<template>
  <h1 class="heading">
    <span v-if="name" v-html="name" class="name clip"></span>
    <span v-if="text" v-html="text" class="text"></span>
    <transition name="fade-slide" mode="out-in">
      <span :key="currentText" class="text">{{ currentText }}</span>
    </transition>
  </h1>
  <p v-if="tagline" v-html="tagline" class="tagline"></p>
</template>

<script setup>
// Todo: Take the values from the hero section in index.md frontmatter
const name = 'Doodl';
const text = 'A publishing platform marrying d3 and';
const tagline = 'High quality documents, with live visualizations.';

// Todo: Make this a property
const delay = 3000; // Delay in milliseconds

import { ref, onMounted, onUnmounted } from 'vue';

const rotatingTexts = [
  'Markdown',
  'HTML',
  'Pandoc',
  'Angular',
  'Vue',
  'React',
  'data science',
  'PDF reports',
  'Word documents',
  'Jupyter notebooks',
  'Colab notebooks',
  'Tufte layout',
];
const currentIndex = ref(0);
const currentText = ref(rotatingTexts[0]);
let intervalId;

onMounted(() => {
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % rotatingTexts.length;
    currentText.value = rotatingTexts[currentIndex.value];
  }, delay); // Change text every 3 seconds
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
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

/* CSS from HomeHeroInfo.vue */

.heading {
  display: flex;
  flex-direction: column;
}

.name,
.text {
  width: fit-content;
  max-width: 392px;
  letter-spacing: -0.4px;
  line-height: 40px;
  font-size: 32px;
  font-weight: 700;
  white-space: pre-wrap;
}

.VPHero.has-image .name,
.VPHero.has-image .text {
  margin: 0 auto;
}

.name {
  color: var(--vp-home-hero-name-color);
}

.clip {
  background: var(--vp-home-hero-name-background);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: var(--vp-home-hero-name-color);
}

@media (min-width: 640px) {
  .name,
  .text {
    max-width: 576px;
    line-height: 56px;
    font-size: 48px;
  }
}

@media (min-width: 960px) {
  .name,
  .text {
    line-height: 64px;
    font-size: 56px;
  }

  .VPHero.has-image .name,
  .VPHero.has-image .text {
    margin: 0;
  }
}

.tagline {
  padding-top: 8px;
  max-width: 392px;
  line-height: 28px;
  font-size: 18px;
  font-weight: 500;
  white-space: pre-wrap;
  color: var(--vp-c-text-2);
}

.VPHero.has-image .tagline {
  margin: 0 auto;
}

@media (min-width: 640px) {
  .tagline {
    padding-top: 12px;
    max-width: 576px;
    line-height: 32px;
    font-size: 20px;
  }
}

@media (min-width: 960px) {
  .tagline {
    line-height: 36px;
    font-size: 24px;
  }

  .VPHero.has-image .tagline {
    margin: 0;
  }
}
</style>
