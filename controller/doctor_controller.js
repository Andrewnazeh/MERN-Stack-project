import doctor from "../models/doctor.js"
import user from "../models/authentication.js"
import subject from "../models/subject.js";
import bcrypt from "bcryptjs"

let findUser;

export const getAll = async (req, res) => {
    console.log(req.user)
    const doctors = await user.find({kind: "doctor"}).lean();
    // console.log(doctors);
    res.render('doctors/all', { doctors});
};

export const create = (req, res) => {
    res.render("doctors/create")
};


export const store = async (req, res) => {
  
    const { username, email, password } = req.body;
    var salt = bcrypt.genSaltSync(10);
    var encryptedpass = bcrypt.hashSync(password, salt);
    await user.create({
        username,
        email,
        password: encryptedpass,
        kind: "doctor",

    });
    res.redirect('/doctors');

};

export const createSubject = async (req, res) => {
    const {_id} = req.params;

   findUser = await user.findById(_id).lean();
  const subjects = await subject.find().lean();
    res.render("doctors/create_subject",{user: findUser,subjects});
};



export const storeSubject = async (req, res) => {
    const { subjects } = req.body;
    // const xy = findUser;
   const docSub= await doctor.create({
         subjects,
         doc_id: findUser._id
    });
    console.log(findUser);
    console.log(docSub+"/////")
    res.send("add success!!!!!!!!!!!")

};

export const show = async (req, res) => {
    const { id } = req.params
    const singleDoc = await user.findById(id).lean();
    const subjects = await subject.find().lean();
    const subjectss = await doctor.find({doc_id: id}).populate('subjects').lean();

    console.log(subjectss)

    console.log(req.user._id)

    res.render('doctors/show', { subjectss })
}







