//importar o Model
import Cliente from '../models/cliente.js'

export default class ClienteController
{

    constructor(caminhoBase = 'cliente/')
    {
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>
        {
            res.render(caminhoBase + "add")
        }
            this.Excluir = async(req, res)=>{
                await Cliente.findByIdAndDelete(req.params.id)
                res.redirect('/' + this.caminhoBase + 'lst')
            }
        this.add = async(req, res)=>
        {
            //cria o cliente
            await Cliente.create
            (
                {
                    nomeCliente: req.body.nomeCliente,
                    telefoneCliente: req.body.telefoneCliente,
                    emailCliente: req.body.emailCliente,
                    senhaCliente: req.body.senhaCliente
                }
            )
            res.redirect('/' + caminhoBase + 'add')
        }
        this.list = async(req, res)=>{
            const resultado = await Cliente.find({})
            res.render(caminhoBase + 'lst', {Cliente:resultado})
                }
        this.list = async(req, res)=>{
            const resultado = await Cliente.find({})
            res.render(caminhoBase + 'lst', {Cliente:resultado})
        }
            //passar quem eu quero editar
            this.openEdt = async(req, res)=>{
            const id = req.params.id
            const resultado = await Cliente.findById(id)
            res.render(caminhoBase + 'edt', {Cliente:resultado})  
        }
        this.Edt = async(req, res)=>{
            await Cliente.findByIdAndUpdate(req.params.id, req.body)
            res.redirect('/' + caminhoBase + 'lst')
        }
    }
}

