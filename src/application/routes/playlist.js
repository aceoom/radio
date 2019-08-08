const express = require('express')
const router = express.Router()

const PlaylistService = require('../../domain/services/playlist.service')

const amountRenderObject = {
  link: '/playlist/amount',
  question: 'How many songs are required in the playlist?',
  placeholder: 'Enter the number of songs',
  errorMessage: null,
  collection: []
}

const durationRenderObject = {
  link: '/playlist/duration',
  question: 'What is the duration of the required playlist?',
  placeholder: 'Enter the duration of playlist',
  errorMessage: null,
  collection: []
}

router.get('/amount', async function (req, res, next) {
  if (!req.query.value) {
    res.render('playlist-by', amountRenderObject)
    return;
  }

  const value = parseInt(req.query.value, 10);
  
  try {
    const collection = await PlaylistService.createWithLimitedAmount(value);
    res.render('playlist-by', {...amountRenderObject, collection})
  } catch(e) {
    res.render('playlist-by', {...amountRenderObject, errorMessage: e.toString()})
  }
})

router.get('/duration', async function (req, res, next) {
  if (!req.query.value) {
    res.render('playlist-by', durationRenderObject)
    return;
  }

  const value = parseInt(req.query.value, 10);

  try {
    const collection = await PlaylistService.createWithLimitedDuration(value);
    res.render('playlist-by', {...durationRenderObject, collection})
  } catch(e) {
    res.render('playlist-by', {...durationRenderObject, errorMessage: e.toString()})
  }
})

module.exports = router
