import express from 'express'
const router = express.Router()

//busca o ClienteController

import ClienteController from '../controllers/ClienteController.js'
const controle = new ClienteController()

const caminhobase = 'cliente/'

router.get('/' + caminhobase + 'add', controle.openAdd)
router.post('/' + caminhobase + 'add', controle.add)
router.get('/' + caminhobase + 'lst', controle.list)
router.get('/' + caminhobase + 'edt/:id', controle.openEdt)
router.post('/' + caminhobase + 'edt/:id', controle.Edt)
router.get('/' + caminhobase + 'del/:id', controle.Excluir)

export default router