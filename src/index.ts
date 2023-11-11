import usersRouter from './routes/users.routes'
import express, { NextFunction, Request, Response } from 'express'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
const app = express()
app.use(express.json())

const PORT = 4000

databaseService.connect()

// localhost:3000/
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// http://localhost:3000/users/tweets
app.use('/users', usersRouter)

app.use(defaultErrorHandler)

app.listen(PORT, () => {
  console.log(`Server dang chay tren port ${PORT}`)
})
