import { Router } from 'express'

import Home from './routes/home'
import Blog from './routes/blog'
import User from './routes/user'
import Security from './routes/security'

const routes = Router()

routes.get('/', Home.index)
routes.get('/blog', Blog.index)
routes.post('/register', User.register)
routes.post('/authenticate', Security.authenticate)

export default routes