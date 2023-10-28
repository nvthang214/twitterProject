import { NextFunction, Request, Response } from 'express'
import { ResgisterReqBody } from '~/models/requests/User.request'
import usersService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
export const loginController = async (req: Request, res: Response) => {
  const { user }: any = req
  const user_id = user._id // object id
  const result = await usersService.login(user_id.toString())
  return res.json({
    message: 'Login successfully',
    result
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, ResgisterReqBody>, res: Response) => {
  const result = await usersService.register(req.body)
  res.json({
    message: 'Register successfully',
    result
  })
}
