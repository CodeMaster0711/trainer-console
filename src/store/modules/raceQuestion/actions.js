import * as types from '../../mutation-types'
import RaceQuestionService from '../../../services/raceQuestion'

const actions = {
  createOne ({ commit, state }, question) {
    return RaceQuestionService.createOne(question)
  },

  getOne ({ commit, state }, id) {
    return RaceQuestionService.get(id).then((response) => {
      commit(types.GET_QUESTION_BY_RACE, {
        question: response.data
      })
    })
  },
  
  getQuestionAnswer ({ commit, state }, id) { 
    return RaceQuestionService.getQuestionAnswer(id).then((response) => {
      commit(types.GET_ANSWER_BY_RACE_QUESTION, {
        answer: response.data
      })
    })
  }

}

export default actions
