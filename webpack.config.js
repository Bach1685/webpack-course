const path = require('path') //path - встроенный модуль в node.js
const HTMLWebpackPlugin = require('html-webpack-plugin') // плагин для работы с html 


module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js',
        analytics: './src/analytics.js'
    }, // входной файл
    output: {
        filename: '[name][contenthash].js', // куда складываются все скрипты
        path: path.resolve(__dirname, 'dist') // 
    },
    plugins:[
        new HTMLWebpackPlugin({
            title: 'My app' // создастся тэг <title> с содержимым "my app"
        })
    ]
}