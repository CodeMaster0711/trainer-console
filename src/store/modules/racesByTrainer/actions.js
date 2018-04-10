import * as types from '../../mutation-types'
import RacesByTrainerService from '../../../services/racesByTrainer'

const actions = {
  get ({ commit, state }, id) {
    return RacesByTrainerService.get(id).then((response) => {
      commit(types.GET_RACES_BY_TRAINER, {
        races: response.data
      })
    })
  }
}

export default actions
