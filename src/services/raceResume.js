import service from './index'

const resource = service.resource('race-resumes{/id}')

export default {
  get (id) {
    return resource.get({id: id})
  },
  create (raceResume) {
    return resource.save({}, raceResume)
  },
  update (raceResume) {
    return resource.update(raceResume)
  }
}
