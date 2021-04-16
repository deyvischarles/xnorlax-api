import express, { json } from 'express'
import routes from './routes'

const app = express()

app.use(json())
app.use(routes)

app.use((req, res, next) => {
    res.status(404).json({
        title: '404',
        message: 'Página não encontrada!'
    })
})

app.listen(process.env.PORT || 3000)
