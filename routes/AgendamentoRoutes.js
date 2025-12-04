import { Router } from 'express';
import AgendamentoController from '../controllers/AgendamentoController.js';
import { upload } from '../config/multer.js';

const router = Router();
const agendamentoController = new AgendamentoController();

router.get('/agendamento/add', agendamentoController.openAdd);
router.post('/agendamento/add', upload.single('imagemCorte'), agendamentoController.add);
router.get('/agendamento/lst', agendamentoController.list);
router.get('/agendamento/edt/:id', agendamentoController.openEdt);
router.post('/agendamento/edt/:id', upload.single('imagemCorte'), agendamentoController.Edt);
router.get('/agendamento/del/:id', agendamentoController.Excluir);

export default router;