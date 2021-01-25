import { addOrUpdate, AppState } from '../AppState'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super()

    this
      .on('create:value', this.onBid)
      .on('update:value', this.onBid)
  }

  authenticate(bearerToken) {
    this.socket.emit('authenticate', bearerToken)
  }

  onBid(item) {
    addOrUpdate(AppState.items, item)
  }
}

export const socketService = new SocketService()
