import { Request, Response } from 'express'
import { ResgisterReqBody } from '~/models/requests/User.request'
import usersService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'test@gmail.com' && password === '123456') {
    return res.json({
      message: 'Login successfully',
      result: [
        { name: 'Diep', yob: 1999 },
        { name: 'Hung', yob: 2004 },
        { name: 'Duoc', yob: 1999 }
      ]
    })
  }
  return res.status(400).json({
    error: 'Login failed'
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, ResgisterReqBody>, res: Response) => {
  try {
    const result = await usersService.register(req.body)
    res.json({
      message: 'Register successfully',
      result
    })
  } catch (error) {
    res.status(400).json({
      message: 'Register failed',
      error
    })
  }
}
