const path = require('path') //path - встроенный модуль в node.js


module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js',
        analytics: './src/analytics.js'
    }, // входной файл
    output: {
        filename: '[name]bundle.js', // куда складываются все скрипты
        path: path.resolve(__dirname, 'dist') // 
    }
}