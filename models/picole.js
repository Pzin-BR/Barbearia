import conexao from '../config/conexao.js'

const Picole = conexao.Schema({
    nomePicole: {type:String, required:true},
    precoPicole: {type:Number, required:true},
    saborPicole: {type:String, required:true},
    caloriasPicole: {type:Number, required:true},
    ingredientesPicole: {type:String, required:true}
})

export default conexao.model('Picole',Picole)