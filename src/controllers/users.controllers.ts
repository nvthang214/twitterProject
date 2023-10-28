import { NextFunction, Request, Response } from 'express'
import { LoginReqBody, LogoutReqBody, ResgisterReqBody } from '~/models/requests/User.request'
import usersService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import User from '~/models/schemas/User.schema'
import { ObjectId } from 'mongodb'
import { USERS_MESSAGES } from '~/constants/messages'

export const loginController = async (req: Request<ParamsDictionary, any, LoginReqBody>, res: Response) => {
  const user = req.user as User
  const user_id = user._id as ObjectId // object id
  const result = await usersService.login(user_id.toString())
  return res.json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, ResgisterReqBody>, res: Response) => {
  const result = await usersService.register(req.body)
  res.json({
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    result
  })
}

export const logoutController = async (req: Request<ParamsDictionary, any, LogoutReqBody>, res: Response) => {
  // lấy refresh token từ body
  const { refresh_token } = req.body
  // logout: vào database xóa refresh token đó
  const result = await usersService.logout(refresh_token)
  res.json(result)
}
