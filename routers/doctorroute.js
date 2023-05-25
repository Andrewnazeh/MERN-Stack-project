import { Router } from "express";
import upload from '../middleware/upload.js';
import filedatabase from "../models/filedatabase.js";
import subjects from "../models/subject.js";

const router =new Router()
let qq;
router.get("/",async(req,res)=>{
  const files = await filedatabase.find().lean();
  // console.log(files);
  console.log( req.user)
  res.render("doctorpage/main",{files})
})
router.get("/:_id/add",async(req,res)=>{
  const {_id} = req.params;
  qq = req.params
  const subject = subjects.findById(_id).lean();
  const files = await filedatabase.findOne({doctor: req.user._id}).lean();
  console.log(qq._id)
  console.log(req.user._id)
  console.log(files)

  res.render("doctorpage/add",{subject,files});

})
router.post("/",upload.single('avatar'), async(req, res) => {
    const docId = req.user._id
    let fileee = new filedatabase({
      subjects : qq._id,
      doctor: docId,
    })
    if(req.file){
      fileee.avatar = req.file.path
    }
    fileee.save()
  res.send("success to store file in database");  
})




  export default router