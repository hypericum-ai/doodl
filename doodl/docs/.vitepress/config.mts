import { DefaultTheme, defineConfig } from 'vitepress'
import pkg from '../package.json' with { type: 'json' }

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Doodl",
    description: "Doodl",
    head: [
        [
            'script',
            {
                'type': 'text/javascript',
                'src': 'https://cdn.jsdelivr.net/gh/hubbl-ai/doodl@main/doodl/ts/dist/doodlchart.min.js'
                // 'src': '/assets/doodl/js/doodlchart.js' //for production
            }
        ],
        [
            'link',
            {
                rel: 'stylesheet',
                href: 'https://cdn.jsdelivr.net/gh/hubbl-ai/doodl@main/doodl/css/docs.css'
                // href: '/assets/doodl/css/docs.css',//for production
            }
        ],
        [
            'link',
            {
                rel: 'stylesheet',
                href: 'https://cdn.jsdelivr.net/gh/hubbl-ai/doodl@main/doodl/css/menu.css'
                // href: '/assets/doodl/css/menu.css',//for production
            }
        ],
        ['link', { rel: 'icon', href: 'favicon.ico' }],
         [
            'link',
            { rel: 'icon', type: 'image/svg+xml', href: '/doodl.svg' }
        ],
    ],
    themeConfig: {
        nav: nav(),

        sidebar: [
            {
                text: 'History',
                link: '/history',
            },
            {
                text: 'Using doodl',
                collapsed: false,
                items: [
                    { text: 'Get Started', link: '/get-started' },
                    { text: 'Writing Markdown', link: '/markdown' },
                    { text: 'Invoking doodl', link: '/invoking' },
                    { text: 'Color palettes', link: '/color' }
                ]
            },
            {
                text: 'Chart types',
                link: '/charts',
                collapsed: false,
                items: [
                    { text: 'Bar chart', link: '/charts/bar-chart' },
                    { text: 'Bollinger bands', link: '/charts/bollinger' },
                    { text: 'Box plot', link: '/charts/boxplot' },
                    { text: 'Chord diagram', link: '/charts/chord' },
                    { text: 'Dot plot', link: '/charts/dotplot' },
                    { text: 'Force diagram', link: '/charts/force' },
                    { text: 'Gantt chart', link: '/charts/gantt' },
                    { text: 'Heat map', link: '/charts/heatmap' },
                    { text: 'Line chart', link: '/charts/line-chart' },
                    { text: 'Pie chart', link: '/charts/pie-chart' },
                    { text: 'Sankey diagram', link: '/charts/sankey' },
                    { text: 'Scatter plot', link: '/charts/scatterplot' },
                    { text: 'Tree diagram', link: '/charts/tree' },
                    { text: 'Tree map', link: '/charts/treemap' },
                    { text: 'Venn diagram', link: '/charts/venn' },
                ]
            },
            {
                text: 'Custom charts',
                link: '/custom/',
                collapsed: false,
                items: [
                    { text: 'Implementation', link: '/custom/implement' },
                ]
            },
            { text: 'Pandoc-Plot', link: '/pandoc-plot' }
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/hypericum-ai/doodl' }
        ], 
        search: {
            provider: "local"
        },
        footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2025-present Hypericum-ai'
        }
    }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'Documentation',
      link: '/markdown'
    },
    {
      text: 'Charts',
      link: '/charts/'
    },
    // {
    //   text: 'Pricing',
    //   link: '/pricing'
    // },
    {
      text: pkg.version,
      items: [
        {
          text: 'Changelog',
          link: 'https://github.com/hypericum-ai/doodl/activity'
        },
        {
          text: 'Contributing',
          link: 'https://github.com/hypericum-ai/doodl/blob/main/README.md'
        }
      ]
    }
  ]
}
