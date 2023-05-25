import department from "../models/departmant.js";
import subject from "../models/subject.js";


//++++++++ This function is used to get all data from database ++++++++ //
export const getAll = async (req, res) => {
    const subjects = await subject.find().populate('department').lean();
    console.log(subjects);
    res.render('subjects/all', { subjects });
};

//++++++++ This function is used to go to route create ++++++++ //
export const create = async (req, res) => {
    const departments = await department.find().lean();
    const subjects = await subject.find().lean();
    res.render("subjects/create", { departments,subjects });
};

//++++++++ This function is used to store data in database ++++++++ //
export const store = async (req, res) => {
    const { name, code, department } = req.body;
    await subject.create({
        name,
        code,
        department,
        prerequisite : null,
    });
    res.redirect('/subjects');
};

//++++++++ This function is used to show details of each subjects ++++++++ //
export const show=async(req,res)=>{
    const {_id}=req.params
    console.log(_id);
  const singlesubject =  await subject.findById(_id).populate('department').lean();
//   await subject.findByIdAndDelete({_id: req.params._id});
  res.render('subjects/show',{subject:singlesubject})
} 

//++++++++ This function is used to show Edit of each subjects ++++++++ //
export const edit = async (req, res) => {
  const {_id} = req.params;

  const editSubject = await subject.findById(_id).lean();
  const departments = await department.find().lean();
  const subjects = await subject.find().lean();
  res.render("subjects/edit", { departments,subject: editSubject ,subjects});
};

//++++++++ This function is used to show Update of each subjects ++++++++ //
export const update = async (req, res) => {
  const { name, code, department,prerequisite } = req.body;
  const {_id} = req.params;
 const editSub= await subject.findByIdAndUpdate(_id,{
    $set: {
      name,
      code,
      department,
      prerequisite,
    },
  });
  res.redirect('/subjects');
};

//++++++++ This function is used to show Delete of each subjects ++++++++ //
export const deleteOne=async(req,res)=>{
    const {_id}=req.params
    // console.log("deleted"+_id);
  await subject.findByIdAndDelete(_id);

 return res.redirect('/subjects');
  // res.render('subjects/all')
};









