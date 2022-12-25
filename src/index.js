import Post from './Post'
import './styles/styles.css'
import json from './assets/json.json' //вот так легко можно получить доступ к json файлу
import WebpackLogo from './assets/webpack-logo.png'
import xml from './assets/data.xml'

const post = new Post('webpack post title', WebpackLogo)

console.log('xml', xml)