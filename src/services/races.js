import service from './index'

const resource = service.resource('races{/id}')
const resourceDelete = service.resource('races{/id}/remove')

export default {
  get (id) {
    return resource.get({id: id})
  },
  createOne (race) {
    return resource.save({}, race)
  },
  deleteOne (race) {
    return resourceDelete.delete({id: race.id})
  },
  updateOne (race) {
    return resource.update(race)
  }
}

