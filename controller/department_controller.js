import department from "../models/departmant.js";

//++++++++ This function is used to get all data from database ++++++++ //
export const getAll = async (req, res) => {
    const departments = await department.find().lean();
    console.log(departments);
    res.render('departments/all', { departments });
};

//++++++++ This function is used to go to route create ++++++++ //
export const create = async (req, res) => {
    res.render("departments/create");
};

//++++++++ This function is used to store data in database ++++++++ //
export const store = async (req, res) => {
    const { name, code } = req.body;
    await department.create({
        name,
        code,
        
    });
    res.redirect('/departments');
};

//++++++++ This function is used to show details of each department ++++++++ //
export const show=async(req,res)=>{
    const {_id}=req.params
    console.log(_id);
  const singleDep =  await department.findById(_id).lean();

  res.render('departments/show',{department : singleDep})
}

//++++++++ This function is used to Edit details of each department ++++++++ //
export const edit = async (req, res) => {
    const {_id} = req.params;
  
    const editDep = await department.findById(_id).lean();
    const departments = await department.find().lean();
    res.render("departments/edit", { departments, department: editDep });
  };
  
  //++++++++ This function is used to Update details of each department ++++++++ //
  export const update = async (req, res) => {
    const { name, code } = req.body;
    const {_id} = req.params;
     await department.findByIdAndUpdate(_id,{
      $set: {
        name,
        code,
      },
    });
    res.redirect('/departments');
  };
  
  //++++++++ This function is used to delete details of each department ++++++++ //
  export const deleteOne=async(req,res)=>{
      const {_id}=req.params
    await department.findByIdAndDelete(_id);
   return res.redirect('/departments');
  };