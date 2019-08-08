const express = require('express')
const router = express.Router()

require('dotenv').config()

router.get('/', function (req, res, next) {
  res.render('index', {
    title: process.env.APPLICATION_TITLE,
    description: process.env.APPLICATION_DESCRIPTION
  })
})

module.exports = router
