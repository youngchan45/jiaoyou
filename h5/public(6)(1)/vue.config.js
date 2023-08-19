/*
 * @Author: your name
 * @Date: 2021-08-06 11:45:50
 * @LastEditTime: 2021-08-10 16:44:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dzzhkh-ui\vue.config.js
 */
const path = require('path')
const name = '交友盲盒' // 标题
function resolve(dir) {
    return path.join(__dirname, dir)
}
const port = process.env.port || process.env.npm_config_port || 8080 // 端口
module.exports = {
    // 部署生产环境和开发环境下的URL。
    // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.xxx.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.xxx.vip/admin/，则设置 baseUrl 为 /admin/。
    publicPath: process.env.NODE_ENV === "production" ? "/jiaoyou-ui/h5" : "/jiaoyou-ui/h5",
    //publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
    // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
    outputDir: 'dist',
    // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
    assetsDir: 'static',
    // 是否开启eslint保存检测，有效值：ture | false | 'error'
    lintOnSave: process.env.NODE_ENV === 'development',
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,
    // webpack-dev-server 相关配置
    devServer: {
        host: '0.0.0.0',
        port: port,
        proxy: {
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            [process.env.VUE_APP_BASE_API]: {
                // target: `http://22.37.126.139:9008`,
                target: `http://101.37.167.17:8080`,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        },
        disableHostCheck: true
    },
    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },

    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue: 37.5,
                        propList: ['*'],
                        selectorBlackList: [],//忽略转换
                    }),
                ]
            }
        }
    }
}