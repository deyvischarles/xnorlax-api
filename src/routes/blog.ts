import { Request, Response } from 'express'

class Blog {
    index (req: Request, res: Response) {
        res.send({
            message: 'Blog'
        })
    }
}

export default new Blog