import { Router } from 'express'
import cors from 'cors'

import Middleware from './middlewares/authenticate'

import Home from './routes/home'
import Blog from './routes/blog'
import User from './routes/user'
import Security from './routes/security'
import survey from './routes/survey'

const routes = Router()

const corsOptions = {
    origin: process.env.WHITE_LIST,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}

routes.get('/', cors({
    origin: process.env.WHITE_LIST,
    methods: ["GET"]
}), Home.index)

routes.get('/blog', Blog.index)

routes.post('/authenticate', Security.authenticate)

routes.post('/register', User.register)
routes.get('/users', cors(corsOptions), Middleware, User.getUsers)
routes.get('/user/:id', Middleware, User.getUser)
routes.patch('/user/:id/name', Middleware, User.updateName)
routes.patch('/user/:id/email', Middleware, User.updateEmail)
routes.patch('/user/:id/password', Middleware, User.updatePassword)
routes.delete('/user/:id', Middleware, User.deleteUser)

routes.post('/survey', Middleware, survey.createSurvey)

export default routes