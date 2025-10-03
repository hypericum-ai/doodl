// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import { h, App } from 'vue'
import HomeFeaturesAfter from './HomeFeaturesAfter.vue'
import Parameter from './components/Parameter.vue'
import Parameters from './components/Parameters.vue'
import TextRotator from './components/TextRotator.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-features-after': () => h(HomeFeaturesAfter),
      // 'home-hero-info-after': () => h(TextRotator),
      'home-hero-info': () => h(TextRotator),
    })
  },
  enhanceApp({ app }: { app: App }) {
    // Register components globally
    app.component('Parameters', Parameters)
    app.component('Parameter', Parameter)
    app.component('TextRotator', TextRotator)
  } 
}