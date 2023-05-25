import { Router } from "express";
import { create, getAll, store, show, edit, update, deleteOne} from "../controller/subject_controller.js";

//++++++++ main router for department ++++++++ //
 const router = new Router();

 router.get('/',getAll);

 router.get('/create',create);

 router.post('/',store);

 router.get('/:_id/edit',edit);

 router.put('/:_id',update);

 router.get('/:_id',show);

 router.delete('/:_id',deleteOne);

//  router.delete('/:_id',deleteone);


 export default router;