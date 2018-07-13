import Checkit from 'checkit'
import moment from 'moment'

Checkit.Validator.prototype.laterThan = function(val, param) {

  const today = moment().format('YYYY-MM-DD')

  const first = moment(`${today} ${this._target[param]}`)

  const last = moment(`${today} ${val}`)

  console.log(first, last, last.diff(first) <= 0)

  if(last.diff(first) <= 0) throw new Error(`must be after than the ${param}`)

  return true

}
