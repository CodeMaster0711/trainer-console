import * as types from '../../mutation-types'

const mutations = {
  [types.GET_RACES_BY_TRAINER] (state, { races }) {
    state.races = races
  }
}

export default mutations
