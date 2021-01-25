import socketService from './SocketService'

const values = []

class ValuesService {
  async find(query = {}) {
    // const values = await dbContext.Values.find(query)
    return values
  }

  async findById(id) {
    return values.find(v => v.id === id)
  }

  async create(val) {
    val.id = ~~(Math.random() * 900000)
    addOrUpdate(values, val)
    socketService.messageRoom('general', 'create:value', val)
    return val
  }

  update(val) {
    addOrUpdate(values, val)
    socketService.messageRoom('general', 'update:value', val)
  }
}

export function addOrUpdate(arr, item) {
  const i = arr.findIndex(i => i.id === item.id)
  if (i !== -1) {
    return arr.splice(i, 1, item)
  }
  arr.push(item)
}

export const valuesService = new ValuesService()
