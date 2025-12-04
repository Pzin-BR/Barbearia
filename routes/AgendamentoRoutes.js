import express from 'express'
const router = express.Router()

import AgendamentoController from '../controllers/AgendamentoController.js'
const controle = new AgendamentoController()

const caminhobase = 'agendamento/'
const caminhoBaseCliente= 'agendamentoCliente/'

router.get('/' + caminhobase + 'add', controle.openAdd)
router.post('/' + caminhobase + 'add', controle.add)
router.get('/' + caminhobase + 'lst', controle.list)
router.get('/' + caminhobase + 'edt/:id', controle.openEdt)
router.post('/' + caminhobase + 'edt/:id', controle.Edt)
router.get('/' + caminhobase + 'del/:id', controle.Excluir)
router.get('/' + caminhoBaseCliente + 'add', controle.openAdd)
router.post('/' + caminhoBaseCliente + 'add', controle.add)
router.get('/' + caminhoBaseCliente + 'lst', controle.list)
router.get('/' + caminhoBaseCliente + 'edt/:id', controle.openEdt)
router.post('/' + caminhoBaseCliente + 'edt/:id', controle.Edt)
router.get('/' + caminhoBaseCliente + 'del/:id', controle.Excluir)
export default router