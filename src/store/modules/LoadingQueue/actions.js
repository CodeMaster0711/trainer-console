import * as types from '../../mutation-types.js'

const actions = {
  addTaskToQueue ({ commit, state }, task) {
    commit(types.ADD_TASK_TO_QUEUE, {
      queue: task
    })
  },
  removeTaskFromQueue ({ commit, state }, task) {
    commit(types.REMOVE_TASK_FROM_QUEUE, {
      queue: task
    })
  }
}

export default actions
