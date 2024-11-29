import mongoose from "mongoose";
import { participanteSchema } from "./Participante.js";

const eventoSchema = new mongoose.Schema({
    
        id:{type:mongoose.Schema.Types.ObjectId} ,
        titulo: {type:String, require:true},
        descricao: {type:String},
        data: {type:Date},
        local: {type:String},
        participante: [participanteSchema],
        
      
},{versionKey: false})

const evento = mongoose.model('events', eventoSchema)
export default evento
