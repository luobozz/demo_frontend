const path = require("path")
module.exports = {
    publicPath: "/",
    runtimeCompiler: true,
    productionSourceMap: false,
    lintOnSave: false,
    chainWebpack: config => {
        if (process.env.NODE_ENV != "development") {
            config.devtool('none')
            //所有环境打包模式按照pro模式打包
            config.mode('production')
        }

        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
        if (process.env.NODE_ENV === "test") {
            config.output.filename('js/[name].[hash].js').end();
        }
        config.plugin('html')
            .tap(options => {
                options[0].title = process.env.VUE_APP_TITLE
                return options
            })
    },
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    // 'primary-color': '#ebf4ff',
                    // 'link-color': '#1DA57A',
                    // 'border-radius-base': '2px',
                },
                javascriptEnabled: true,
            },
        },
    },
};

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/assets/css/lessVariable.less'), // 需要全局导入的less
            ],
        })
}