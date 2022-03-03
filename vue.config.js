const path = require('path')

const resolve = (dir) => {
    return path.join(__dirname, dir)
}

const addStyleResource = (rule) => {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/assets/css/theme_vars/index.scss'),
            ],
        })
}

module.exports = {
    publicPath: "/",
    runtimeCompiler: true,
    lintOnSave: false,
    configureWebpack: {},

    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'));

        ['vue-modules', 'vue', 'normal-modules', 'normal'].forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
    },
}
