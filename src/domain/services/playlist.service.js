const _ = require('lodash')
const SongRepository = require('../../infrastructure/repositories/song.repository')

function getFirstLetter(text) {
  return _.last(text.replace(/[^\w]/g, ''))
}

module.exports = {
  async createWithLimitedAmount(amount) {
    if (amount === 0) throw new Error('Impossible to build playlist')

    const firstSong = await SongRepository.getRandom();
    const memory = [firstSong]
  
    for(let i = 1; i < amount; i++) {
      const prevSong = _.last(memory)
      const lastLetter = getFirstLetter(prevSong.name)

      let nextSong = await SongRepository.getRandomByLetter(lastLetter);
      if (nextSong === null) nextSong = await SongRepository.getRandom(lastLetter);

      memory.push(nextSong)
    }

    return memory;
  },

  async createWithLimitedDuration(duration) {
    const minDuration = await SongRepository.getMinDuration()

    if (duration < minDuration) throw new Error('Impossible to build playlist')

    const firstSong = await SongRepository.getRandomByDuration(duration);
    // const firstSong = await SongRepository.getByDuration(duration);
    const memory = [firstSong]
    
    duration = duration - firstSong.duration

    while(duration > minDuration) {
      const prevSong = _.last(memory)
      const lastLetter = getFirstLetter(prevSong.name)

      let nextSong = await SongRepository.getRandomByLetterAndDuration(lastLetter, duration);
      // let nextSong = await SongRepository.getByLetterAndDuration(lastLetter, duration);
      if (nextSong === null) nextSong = await SongRepository.getRandomByDuration(duration);
      // if (nextSong === null) nextSong = await SongRepository.getByDuration(duration);

      memory.push(nextSong)
      duration = duration - firstSong.duration
    }
    
    return memory;
  }
}