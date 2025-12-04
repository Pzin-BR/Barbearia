import express from 'express';
const router = express.Router();
import controller from '../controllers/controller.js'
const controle = new controller();

router.get('/', controle.home)
router.get('/teste', controle.teste)
router.post('/formulario', controle.formulario)
router.get('/indexCliente', controle.cliente)
router.get('/indexAdmin', controle.admin)
export default router