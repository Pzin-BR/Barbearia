//importar o Model
import Picole from '../models/picole.js'

export default class PicoleController
{

    constructor(caminhoBase = 'picole/')
    {
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>
        {
            res.render(caminhoBase + "add")
        }
            this.Excluir = async(req, res)=>{
                await Picole.findByIdAndDelete(req.params.id)
                res.redirect('/' + this.caminhoBase + 'lst')
            }
        this.add = async(req, res)=>
        {
            //cria o picole
            await Picole.create
            (
                {
                    nomePicole: req.body.nomePicole,
                    precoPicole: req.body.precoPicole,
                    saborPicole: req.body.saborPicole,
                    caloriasPicole: req.body.caloriasPicole,
                    ingredientesPicole: req.body.ingredientesPicole
                }

            )
            res.redirect('/' + caminhoBase + 'add')
        }
        this.list = async(req, res)=>{
            const resultado = await Picole.find({})
            res.render(caminhoBase + 'lst', {Picole:resultado})
        }
            //passar quem eu quero editar
            this.openEdt = async(req, res)=>{
            const id = req.params.id
            const resultado = await Picole.findById(id)
            res.render(caminhoBase + 'edt', {Picole:resultado})  
        }
        this.Edt = async(req, res)=>{
            await Picole.findByIdAndUpdate(req.params.id, req.body)
            res.redirect('/' + caminhoBase + 'lst')
        }
    }
}


