import conexao from '../config/conexao.js'

const Servico = conexao.Schema({
    nomeServico: {type:String, required:true},
    descricaoServico: {type:String, required:true},
    precoServico: {type: conexao.Schema.Types.Decimal128, required:true},
    duracaoServico: {type:String, required:true}
})

export default conexao.model('Servico',Servico)