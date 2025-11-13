import conexao from '../config/conexao.js'

const Barbeiro = conexao.Schema({
    nomeBarbeiro: {type:String, required:true},
    especialidadeBarbeiro: {type:String, required:true},
    telefoneBarbeiro: {type:String, required:true},
    emailBarbeiro: {type:String, required:true},
    senhaBarbeiro: {type:String, required:true},
})

export default conexao.model('Barbeiro',Barbeiro)