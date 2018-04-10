import * as types from '../../mutation-types'

const mutations = {
  [types.GET_TRAINER] (state, { trainer }) {
    state.trainer = trainer
  }
}

export default mutations
