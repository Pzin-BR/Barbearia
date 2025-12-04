import Servico from '../models/servico.js'
import conexao from '../config/conexao.js'

export default class ServicoController
{
    constructor(caminhoBase = 'servico/')
    {
        this.caminhoBase = caminhoBase

        this.openAdd = async(req, res)=>
        {
            res.render(this.caminhoBase + "add", { old: {}, error: null })
        }

        this.add = async(req, res)=>
        {
            try {
                const { nomeServico, descricaoServico, precoServico, duracaoServico } = req.body

                if (!nomeServico || !descricaoServico || !precoServico || !duracaoServico) {
                    return res.render(this.caminhoBase + "add", { old: req.body, error: 'Preencha todos os campos obrigatórios.' })
                }

                // converte para Decimal128 se disponível, senão salva o valor como está
                const precoDecimal = (conexao && conexao.Types && conexao.Types.Decimal128)
                    ? conexao.Types.Decimal128.fromString(String(precoServico))
                    : parseFloat(precoServico)

                await Servico.create({
                    nomeServico,
                    descricaoServico,
                    precoServico: precoDecimal,
                    duracaoServico
                })

                return res.redirect('/' + this.caminhoBase + 'lst')
            } catch (err) {
                console.error(err)
                return res.render(this.caminhoBase + "add", { old: req.body, error: 'Erro ao salvar serviço.' })
            }
        }

        this.list = async (req, res) => {
            try {
                const { busca } = req.query;
                let filtro = {};

                if (busca && busca.trim() !== '') {
                    const regex = new RegExp(busca, 'i');
                    filtro.$or = [
                        { nomeServico: regex },
                        { descricaoServico: regex }
                    ];
                }

                const resultado = await Servico.find(filtro).sort({ nomeServico: 1 });
                res.render(this.caminhoBase + 'lst', { 
                    Servico: resultado,
                    busca: busca || ''
                });
            } catch (err) {
                console.error(err);
                res.status(500).send('Erro ao buscar serviços');
            }
        }

        this.openEdt = async(req, res)=>
        {
            const id = req.params.id
            const resultado = await Servico.findById(id)
            res.render(this.caminhoBase + 'edt', { Servico: resultado, error: null })
        }

        this.Edt = async(req, res)=>
        {
            const id = req.params.id
            const update = { ...req.body }
            if (update.precoServico) {
                update.precoServico = (conexao && conexao.Types && conexao.Types.Decimal128)
                    ? conexao.Types.Decimal128.fromString(String(update.precoServico))
                    : parseFloat(update.precoServico)
            }
            await Servico.findByIdAndUpdate(id, update)
            res.redirect('/' + this.caminhoBase + 'lst')
        }

        this.Excluir = async(req, res)=>
        {
            await Servico.findByIdAndDelete(req.params.id)
            res.redirect('/' + this.caminhoBase + 'lst')
        }
    }
}