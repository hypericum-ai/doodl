import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Doodl",
    description: "Doodl",
    head: [
        [
            'script',
            {
                'type': 'text/javascript',
                'src': 'https://cdn.jsdelivr.net/gh/hubbl-ai/doodl@main/doodl/ts/dist/doodlchart.js'
            }
        ],
        [
            'link',
            {
                href: 'https://cdn.jsdelivr.net/gh/hubbl-ai/doodl@main/doodl/css/docs.css',
                rel: 'stylesheet'
            }
        ],
        [
            'link',
            {
                href: 'https://cdn.jsdelivr.net/gh/hubbl-ai/doodl@main/doodl/css/menu.css',
                rel: 'stylesheet'
            }
        ]
    ],
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Documentation', link: '/markdown' },
            { text: 'Charts', link: '/charts/' }
        ],

        sidebar: [
            {
                text: 'History',
                link: '/history',
            },
            {
                text: 'Using doodl',
                collapsed: false,
                items: [
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
            { icon: 'github', link: 'https://github.com/hubbl-ai/doodl' }
        ]
    }
})
