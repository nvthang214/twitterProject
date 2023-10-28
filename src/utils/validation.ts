import { Request, Response, NextFunction } from 'express'
import { body, validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
import HTTP_STATUS from '~/constants/httpStatus'
import { EntityError, ErrorWithStatus } from '~/models/Errors'

export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req)

    const errors = validationResult(req)

    if (errors.isEmpty()) {
      return next()
    }
    const errorObject = errors.mapped()
    const entityError = new EntityError({ errors: {} }) //entityError dùng để thay thế errorObject

    for (const key in errorObject) {
      const { msg } = errorObject[key]
      if (msg instanceof ErrorWithStatus && msg.status !== 422) {
        return next(msg)
      }

      entityError.errors[key] = msg
    }
    //sau khi tổng hợp xong thì ném ra cho defaultErrorHandler xử lý
    next(entityError)
  }
}
