const getters = {
  race: (state) => {
    return state.race
  },
  runners: (state) => {
    return state.runners
  },
  isRaceLive: (state) => {
    return state.race.id >0 && state.isRaceLive
  }
}

export default getters
