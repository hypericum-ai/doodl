// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import HomeFeaturesAfter from './HomeFeaturesAfter.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // here we target the "home-features-after" slot
      'home-features-after': () => h(HomeFeaturesAfter)
    })
  }
}