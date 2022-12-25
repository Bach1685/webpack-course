import Post from './Post'
import './styles/styles.css'
import json from './assets/json.json' //вот так легко можно получить доступ к json файлу
import WebpackLogo from './assets/webpack-logo.png'
import xml from './assets/data.xml'
import csv from './assets/data.csv'

const post = new Post('webpack post title', WebpackLogo)

console.log('csv', csv)