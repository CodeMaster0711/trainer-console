import * as moment from 'moment'

function Date (date) {
  return moment(date).format('MMMM Do YYYY, h:mm:ss a')
}

export default Date
