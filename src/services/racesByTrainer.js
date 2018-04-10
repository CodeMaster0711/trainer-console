import service from './index'

const resource = service.resource('races/get-races-by-trainer{/id}')

export default {
  // Read
  get (id) {
    return resource.get({id: id})
  }
}

