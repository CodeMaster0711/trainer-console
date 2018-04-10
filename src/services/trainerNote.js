import service from './index'

const resource = service.resource('races{/id}/note')

export default {
  updateNote (data) {
    return resource.update({id: data.id}, data.note)
  }
}

