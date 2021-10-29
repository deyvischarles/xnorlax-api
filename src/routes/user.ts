import { Request, Response} from 'express'
import { PrismaClient } from '@prisma/client'
import Bcrypt from 'bcrypt'
import Verify from '../utils/verify'
import Token from '../utils/token'

class User {
    public async register (req: Request, res: Response) {
        const prisma = new PrismaClient

        let { name, email, password, passwordConfirmation } = req.body
        let level = 1

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
        } else if (await prisma.user.findUnique({where: {email: email}})) {
            res.status(409).send({
                message: "Este email já existe!"
            })
        } else if (Verify.isEmpyt(password)) {
            res.status(400).send({
                message: "O campo de senha está vazio!"
            })
        } else if (Verify.minLength(password, 8)) {
            res.status(400).send({
                message: "Senha muito curta! Mínimo 8 caracteres."
            })
        } else if (Verify.notSecurity(password)) {
            res.status(400).send({
                message: "Senha muito fraca!",
                dicas: "Acrescente letras maiúsculas, números, símbolos e/ou espaços em branco."
            })
        } else if (Verify.isEmpyt(passwordConfirmation)) {
            res.status(400).send({
                message: "Confirme a senha!"
            })
        } else if (passwordConfirmation !== password) {
            res.status(400).send({
                message: "As senhas não coincidem!"
            })
        } else {
            password = await Bcrypt.hash(password, 10)

            await prisma.user.findMany().then((users) => {
                if (users.length === 0) {
                    level = 6
                }
            })

            await prisma.user.create({data: {name, email, password, level}}).then((newUser: any) => {
                delete newUser.password

                if (newUser) {
                    res.send({
                        message: 'Usuário cadastrado com sucesso!',
                        user: newUser,
                        token: Token.generate({id: newUser.id})
                    })
                } else {
                    res.status(400).send({
                        message: 'Não foi possível cadastrar-se!',
                        debug: newUser
                    })
                }

            }).catch((err) => {
                res.status(400).send({
                    message: 'Erro ao cadastrar-se, tente novamente ou reporte-nos!',
                    debug: err
                })
            })
        }
    }

    public async getUsers (req: Request, res: Response) {
        const prisma = new PrismaClient

        const users = await prisma.user.findMany().then((users) => {
            for (let index in users) {
                delete users[index].password
            }

            if (users.length > 0) {
                res.send({
                    acount: users.length,
                    users: users
                })
            } else {
                res.status(400).send({
                    message: 'Ainda não há usuários cadastrados!'
                })
            }
        }).catch((err) => {
            res.status(400).send({
                message: 'Erro ao procurar usuários, tente novamente mais tarde!',
                debug: err
            })
        })
    }

    public async getUser (req: Request, res: Response) {
        const prisma = new PrismaClient

        const user = await prisma.user.findUnique({where: {id: req.params.id}}).then((user: any) => {
            delete user.password
            res.send(user)
        }).catch(() => {
            res.status(400).send({
                message: 'Usuário não encontrado!'
            })
        })
    }

    public async updateName (req: Request, res: Response) {
        const prisma = new PrismaClient

        if (! await prisma.user.findUnique({where: {id: req.params.id}})) {
            res.status(400).send({
                message: "Usuário não encontrado!"
            })
        } else if (req.userId != req.params.id) {
            res.send({
                message: "Tentativa Negada!"
            })
        } else if (Verify.isEmpyt(req.body.name)) {
            res.status(400).send({
                message: "O campo de nome está vazio!"
            })
        } else if (Verify.notName(req.body.name)) {
            res.status(400).send({
                message: "Informe um nome válido!"
            })
        } else {
            const userUpdate = await prisma.user.update({
                where: { id: req.params.id },
                data: { name: req.body.name }
            }).then((userUpdate) => {
                if (userUpdate) {
                    res.send({
                        message: 'Usuário atualizado com sucesso!'
                    })
                } else {
                    res.status(400).send({
                        message: 'Não foi possível atualizar usuário!'
                    })
                }
            }).catch((err) => {
                res.status(400).send({
                    message: 'Erro ao atualizar usuário, tente novamente mais tarde!',
                    debug: err
                })
            })
        }
    }

    public async updateEmail (req: Request, res: Response) {
        const prisma = new PrismaClient

        if (! await prisma.user.findUnique({where: {id: req.params.id}})) {
            res.status(400).send({
                message: "Usuário não encontrado!"
            })
        } else if (req.userId != req.params.id) {
            res.send({
                message: "Tentativa Negada!"
            })
        } else if (Verify.isEmpyt(req.body.email)) {
            res.status(400).send({
                message: "O campo de email está vazio!"
            })
        } else if (Verify.notEmail(req.body.email)) {
            res.status(400).send({
                message: "Informe um email válido!"
            })
        } else if (await prisma.user.findUnique({where: {email: req.body.email}})) {
            res.status(409).send({
                message: "Este email não está disponivél!"
            })
        } else {
            const userUpdate = await prisma.user.update({
                where: { id: req.params.id },
                data: { email: req.body.email }
            }).then((userUpdate) => {
                if (userUpdate) {
                    res.send({
                        message: 'Email atualizado com sucesso!'
                    })
                } else {
                    res.status(400).send({
                        message: 'Não foi possível atualizar o email!'
                    })
                }
            }).catch((err) => {
                res.status(400).send({
                    message: 'Erro ao atualizar email, tente novamente mais tarde!',
                    debug: err
                })
            })
        }
    }

    public async updatePassword (req: Request, res: Response) {
        const prisma = new PrismaClient

        if (! await prisma.user.findUnique({where: {id: req.params.id}})) {
            res.status(400).send({
                message: "Usuário não encontrado!"
            })
        } else if (req.userId != req.params.id) {
            res.send({
                message: "Tentativa Negada!"
            })
        } else if (Verify.isEmpyt(req.body.password)) {
            res.status(400).send({
                message: "O campo de senha está vazio!"
            })
        } else if (Verify.minLength(req.body.password, 8)) {
            res.status(400).send({
                message: "Senha muito curta!"
            })
        } else if (Verify.notSecurity(req.body.password)) {
            res.status(400).send({
                message: "Senha muito Fraca!",
                dicas: "Acrescente letras maiúsculas, números, símbolos e/ou espaços vazios. Mínimo 8 caracteres"
            })
        } else {
            const password = await Bcrypt.hash(req.body.password, 10)

            const userUpdate = await prisma.user.update({
                where: {id: req.params.id},
                data: {password: password}
            }).then((userUpdate) => {
                if (userUpdate) {
                    res.send({
                        message: 'Senha atualizada com sucesso!'
                    })
                } else {
                    res.status(400).send({
                        message: 'Não foi possível atualizar a senha!'
                    })
                }
            }).catch((err) => {
                res.status(400).send({
                    message: 'Erro ao atualizar senha, tente novamente mais tarde!',
                    debug: err
                })
            })
        }
    }

    public async deleteUser (req: Request, res: Response) {
        const prisma = new PrismaClient

        if (! await prisma.user.findUnique({where: {id: req.params.id}})) {
            res.status(400).send({
                message: 'Usuário não encontrado!'
            })
        } else if (req.userId != req.params.id) {
            res.send({
                message: "Tentativa Negada!"
            })
        } else {
            const userDelete = await prisma.user.delete({where: {id: req.params.id}}).then((userDelete) => {
                if (userDelete) {
                    res.send({
                        message: 'Usuário apagado com sucesso!',
                        userId: req.userId
                    })
                } else {
                    res.status(400).send({
                        message: 'Não foi possível pagar este usuário!'
                    })
                }
            }).catch((err) => {
                res.status(400).send({
                    message: 'Erro ao apagar usuário, tente novamente mais tarde!',
                    debug: err
                })
            })
        }
    }
}

export default new User