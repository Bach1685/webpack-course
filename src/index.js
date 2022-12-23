import Post from './Post'
import './styles/styles.css'
import json from './assets/json.json' //вот так легко можно получить доступ к json файлу
import WebpackLogo from './assets/webpack-logo.png'

const post = new Post('webpack post title', WebpackLogo)

console.log(post.toString())