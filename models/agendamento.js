import conexao from '../config/conexao.js'

const Agendamento = conexao.Schema({
    dataAgendamento: {type:Date, required:true},
    horaAgendamento: {type: String,required: true},
    statusAgendamento: {type:String, required:true},
    cliente: {type:conexao.Schema.Types.ObjectId, ref:'Cliente', required:true},
    barbeiro: {type:conexao.Schema.Types.ObjectId, ref:'Barbeiro', required:true},
    servico: {type:conexao.Schema.Types.ObjectId, ref:'Servico', required:true}

}) 

export default conexao.model('Agendamento',Agendamento)