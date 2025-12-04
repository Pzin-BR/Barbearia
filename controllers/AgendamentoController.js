import Agendamento from '../models/agendamento.js';
import Cliente from '../models/cliente.js';
import Barbeiro from '../models/barbeiro.js';
import Servico from '../models/servico.js';
import fs from 'fs';

export default class AgendamentoController {

constructor (caminhoBase = 'agendamento/') {
    this.caminhoBase = caminhoBase;

    this.openAdd = async (req, res) => {
    try {
        const clientes = await Cliente.find({});
        const barbeiros = await Barbeiro.find({});
        const servicos = await Servico.find({});
        res.render(this.caminhoBase + 'add', { clientes, barbeiros, servicos, old: {}, error: null });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro interno');
    }
    };

    this.add = async (req, res) => {
    try {
        const { dataAgendamento, horaAgendamento, statusAgendamento, cliente, barbeiro, servico } = req.body;

        if (!dataAgendamento || !horaAgendamento || !statusAgendamento || !cliente || !barbeiro || !servico) {
        const clientes = await Cliente.find({});
        const barbeiros = await Barbeiro.find({});
        const servicos = await Servico.find({});
        return res.render(this.caminhoBase + 'add', { clientes, barbeiros, servicos, old: req.body, error: 'Preencha todos os campos.' });
        }

        const imagemCorte = req.file ? '/uploads/agendamentos/' + req.file.filename : null;

        await Agendamento.create({
        dataAgendamento: new Date(dataAgendamento),
        horaAgendamento,
        statusAgendamento,
        cliente,
        barbeiro,
        servico,
        imagemCorte
        });

        res.redirect('/' + this.caminhoBase + 'lst');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao salvar agendamento');
    }
    };

    this.list = async (req, res) => {
    try {
        const { busca, filtroStatus } = req.query;
        let filtro = {};

        // Filtrar por status
        if (filtroStatus && filtroStatus !== '') {
            filtro.statusAgendamento = filtroStatus;
        }

        // Buscar por cliente, barbeiro ou serviço
        if (busca && busca.trim() !== '') {
            const regex = new RegExp(busca, 'i'); // case-insensitive
            
            const clientes = await Cliente.find({ nomeCliente: regex });
            const barbeiros = await Barbeiro.find({ nomeBarbeiro: regex });
            const servicos = await Servico.find({ nomeServico: regex });

            const clienteIds = clientes.map(c => c._id);
            const barbeiroIds = barbeiros.map(b => b._id);
            const servicoIds = servicos.map(s => s._id);

            filtro.$or = [
                { cliente: { $in: clienteIds } },
                { barbeiro: { $in: barbeiroIds } },
                { servico: { $in: servicoIds } }
            ];
        }

        const resultado = await Agendamento.find(filtro)
            .populate('cliente barbeiro servico')
            .sort({ dataAgendamento: -1 });

        res.render(this.caminhoBase + 'lst', { 
            Agendamento: resultado,
            busca: busca || '',
            filtroStatus: filtroStatus || ''
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar agendamentos');
    }
    };

    this.openEdt = async (req, res) => {
    const id = req.params.id;
    const resultado = await Agendamento.findById(id).populate('cliente barbeiro servico');
    res.render(this.caminhoBase + 'edt', { Agendamento: resultado });
    };

    this.Edt = async (req, res) => {
    try {
        const agendamento = await Agendamento.findById(req.params.id);
        
        // Se uma nova imagem foi enviada, delete a antiga
        if (req.file && agendamento.imagemCorte) {
        const caminhoAntigo = 'public' + agendamento.imagemCorte;
        if (fs.existsSync(caminhoAntigo)) {
            fs.unlinkSync(caminhoAntigo);
        }
        }

        const dados = req.body;
        if (req.file) {
        dados.imagemCorte = '/uploads/agendamentos/' + req.file.filename;
        }

        await Agendamento.findByIdAndUpdate(req.params.id, dados);
        res.redirect('/' + this.caminhoBase + 'lst');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao atualizar agendamento');
    }
    };

    this.Excluir = async (req, res) => {
    try {
        const agendamento = await Agendamento.findById(req.params.id);
        
        // Deletar imagem se existir
        if (agendamento.imagemCorte) {
        const caminhoImagem = 'public' + agendamento.imagemCorte;
        if (fs.existsSync(caminhoImagem)) {
            fs.unlinkSync(caminhoImagem);
        }
        }

        await Agendamento.findByIdAndDelete(req.params.id);
        res.redirect('/' + this.caminhoBase + 'lst');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao excluir agendamento');
    }
    };
}
}