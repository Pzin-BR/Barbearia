import conexao from '../config/conexao.js'

const Sabores = conexao.Schema({
    nomeSabor: {type:String, required:true},
    descricaoSabor: {type:String, required:true},
}) 

export default conexao.model('Sabores',Sabores)