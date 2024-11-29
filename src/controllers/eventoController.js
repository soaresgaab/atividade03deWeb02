import evento from "../models/Evento.js";
import { participante } from "../models/Participante.js";

class eventoController {
    static async listarEventos(req, res) {
        try {
            const listaEventos = await evento.find({});
            res.status(200).json(listaEventos)
        } catch (error) {
            res.status(500).json({ message: `${error.message} Erro interno no servidor` })
        }
    }

    static async listarEventoById(req, res) {
        try {
            const id = req.params.id
            const eventoEncontrado = await evento.findById(id);
            res.status(200).json(eventoEncontrado)
        } catch (error) {
            res.status(500).json({ message: `${error.message} Erro na busca por id` })
        }
    }

    static async cadastrarEvento(req, res) {
        try {
            const eventoCadastro = await evento.create(req.body);
            res.status(200).json({ message: "evento cadastrado com sucesso", evento: eventoCadastro })
        } catch (error) {
            res.status(500).json({ message: `${error.message} Erro no cadastro` })
        }
    }

    static async patchEvento(req, res) {
        try {
            const id = req.params.id
            const eventoPatch = await evento.findByIdAndUpdate(id, req.body);
            res.status(200).json(eventoPatch)
        } catch (error) {
            res.status(500).json({ message: `${error.message} Erro na atualização por id` })
        }
    }

    static async deleteEvento(req, res) {
        try {
            const id = req.params.id
            await evento.findByIdAndDelete(id);
            res.status(200).json({ message: "evento apagado com sucesso" })
        } catch (error) {
            res.status(500).json({ message: `${error.message} Erro na exclusão por id` })
        }
    }

    static async addParticipant (req, res) {

        try {
            const { participantIds, eventId } = req.body
            if (!participantIds || !Array.isArray(participantIds)) return res.status(400).json({message: 'Invalid data.'})
            const participants = await Participant.find({
                '_id': { $in: participantIds.map(id => new mongoose.Types.ObjectId(id)) }})
            //console.log(participants, "-<")
            const events = await Event.findByIdAndUpdate(
                {_id: eventId},
                { $push: { participants: { $each: participants }}},
                { new: true } )
                res.status(201).json({message: "Success", events})
        } catch (error) {
            console.error(error)
            return res.status(500).json({message: 'Internal server error'})
        }
        

    }
    static async removeParticipant (req, res) {
        try {
            const { participantIds, eventId } = req.body
            if (!participantIds || !Array.isArray(participantIds)) return res.status(400).json({message: 'Invalid data.'})
            const participants = await Participant.find({
                '_id': { $in: participantIds.map(id => new mongoose.Types.ObjectId(id)) }})
            //console.log(participants, "-<")
            const events = await Event.findByIdAndUpdate(
                {_id: eventId},
                { $pull: { participants: { _id: participants }}},
                { new: true } )
            console.log(events)
            res.status(201).json({message: "participants removed", events})
        } catch (error) {
            console.error(error)
            return res.status(500).json({message: 'Internal server error'})
        }
    }

}
export default eventoController;


