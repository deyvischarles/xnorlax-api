import { Request, Response } from 'express'

class Home {
    index (req: Request, res: Response) {
        res.send({
            message: 'Bem-vindo(a) a Api Xnorlax (by Deyvis Charles: github.com/deyvischarles, linkedin.com/in/deyvischarles)'
        })
    }
}

export default new Home