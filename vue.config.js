module.export = {
    devServer: {
        proxyTable: {
            // 路径
            pathRewrite: {
                '~': '/src/common/'
            }
        }
    }
}