import user from "../models/authentication.js"
import doctor from "../models/doctor.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import filedatabase from "../models/filedatabase.js";
import subjects from "../models/subject.js";



export const loginForm = (req, res) => {
    res.render('authentication/login')
};

export const login = async (req, res) => {
    const { email, password ,user_type} = req.body;

    const loggeduser = await user.findOne({ email })

    const isCorrect = bcrypt.compareSync(password, loggeduser.password)
    if (isCorrect == false)
        return res.send("wrong password",)

    // console.log(email, password)
    const data = {
        _id: loggeduser._id,
        email:loggeduser.email,
        
    }
    var encrybteddata = jwt.sign(data, process.env.JWT_KEY)
    // console.log(encrybteddata)
 
    
    
    if(loggeduser.kind == user_type){

        if(user_type == "doctor"){
            const doctors = await doctor.find({doc_id:loggeduser._id}).populate("subjects").lean();
            const files = await filedatabase.find().lean();
            // console.log( doctors.department);
            console.log(req.user)
            console.log(files);
            res.cookie('token',encrybteddata)
            res.render("doctorpage/main",{doctors, files,layout: "doctor"})
        }
        else if(user_type == "student"){
            const subject = await subjects.find().lean();
            // console.log(subject)
            res.cookie('token',encrybteddata)
            res.render("studentpage/all",{subject})
        }else{
            res.cookie('token',encrybteddata)
            res.render('adminstrator/admin')
        }
      
    }else{
       res.send('plese checked the correct type')
    }
    

};