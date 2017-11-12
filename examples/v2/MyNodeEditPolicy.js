import EditPolicy from '../../src/editPolicy'

class MyEditPolicy extends EditPolicy {
  getCommand(request) {
    console.log(request.type)
    return null
  }
}

export default MyEditPolicy
