import * as types from '../../mutation-types'
import RacesService from '../../../services/races'
import StartRaceService from '../../../services/startRace'
import FinishRaceService from '../../../services/finishRace'
import TrainerNoteService from '../../../services/trainerNote'
import RunnersByRaceService from '../../../services/runnersByRace'

const actions = {
  get ({ commit, state }, id) {
    return RacesService.get(id).then((response) => {
      commit(types.GET_RACE, {
        race: response.data
      })
    })
  },
  start ({ commit, state }, id) {
    return StartRaceService.start(id)
  },
  finish ({ commit, state }, id) {
    return FinishRaceService.finish(id)
  },
  getRunners ({ commit, state }, id) {
    return RunnersByRaceService.getAll(id).then((response) => {
      commit(types.GET_RUNNERS_BY_RACE, {
        runners: response.data
      })
    })
  },
  createOne ({ commit, state }, race) {
    return RacesService.createOne(race)
  },
  deleteOne ({ commit, state }, race) {
    return RacesService.deleteOne(race)
  },
  updateOne ({ commit, state }, race) {
    return RacesService.updateOne(race)
  },
  updateNote ({ commit, state }, data) {
    return TrainerNoteService.updateNote(data)
  },
  startLive ({ commit, state },) {
    return commit("setIsRaceLive", true)
  },
  stopLive ({ commit, state },) {
    return commit("setIsRaceLive", false)
  }
}

export default actions
