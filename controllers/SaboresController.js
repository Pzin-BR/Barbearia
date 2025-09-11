import Sabores from '../models/sabores.js'; 

export default class SaboresController{

    constructor (caminhoBase = 'sabores/'){
        this.caminhoBase = caminhoBase

        this.openAdd = async(req, res)=>
        {
            res.render(caminhoBase + "add")
        }
            this.Excluir = async(req, res)=>{
                await Sabores.findByIdAndDelete(req.params.id)
                res.redirect('/' + this.caminhoBase + 'lst')
            }

        this.add = async(req, res)=>
        {
            //cria o jogo
            console.log(req.body) //Veja o que está chegando do formulário
            await Sabores.create
            (
                {
                    nomeSabor: req.body.nomeSabor,
                    descricaoSabor: req.body.descricaoSabor
                }

                            )
            res.redirect('/' + caminhoBase + 'add')
        }

        this.list = async(req, res)=>{
            const resultado = await Sabores.find({})
            res.render(caminhoBase + 'lst', {Sabores:resultado})
        }

        this.list = async(req, res)=>
        {
            const resultado = await Sabores.find({})
            res.render(caminhoBase + 'lst', {Sabores:resultado})
        }
        this.openEdt = async(req, res)=>
        {
            //passar quem eu quero editar
            const id = req.params.id
            const resultado = await Sabores.findById(id)
            res.render(caminhoBase + 'edt', {Sabores:resultado})  
        }
                    this.Edt = async(req, res)=>{
                await Sabores.findByIdAndUpdate(req.params.id, req.body)
                res.redirect('/' + this.caminhoBase + 'lst')
            }
    }
}
