import service from './index'

const resource = service.resource('races{/id}/start-race')

export default {
  // Read
  start (id) {
    return resource.update({id: id}, {})
  }
}

