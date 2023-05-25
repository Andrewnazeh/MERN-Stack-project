import student from "../models/student.js"
import user from "../models/authentication.js"
import subject from "../models/subject.js";
import bcrypt from "bcryptjs"
let findUser;

export const getAll = async (req, res) => {
    console.log(req.user)
    const students = await user.find({kind: "student"}).lean();
    // console.log(students);
    res.render('students/all', { students});
};

export const create = (req, res) => {
    res.render("students/create")
};


export const store = async (req, res) => {
  
    const { username, email, password } = req.body;
    var salt = bcrypt.genSaltSync(10);
    var encryptedpass = bcrypt.hashSync(password, salt);
    await user.create({
        username,
        email,
        password: encryptedpass,
        kind: "student",

    });
    res.redirect('/students');

};

export const createSubject = async (req, res) => {
    const {_id} = req.params;

   findUser = await user.findById(_id).lean();
  const subjects = await subject.find().lean();
    res.render("students/create_subject",{user: findUser,subjects});
};



export const storeSubject = async (req, res) => {
    const { subjects,grade } = req.body;
    // const xy = findUser;
   const studentSub= await student.create({
         subjects,
         student_id: findUser._id,
         grade,
    });
    console.log(findUser);
    console.log(studentSub+"/////")
    res.send("add success!!!!!!!!!!!")

};

export const show = async (req, res) => {
    const { id } = req.params
    const singleDoc = await user.findById(id).lean();
    const subjects = await subject.find().lean();
    const subjectss = await student.find({student_id: id}).populate('subjects').lean();

    console.log(subjectss)

    console.log(req.user._id)

    res.render('students/show', { subjectss })
}







