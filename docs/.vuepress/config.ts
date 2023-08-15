import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export const navbar = [
    { text: 'GitHub', link: 'https://github.com/YIueil/yl-blog-vuepress', icon: 'LogoGithub' }
]
export default defineUserConfig({
    base: '/yl-blog-vuepress/',
    title: 'YIueil Blog',
    head: [['link', { rel: 'icon', href: '/yl-blog-vuepress/favicon/favicon.ico' }]],
    theme: recoTheme({
        author: '弋孓',
        authorAvatar: '/header/author.png',
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

