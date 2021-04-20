import { Router } from 'express'

// import User from './routes/user'

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

// routes.post('/register', User.register)

export default routes