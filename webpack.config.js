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
            },
            {
                // говорим вебпаку: как только ты встречаешь файлы с расширением png или jpg или svg или git
                // тогде тебе необъходимо использовать определённый тип лоадеров
                test: /\.(png|jpg|svg|gif)$/,
                // use: ['file-loader'] 
                // Проблема с дублированием файлов (png, fonts).
                // Вместо use: 'file-loader' используйте type: 'asset/resource' - это нововведение (относительное) Webpack, которое помогает избежать данной ошибки. Подробнее можно узнать в документации Webpack в разделе asset-modules, там все кристально объяснено.
                 type: 'asset/resource'
            },
            {
                // говорим вебпаку: как только ты встречаешь файлы с расширением png или jpg или svg или git
                // тогде тебе необъходимо использовать определённый тип лоадеров
                test: /\.(ttf|woff|woff2|eot)$/,
                // use: ['file-loader'] 
                // Проблема с дублированием файлов (png, fonts).
                // Вместо use: 'file-loader' используйте type: 'asset/resource' - это нововведение (относительное) Webpack, которое помогает избежать данной ошибки. Подробнее можно узнать в документации Webpack в разделе asset-modules, там все кристально объяснено.
                 type: 'asset/resource'
            },
            {
                test: /\.xml$/,
                use: ['xml-loader'] 
            }
        ]
    }
}