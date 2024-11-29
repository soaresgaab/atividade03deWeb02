import express from "express"
import evento from "./eventosRoutes.js"
import participante from "./participanteRoutes.js"

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send('Bem vindo ao node.js')
    })
    app.use(express.json(), participante, evento)
}

export default routes