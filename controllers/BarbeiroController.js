import Barbeiro from '../models/barbeiro.js'

export default class BarbeiroController
{
    constructor(caminhoBase = 'barbeiro/')
    {
        this.caminhoBase = caminhoBase

        this.openAdd = async(req, res)=>
        {
            res.render(this.caminhoBase + "add", { old: {}, error: null })
        }

        this.add = async(req, res)=>
        {
            try {
                const { nomeBarbeiro, especialidadeBarbeiro, telefoneBarbeiro, emailBarbeiro, senhaBarbeiro } = req.body

                // validação simples
                if (!nomeBarbeiro || !especialidadeBarbeiro) {
                    return res.render(this.caminhoBase + "add", { old: req.body, error: 'Preencha os campos obrigatórios.' })
                }

                await Barbeiro.create({
                    nomeBarbeiro,
                    especialidadeBarbeiro,
                    telefoneBarbeiro,
                    emailBarbeiro,
                    senhaBarbeiro
                })

                // redireciona para a lista após salvar
                return res.redirect('/' + this.caminhoBase + 'lst')
            } catch (err) {
                console.error(err)
                return res.render(this.caminhoBase + "add", { old: req.body, error: 'Erro ao salvar barbeiro.' })
            }
        }

        this.list = async(req, res)=>
        {
            const resultado = await Barbeiro.find({})
            res.render(this.caminhoBase + 'lst', { Barbeiro: resultado })
        }

        this.openEdt = async(req, res)=>
        {
            const id = req.params.id
            const resultado = await Barbeiro.findById(id)
            res.render(this.caminhoBase + 'edt', { Barbeiro: resultado, error: null })
        }

        this.Edt = async(req, res)=>
        {
            const id = req.params.id
            // não sobrescrever senha se vazio
            const update = { ...req.body }
            if (!update.senhaBarbeiro) delete update.senhaBarbeiro

            await Barbeiro.findByIdAndUpdate(id, update)
            res.redirect('/' + this.caminhoBase + 'lst')
        }

        this.Excluir = async(req, res)=>
        {
            await Barbeiro.findByIdAndDelete(req.params.id)
            res.redirect('/' + this.caminhoBase + 'lst')
        }
    }
}