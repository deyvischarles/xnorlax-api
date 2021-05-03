import express, { json } from 'express'
import routes from './routes'

const app = express()

if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https') {
            res.redirect(`https://${req.header('host')}${req.url}`)
        } else {
            next()
        }
    })
}

app.use(json())
app.use(routes)

app.use((req, res, next) => {
    res.status(404).json({
        title: '404',
        message: 'Página não encontrada!'
    })
})

app.listen(process.env.PORT || 3000)
