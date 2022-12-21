const path = require('path') //path - встроенный модуль в node.js
const HTMLWebpackPlugin = require('html-webpack-plugin') // плагин для работы с html 
const { Template } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.js',
        analytics: './analytics.js'
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
            template: './index.html' 
        }),
        new CleanWebpackPlugin() // для очистки старых скриптов
    ],
    module:{
        rules: [
            {
                // говорим вебпаку: как только ты встречаешь файлы с расширением css
                // тогде тебе необъходимо использовать определённый тип лоадеров
                test: /\.css$/,
                // важен порядок: вебпак идёт справа налево, пропуская всё сначала через css-loader и так далее.
                // style-loader добавляет css в тег head в html 
                use: ['style-loader','css-loader'] 
            }
        ]
    }
}