const sinon = require('sinon')
const chai = require('chai')
const faker = require('faker');

const PlaylistService = require('./playlist.service')
const SongRepository = require('../../infrastructure/repositories/song.repository')

const assert = chai.assert;

describe('Playlist service', function() {
  describe('Create playlist with limited amount', function() {
    const sandbox = sinon.sandbox.create();
    before(function() {
      sandbox.stub(SongRepository, 'getRandom').callsFake(function () {
        const randomLitter = faker.random.arrayElement(["a","b","c","d"])
        return { name: randomLitter }
      })
      sandbox.stub(SongRepository, 'getRandomByLetter').callsFake(function (litter) {
        const randomLitter = faker.random.arrayElement(["a","b","c","d"])
        return { name: `${litter}${randomLitter}` }
      })
    });

    after(function() {
      sandbox.restore();
    });

    it('should return an array of songs', async function() {
      const createdPlaylist = await PlaylistService.createWithLimitedAmount(10)
      assert.isArray(createdPlaylist)
    });

    it('should return an array of 10 songs', async function() {
      const createdPlaylist = await PlaylistService.createWithLimitedAmount(10)
      assert.lengthOf(createdPlaylist, 10)
    });

    it('should return an array of songs that begin with the last letter of the previous', async function() {
      const createdPlaylist = await PlaylistService.createWithLimitedAmount(10)
      createdPlaylist.reduce(function(memory, value) {
        if (memory !== null) {
          const firstLetter = value.name.charAt(0);
          const lastLetter = memory.name.charAt(memory.name.length - 1);
          assert.equal(firstLetter, lastLetter)
        }
        return value
      }, null);
    });
  });
});