import service from './index'

const resource = service.resource('race-questions{/id}')
const resourceQuestion = service.resource('race-questions/by-race{/raceId}')
const resourceAnswer = service.resource('race-questions/all-answers{/raceQuestionId}')

export default {
  createOne (question) {
    return resource.save({}, question)
  },
  get (raceId){
   return resourceQuestion.get({raceId: raceId})
  },

  getQuestionAnswer(raceQuestionId){
    return resourceAnswer.get({raceQuestionId: raceQuestionId})
  }
}

