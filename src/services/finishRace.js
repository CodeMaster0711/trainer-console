import service from './index'

const resource = service.resource('races{/id}/finish-race')

export default {
  // Read
  finish (id) {
    return resource.update({id: id}, {})
  }
}

