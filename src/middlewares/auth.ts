import {Request, Response, NextFunction} from 'express'

export const authentication = (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user

    if(!user) return res.sendStatus(403)

    return next()
}




