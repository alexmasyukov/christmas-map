import * as $ from 'jquery'
import React from 'react'
import { render } from 'react-dom'
import Post from '@models/Post'
// import json from '@/assets/json'
// import logo from '@/assets/logo.svg'
import avatar from './assets/avatar.png'
import './styles/styles.css'
import './styles/main.sass'
import App from '@/app.jsx'

// console.log(json)
console.log(avatar)
// console.log(logo)
const post = new Post('Webpack post title', avatar)
$('pre').html(post.toString())

render(<App/>, document.getElementById('root'))

// console.log(post.toString())