import express from 'express'
const router = express.Router()

//busca o BarbeiroController

import BarbeiroController from '../controllers/BarbeiroController.js'
const controle = new BarbeiroController()

const caminhobase = 'barbeiro/'

router.get('/' + caminhobase + 'add', controle.openAdd)
router.post('/' + caminhobase + 'add', controle.add)
router.get('/' + caminhobase + 'lst', controle.list)
router.get('/' + caminhobase + 'edt/:id', controle.openEdt)
router.post('/' + caminhobase + 'edt/:id', controle.Edt)
router.get('/' + caminhobase + 'del/:id', controle.Excluir)

export default router