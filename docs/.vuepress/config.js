const path = require('path')
module.exports = {
    title: '乐逸悠蓝的随笔记录',
    description: '乐逸悠蓝的随笔记录',
    markdown: {
      lineNumbers: true,
    },
    configureWebpack: {
        resolve: {
          alias: {
            '@': path.resolve(__dirname, './public')
          }
        }
    },
    // 默认主题
    themeConfig: {
        search: true,
        searchMaxSuggestions: 10,
        // displayAllHeaders: true, // 默认值：false
        // activeHeaderLinks: false, // 默认值：true
        nav: [
            { text: '首页', link: '/' },
            { text: '前端基础', link: '/src/fontEndBasic/' },
            { text: '前端进阶', link: '/src/frontEndEngineering/' },
        ],
        sidebar: {
            '/src/fontEndBasic/': [
                {
                  title: 'Javascript基础',
                  collapsable: true,
                  children: [
                    '','数据类型','面向对象'
                  ],
                  initialOpenGroupIndex: 1 // 可选的, 默认值是 0
                },
                // {
                //     title: 'typesscript',
                //     children: [
                //         '原型'
                //     ],
                //     initialOpenGroupIndex: 0 // 可选的, 默认值是 0
                // }
            ],
            '/src/frontEndEngineering/': [
                {
                  title: '前端工程化',
                  collapsable: true,
                  children: [
                    ''
                  ],
                  initialOpenGroupIndex: 1 // 可选的, 默认值是 0
                }
            ]
        }
    }
}