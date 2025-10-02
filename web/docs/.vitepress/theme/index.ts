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
      // here we target the "home-features-after" slot
      'home-features-after': () => h(HomeFeaturesAfter)
    })
  },
  enhanceApp({ app }: { app: App }) {
    // Register components globally
    app.component('Parameters', Parameters)
    app.component('Parameter', Parameter)
    app.component('TextRotator', TextRotator)
  } 
}