import { Request, Response} from 'express'
import { PrismaClient } from '@prisma/client'
import Bcrypt from 'bcrypt'
import Verify from '../utils/verify'
import Token from '../utils/token'

class Security {
    public async authenticate (req: Request, res: Response) {
        if (Verify.EmpytObject(req.body)) {
            res.status(400).send({
                message: "Os dados de login não foram enviados!"
            })
        } else {
            const { email, password } = req.body

            const prisma = new PrismaClient

            const user: any = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })

            if (Verify.isEmpyt(email)) {
                res.status(400).send({
                    message: "O campo de email está vazio!"
                })
            } else if (Verify.notEmail(email)) {
                res.status(400).send({
                    message: "Informe um email válido!"
                })
            } else if (!await user) {
                res.status(401).send({
                    message: 'Email ou senha incorreto!'
                })
            } else if (Verify.isEmpyt(password)) {
                res.status(400).send({
                    message: "O campo de senha está vazio!"
                })
            } else if (!await Bcrypt.compare(password, user.password)) {
                res.status(401).send({
                    message: 'Email ou senha incorreto!'
                })
            } else {
                delete user.password
    
                res.send({
                    message: 'Acesso Autorizado!',
                    user: user,
                    token: Token.generate({id: user.id})
                })
            }
        }
    }
}

export default new Security