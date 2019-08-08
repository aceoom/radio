const fs = require('fs');
const path = require('path');

const _ = require('lodash')

const { collection } = require('./collection-all.json');


const groupedCollection = _.groupBy(collection, function ({ name }) {
  return _.lowerCase(name[0])
})

const collectionByLetter = _.mapValues(groupedCollection, function (entities) {
  return _.orderBy(entities, 'duration', 'desc')
})

fs.writeFile(path.join(__dirname, "/collection-by-letter.json"), JSON.stringify(collectionByLetter, null, 2), function(err) {
    if(err) return console.log(err);
    console.log("The file was saved!");
}); 