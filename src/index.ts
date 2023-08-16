import { AppDataSource } from "./data-source"
import { populate } from './utils/seed'
import express from 'express'
import cors from 'cors'
import routes from './routes'

const app = express()

AppDataSource.initialize().then(async () => {
    app.use(cors())

    app.use(routes)
    
    app.listen(process.env.PORT, () => console.log('Listening on the port ' +  process.env.PORT))
}).catch(error => console.log(error))
