import Post from '@models/Post'
import './styles/styles.css'
import json from '@/assets/json.json' //вот так легко можно получить доступ к json файлу
import WebpackLogo from './assets/webpack-logo.png'
import xml from '@/assets/data.xml'
import csv from '@/assets/data.csv'
import * as $ from 'jquery' //* as $ - означает, что мы импортироует абсолютно всё в переменную $

const post = new Post('webpack post title', WebpackLogo)

$('pre').html(post.toString())
