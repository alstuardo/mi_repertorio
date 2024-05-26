import express from 'express'
import cors from 'cors'
import cancionesRouter from '../routes/canciones.routes.js'

const app = express()
app.use(cors())

const PORT = process.env.PORT ?? 3000

app.use(express.json())
app.use('/', cancionesRouter)

app.listen(PORT, console.log(`Server Up 🕹  http://localhost:${PORT}`))

export default app
