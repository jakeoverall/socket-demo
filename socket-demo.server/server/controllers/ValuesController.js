import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { valuesService } from '../services/ValuesService'

export class ValuesController extends BaseController {
  constructor() {
    super('api/values')
    this.router
      .get('', this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('', this.update)
  }

  async getAll(req, res, next) {
    try {
      return res.send(valuesService.find())
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const val = await valuesService.create(req.body)
      res.send(val)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      valuesService.update(req.body)
      res.send('neato')
    } catch (error) {
      next(error)
    }
  }
}
