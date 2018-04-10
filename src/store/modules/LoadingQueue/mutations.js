import * as types from '../../mutation-types'

const mutations = {
  [types.ADD_TASK_TO_QUEUE] (state, { queue }) {
    state.queue.push(queue)
  },
  [types.REMOVE_TASK_FROM_QUEUE] (state, { queue }) {
    state.queue = state.queue.filter((task) => {
      return task !== queue
    })
  }
}

export default mutations
