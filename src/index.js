import Post from './Post'
import './styles/styles.css'
import json from './assets/fileJson.json' //вот так легко можно получить доступ к json файлу
console.log('json', json)

const post = new Post('webpack post title')

console.log(post.toString())