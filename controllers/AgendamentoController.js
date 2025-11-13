import Agendamento from '../models/agendamento.js';
import Cliente from '../models/cliente.js';
import Barbeiro from '../models/barbeiro.js';
import Servico from '../models/servico.js';

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
        console.log(req.body);
        const { dataAgendamento, horaAgendamento, statusAgendamento, cliente, barbeiro, servico } = req.body;

        if (!dataAgendamento || !horaAgendamento || !statusAgendamento || !cliente || !barbeiro || !servico) {
        const clientes = await Cliente.find({});
        const barbeiros = await Barbeiro.find({});
        const servicos = await Servico.find({});
        return res.render(this.caminhoBase + 'add', { clientes, barbeiros, servicos, old: req.body, error: 'Preencha todos os campos.' });
        }

        await Agendamento.create({
        dataAgendamento: new Date(dataAgendamento),
        horaAgendamento,
        statusAgendamento,
        cliente,
        barbeiro,
        servico
        });

        res.redirect('/' + this.caminhoBase + 'lst');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao salvar agendamento');
    }
    };

    this.list = async (req, res) => {
    const resultado = await Agendamento.find({}).populate('cliente barbeiro servico');
    res.render(this.caminhoBase + 'lst', { Agendamento: resultado });
    };

    this.openEdt = async (req, res) => {
    const id = req.params.id;
    const resultado = await Agendamento.findById(id);
    res.render(this.caminhoBase + 'edt', { Agendamento: resultado });
    };

    this.Edt = async (req, res) => {
    await Agendamento.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/' + this.caminhoBase + 'lst');
    };

    this.Excluir = async (req, res) => {
    await Agendamento.findByIdAndDelete(req.params.id);
    res.redirect('/' + this.caminhoBase + 'lst');
    };
}
}