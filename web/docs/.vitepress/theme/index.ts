// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import { h, App } from 'vue'
import HomeFeaturesAfter from './HomeFeaturesAfter.vue'
import HomeHeroInfo from './components/HomeHeroInfo.vue'
import Parameter from './components/Parameter.vue'
import Parameters from './components/Parameters.vue'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
// import googleAnalytics from 'vitepress-plugin-google-analytics'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-features-after': () => h(HomeFeaturesAfter),
      'home-hero-info': () => h(HomeHeroInfo),
    })
  },
  enhanceApp({ app }: { app: App }) {
    // Register components globally
    app.component('Parameters', Parameters)
    app.component('Parameter', Parameter),
    enhanceAppWithTabs(app)
    // googleAnalytics({
    //   id: 'G-TWT118NZGK', // Hypericum.ai Measurement ID
    // })
  } 
}