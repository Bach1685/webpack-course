const path = require('path') //path - встроенный модуль в node.js
const HTMLWebpackPlugin = require('html-webpack-plugin') // плагин для работы с html 
const { Template } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
    resolve: {
        extensions: ['.js', '.json', '.png'], // чтобы при экспорте файлов не указывать расширение
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer:{
        static: {
            directory: path.join(__dirname, 'src'),
        },
        compress: true,
        port: 4200,
        open: true,
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
        new CleanWebpackPlugin(), // для очистки старых скриптов
        new CopyWebpackPlugin({ 
            // плагин нужен для копирования элементов в папку dist, потому как пересборка очищает файлы
            // можно переносить таким образом всё, что угодно, не только фав иконки
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/icons8-globe-africa-16.ico'), //откуда копируем
                    to: path.resolve(__dirname, 'dist') // куда
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: '[name][contenthash].css', 
        })
    ],
    module:{
        rules: [
            {
                // говорим вебпаку: как только ты встречаешь файлы с расширением css
                // тогде тебе необъходимо использовать определённый тип лоадеров
                test: /\.css$/,
                // важен порядок: вебпак идёт справа налево, пропуская всё сначала через css-loader и так далее.
                // style-loader добавляет css в тег head в html 
                use: [ 
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                    },
                    'css-loader'
                ] 
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
            },
            {
                test: /\.csv$/,
                use: ['csv-loader'] 
            }
        ]
    }
}