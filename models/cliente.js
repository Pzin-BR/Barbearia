import conexao from '../config/conexao.js'

const Cliente = conexao.Schema({
    nomeCliente: {type:String, required:true},
    telefoneCliente: {type:String, required:true},
    emailCliente: {type:String, required:true},
    senhaCliente: {type:String, required:true},
})

export default conexao.model('Cliente',Cliente)