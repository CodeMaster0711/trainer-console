import * as types from '../../mutation-types'

const mutations = {
  [types.GET_QUESTION_BY_RACE] (state, { question }) {
    state.question = question
  },
  [types.GET_ANSWER_BY_RACE_QUESTION] (state, { answer }) {
    state.answer = answer
  }
}

export default mutations
