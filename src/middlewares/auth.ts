import { Request, Response, NextFunction } from 'express'
import { taskModel } from '../models/task.model'

export const authentication = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user

  if (!user) return res.sendStatus(403)

  return next()
}

export const authorization = async (req: Request, res: Response, next: NextFunction) => {
  const userId = res.locals.user._doc.user_id
  const id = req.params.id

  const task = await taskModel.findOne({task_id: id})
  if (!task) {
    return res.status(404).json({
      status: false,
      statusCode: 404,
      message: `Task with ID ${id} not found`
    })
  }

  if (task.user_id !== userId) {
    return res.status(403).json({
      status: false,
      statusCode: 403,
      message: 'Forbidden: You are not allowed to perform this action on this task.'
    })
  }

  return next()

}
