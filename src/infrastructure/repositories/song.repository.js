const _ = require('lodash')

const collectionAll = require('../databases/collection-all.json')
const collectionByLetter = require('../databases/collection-by-letter.json')

function getRandom(collection) {
  return _.get(collection, _.random(collection.length - 1), null)
}

function getByRandomDuration(collection, duration) {
  const filtredCollection = _.filter(collection, function (entity) {
    return entity.duration < duration
  })

  return getRandom(filtredCollection)
}

function getByDuration(collection, duration) {
  return _.find(collection, function (entity) {
    return entity.duration < duration
  }) || null
}

module.exports = {
  getRandom() {
    return getRandom(collectionAll)
  },
  getRandomByLetter(letter) {
    const collection = _.get(collectionByLetter, _.lowerCase(letter), [])
    return getRandom(collection)
  },

  getMinDuration() {
    return _.get(_.last(collectionAll), 'duration')
  },

  getRandomByDuration(duration) {
    return getByRandomDuration(collectionAll, duration)
  },

  getRandomByLetterAndDuration(letter, duration) {
    const collection = _.get(collectionByLetter, _.lowerCase(letter), [])
    return getByRandomDuration(collection, duration)
  },

  getByDuration(duration) {
    return getByDuration(collectionAll, duration)
  },

  getByLetterAndDuration(letter, duration) {
    const collection = _.get(collectionByLetter, _.lowerCase(letter))
    return getByDuration(collection, duration)
  }
}