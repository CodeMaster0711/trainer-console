
const getters = {
  races: (state) => {
    return state.races
  },
  scheduleraces:(state)=>{
    return state.races.filter(races => races.finishDate == null)
  }
}

export default getters
