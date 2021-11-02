import { Request, Router } from 'express'
import cors from 'cors'
import Middleware from './middlewares/authenticate'

import Home from './routes/home'
import Blog from './routes/blog'
import User from './routes/user'
import Security from './routes/security'
import survey from './routes/survey'

const routes = Router()

const whitelist = process.env.WHITE_LIST
const corsOptions = (req: Request, callback: any) => {
    let corsOptions = {}

    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
    }
    
    callback(null, corsOptions)
}

routes.get('/', cors(), Home.index)
routes.get('/blog', cors(), Blog.index)

routes.post('/authenticate', cors(corsOptions), Security.authenticate)

routes.post('/register', cors(corsOptions), User.register)
routes.get('/users', cors(corsOptions), Middleware, User.getUsers)
routes.get('/user/:id', cors(corsOptions), Middleware, User.getUser)
routes.patch('/user/:id/name', cors(corsOptions), Middleware, User.updateName)
routes.patch('/user/:id/email', cors(corsOptions), Middleware, User.updateEmail)
routes.patch('/user/:id/password', cors(corsOptions), Middleware, User.updatePassword)
routes.delete('/user/:id', cors(corsOptions), Middleware, User.deleteUser)

routes.post('/survey', cors(corsOptions), Middleware, survey.createSurvey)

export default routes