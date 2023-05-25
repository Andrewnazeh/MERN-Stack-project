import { Router } from "express";
import subjects from "../models/subject.js";
import student from "../models/student.js";

const router =new Router()
// router.get("/",async(req,res)=>{
//   const subject = await subjects.find().lean();

//   console.log( req.user)
//   res.render("studentpage/all",{subject})
// })

router.get("/add",async(req,res)=>{
 const getUser = req.user._id
  const subject = await subjects.find().lean();
  const getStudent = await student.findOne({student_id: getUser}).populate("subjects").lean();
  console.log(req.user._id)
  console.log(getStudent)
  res.render("studentpage/add",{subject,getStudent});
})

router.post("/",async(req, res) => {
  const { subjectsForm } = req.body;
    const studentId = req.user._id
    let studentss = new student({
      student_id : studentId,
      subjects: subjectsForm,
      grade: null,
    })
    const subjecttt = await subjects.findById({_id: subjectsForm}).lean();
    
    const students = await student.findOne({subjects: subjectsForm}).lean();
    // console.log(subjecttt.prerequisite)
    // console.log(students)
    // console.log(students.grade)
    // if(subjectsForm ===   subjecttt.prerequisite){
    //   console.log("true")
    // }else{
    //   console.log(subjecttt.prerequisite)
    // }
   
    if(subjecttt.prerequisite === null){
      studentss.save();
     res.redirect("studentpage/add")
    }
    // else if (subjecttt.prerequisite == students.subjects){

      // res.send("store by prerequisite")
    //   // if(students.grade === true){
    //     studentss.save();
    //     res.send("store by grade true")
    //   }
    // else{
    //   res.send("errrrror");
    
  
})




  export default router