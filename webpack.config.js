const path = require('path') //path - встроенный модуль в node.js
const HTMLWebpackPlugin = require('html-webpack-plugin') // плагин для работы с html 
const { Template } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


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
            // создастся тэг <title> с содержимым "my app". 
            // Закомментируем его, так как template его перезатрёт 
            //title: 'My app',  
            
            // webpack пересоздаёт файл dist/index.html. 
            // Чтобы в нем не удялялась наша верстка, мы прописываем путь к нашему файлику
            template: './src/index.html' 
        }),
        new CleanWebpackPlugin() // для очистки старых скриптов
    ]
}