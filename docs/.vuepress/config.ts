import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export const navbar = [
    { text: '指南', link: '/docs/guide/introduce', icon: 'Compass' },
    {
        text: '参考',
        icon: 'Document',
        children: [
            {
                text: '配置',
                children: [
                    { text: '主题配置', link: '/docs/theme/frontmatter' },
                    { text: 'Markdown 扩展', link: '/docs/theme/custom-container' },
                    { text: '高级', link: '/docs/theme/custom-catalog-title' },
                ],
            },
            {
                text: '插件',
                children: [
                    { text: 'page', link: '/docs/plugins/page' },
                    { text: 'comments', link: '/docs/plugins/comments' },
                    { text: 'vue-previews', link: '/docs/plugins/vue-previews' },
                    { text: 'bulletin-popover', link: '/docs/plugins/bulletin-popover' },
                ],
            },
        ],
    },
    {
        text: '版本',
        icon: 'SubVolume',
        children: [
            { text: '2.x(alpha)', link: 'https://vuepress-theme-reco.recoluan.com/' },
            {
                text: '1.x',
                link: 'https://vuepress-theme-reco.recoluan.com/views/1.x/',
            },
        ],
    },
    { text: '留言板', link: '/docs/message-board', icon: 'Chat' },
]
export default defineUserConfig({
    title: 'YIueil Blog',
    head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
    theme: recoTheme({
        author: '弋孓',
        authorAvatar: '/author.png',
        // 自动设置分类
        autoSetBlogCategories: true,
        // 自动将分类和标签添加至头部导航条
        autoAddCategoryToNavbar: {
            location: 1, // 默认 0
            categoryText: '分类', // 默认 categories
            tagText: '标签' // 默认 tags
        },
        primaryColor: '#13393e',
        // 自动设置分类
        autoSetSeries: true,
        catalogTitle: '目录📖',
        colorMode: 'dark', // dark, light
        navbar
    })
})

