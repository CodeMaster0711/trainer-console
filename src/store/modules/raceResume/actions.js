// import * as types from '../../mutation-types'
import RaceResumeService from '../../../services/raceResume'

const actions = {
  createOne ({ commit, state }, raceResume) {
    return RaceResumeService.create(raceResume)
  }
}

export default actions
