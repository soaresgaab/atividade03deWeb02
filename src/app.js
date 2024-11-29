import express from 'express'
import dataBaseConnection from './config/dbConnect.js'
import routes  from './routes/index.js'

const app = express()

routes(app)

const connection = await dataBaseConnection()

connection.on("erro", (erro) => {
    console.log(erro)
})

connection.once("open", () => {
    console.log("Conexão realizada")
})

export default app