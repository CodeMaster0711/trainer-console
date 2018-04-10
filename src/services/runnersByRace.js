import service from './index'

const resource = service.resource('races{/id}/runners')
const addrunner = service.resource('races{/idRacer}/add-runner{/idRunner}')
const removerunner = service.resource('races/{idRacer}/remove-runner/{idRunner}')
export default {
  // Read
  getAll (id) {
    return resource.get({id: id}) 
  },

  //Add Runner to Race

  add(runnerId, raceId){

    return addrunner.update({idRacer:raceId,idRunner: parseInt(runnerId)}, {})
  },
  //Remove Runner from Race

  remove(runnerId, raceId){

    return removerunner.delete({idRacer:raceId,idRunner: parseInt(runnerId)}, {})
  }
}