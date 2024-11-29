import mongoose from "mongoose";

const participanteSchema = new mongoose.Schema({
    
        id:{type:mongoose.Schema.Types.ObjectId} ,
        nome: {type:String, require:true},
        curso: {type:String}, 
      
},{versionKey: false})

const participante = mongoose.model('participants', participanteSchema)
export {participante, participanteSchema}
