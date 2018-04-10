import * as types from '../../mutation-types'
import TrainerService from '../../../services/trainer'

const actions = {
  get ({ commit, state }, id) {
    return TrainerService.get(id).then((response) => {
      commit(types.GET_TRAINER, {
        trainer: response.data
      })
    })
  }
}

export default actions
