import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export default function authenticate (req: Request, res: Response, next: NextFunction) {
    // res.header('Access-Control-Allow-Origin', process.env.WHITELIST)
    // res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE')

    const { authorization } = req.headers

    if (!authorization) {
        res.status(401).send({
            message: 'Nenhum Token encontrado!'
        })
    } else {
        const parts = authorization.split(' ')

        if (parts.length !== 2) {
            res.status(401).send({
                message: 'Token mau formatado!'
            })
        } else {
            const [ scheme, token ] = parts
    
            if (!/^Bearer$/i.test(scheme)) {
                res.status(401).send({
                    message: 'Token desconhecido!'
                })
            } else if (!process.env.SECRET_KEY) {
                res.status(401).send({
                    message: 'Variável de ambiente ausente!'
                })
            } else {
                const hash = process.env.SECRET_KEY

                jwt.verify(token, hash, (err, decoded: any) => {
                    if (err) {
                        res.status(401).send({
                            message: 'Token inválido!'
                        })
                    } else {
                        req.userId = decoded.id
                        return next()
                    }
                })
            }
        }
    }
}
