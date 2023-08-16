import { AppDataSource } from "./data-source"
import { populate } from './utils/seed'
import express from 'express'
import cors from 'cors'
import routes from './routes'

const app = express()

AppDataSource.initialize().then(async () => {
    // populate()

    app.use(cors())

    app.use(routes)
    
    app.listen(3333, () => console.log('Listening on the port ' +  3333))
}).catch(error => console.log(error))
