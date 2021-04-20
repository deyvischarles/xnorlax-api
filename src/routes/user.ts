import { Request, Response} from 'express'
import { PrismaClient } from '@prisma/client'
import Bcrypt from 'bcrypt'
import Verify from '../utils/verify'

class User {
    public async register (req: Request, res: Response) {
        const prisma = new PrismaClient

        let { name, email, password } = req.body

        if (Verify.isEmpyt(name)) {
            res.status(400).send({
                message: "O campo de nome está vazio!"
            })
        } else if (Verify.notName(name)) {
            res.status(400).send({
                message: "Informe um nome válido!"
            })
        } else if (Verify.isEmpyt(email)) {
            res.status(400).send({
                message: "O campo de email está vazio!"
            })
        } else if (Verify.notEmail(email)) {
            res.status(400).send({
                message: "Informe um email válido!"
            })
        } else if (await prisma.user.findUnique({ where: {email: email} })) {
            res.status(409).send({
                message: "Este email já existe!"
            })
        } else if (Verify.isEmpyt(password)) {
            res.status(400).send({
                message: "O campo de senha está vazio!"
            })
        } else if (Verify.minLength(password, 8)) {
            res.status(400).send({
                message: "Senha muito curta!"
            })
        } else if (Verify.notSecurity(password)) {
            res.status(400).send({
                message: "Senha muito fraca!",
                dicas: "Acrescente letras maiúculas, números, símbolos, e ou espaços vazios. Minimo 8 caracters"
            })
        } else {
            password = await Bcrypt.hash(password, 10)

            await prisma.user.create({ data: { name, email, password } }).then((newUser: any) => {
                newUser.password = undefined

                if (newUser) {
                    res.send({
                        message: 'Usuário cadastrado com sucesso!',
                        user: newUser
                    })
                } else {
                    res.status(400).send({
                        message: 'Não foi possível cadastrar-se!',
                        debug: newUser
                    })
                }

            }).catch((err) => {
                res.status(400).send({
                    message: 'Erro ao cadastrar-se, tente novamente mais tarde!',
                    debug: err
                })
            })
        }
    }
}

export default new User