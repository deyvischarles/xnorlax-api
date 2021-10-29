import { Request, Response} from 'express'
import { PrismaClient } from '@prisma/client'
import Verify from '../utils/verify'

class Survey {
    async createSurvey (req: Request, res: Response) {
        const prisma = new PrismaClient

        const { title, description } = req.body
        const userId = req.userId

        const user = await prisma.user.findUnique({where: {id: userId}})

        if (Verify.isEmpyt(title)) {
            res.status(400).send({
                message: "O campo do título está vazio!"
            })
        } else if (Verify.isEmpyt(description)) {
            res.status(400).send({
                message: "O campo de Descrição está vazio!"
            })
        } else if (user.level <= 3) {
            res.status(409).send({
                message: "Você não possui privilegios para cadastrar!"
            })
        } else {
            await prisma.survey.create({data: {title, description, userId}}).then((newSurvey: any) => {
                if (newSurvey) {
                    res.send({
                        message: 'Pesquisa cadastrada com sucesso!',
                        survey: newSurvey
                    })
                } else {
                    res.status(400).send({
                        message: 'Não foi possível cadastrar a pesquisa!',
                        debug: newSurvey
                    })
                }
            }).catch((err) => {
                res.status(400).send({
                    message: 'Erro ao tentar cadastrar, tente novamente ou reporte-nos!',
                    debug: err
                })
            })
        }
    }
}

export default new Survey