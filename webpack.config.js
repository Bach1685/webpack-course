const path = require('path') //path - встроенный модуль в node.js
const HTMLWebpackPlugin = require('html-webpack-plugin') // плагин для работы с html 
const { Template } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
            },
        },
        'css-loader'
    ]

    if (extra) {
        loaders.push(extra)
    }
    return loaders
}

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        },
    }

    if(isProd){
        config.minimizer = [
            new OptimizeCssAssetWebpackPlugin(), // для оптимизации css
            new TerserWebpackPlugin() 
        ]
    }
    return config
}

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
    optimization: optimization(),
    devServer:{
        static: {
            directory: path.join(__dirname, 'src'),
        },
        compress: true,
        port: 4200,
        open: true,
        hot: isDev
    },
    plugins:[
        new HTMLWebpackPlugin({
            // создастся тэг <title> с содержимым "my app". 
            // Закомментируем его, так как template его перезатрёт 
            //title: 'My app',  
            
            // webpack пересоздаёт файл dist/index.html. 
            // Чтобы в нем не удялялась наша верстка, мы прописываем путь к нашему файлику
            template: './index.html',
            minify:{
                collapseWhitespace: isProd // для оптимизации html
            }
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
            // filename: "[name].css"//'[name][contenthash].css', 
            filename: isDev ? "[name].css" : "[name].[contenthash].css",
            // chunkFilename: devMode ? "[id].css" : "[id].[contenthash].css",
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
                use: cssLoaders() 
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader') 
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader') 
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
                test: /\.(ttf|woff|woff2|eot)$/,
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