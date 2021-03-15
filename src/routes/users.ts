import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import User from '../entity/User'

class Users {
    async store(req: Request, res: Response) {
        const repository = getRepository(User)

        const { name, email, password } = req.body

        const userExists = await repository.findOne({ where: { email }})

        if (userExists) {
            res.status(409).send({
                message: 'Este e-mail já exite!'
            })
        } else {
            const user = repository.create({ name, email, password })
            await repository.save(user)

            res.json(user)
        }
    }
}

export default new Users()