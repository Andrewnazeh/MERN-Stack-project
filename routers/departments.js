import { Router } from "express";
import { create, deleteOne, edit, getAll, show, store, update } from "../controller/department_controller.js";


//++++++++ main router for department ++++++++ //
const router = new Router();

router.get('/',getAll);

 router.get('/create',create);

 router.post('/',store);

 router.get('/:_id/edit',edit);

 router.put('/:_id',update);

 router.get('/:_id',show);

 router.delete('/:_id',deleteOne);

 export default router;