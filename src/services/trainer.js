import service from './index'

const resource = service.resource('trainers/by-user{/id}')

export default {
  // Read
  get (id) {
    return resource.get({id: id})
  }
}

