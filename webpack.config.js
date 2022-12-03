const path = require('path') //path - встроенный модуль в node.js


module.exports = {
    mode: 'development',
    entry: './src/index.js', // входной файл
    output: {
        filename: 'bundle.js', // куда складываются все скрипты
        path: path.resolve(__dirname, 'dist') // 
    }
}