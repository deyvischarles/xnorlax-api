import express, { json } from 'express'
import routes from './src/routes.js'

const app = express()

app.use(json())
app.use(routes)

app.use((req, res, next) => {
	res.status(404).send({
		title: '404',
		message: 'Página não encontrada!'
	})
})

app.listen(process.env.PORT || 3000)