import { Router } from 'express'

const routes = Router()

routes.get('/', (req, res) => {
    res.json({
        message: 'Bem-vindo(a) a Api Xnorlax (by Deyvis Charles: github.com/deyvischarles, linkedin.com/in/deyvischarles)'
    })
})

routes.get('/blog', (req, res) => {
    res.json({
        message: 'Blog'
    })
})

export default routes