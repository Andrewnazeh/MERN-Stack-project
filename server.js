import express from "express";
import mongoose from "mongoose";
import { engine } from "express-handlebars";
import dotenv from "dotenv";
import routerDepartments from './routers/departments.js';
import routerSubjects from './routers/subjects.js';
import routerDoctors from "./routers/doctors.js";

dotenv.config();

mongoose.connect(process.env.mongConnection);

const app = express();
// ++++++++ Using this function to link the css file with file temlates ++++++++ //
app.use(express.static('public'));

// ++++++++ using to be req.body in controller ++++++++ //
app.use(express.urlencoded({extended:true}));

// ++++++++ Using route of departments ++++++++ //
app.use("/departments", routerDepartments);

// ++++++++ Using route of subjects ++++++++ //
app.use("/subjects", routerSubjects);


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './templates');


// ++++++++ Using route of doctors ++++++++ //

app.use("/doctors",routerDoctors);


// ++++++++ When run project main screen this http://localhost:3000 ++++++++ // 
app.use("/",(req,res)=>{
    res.render('adminstrator/admin');
})


app.listen(process.env.port, () => {
    console.log(`Started application on URL: http://localhost:${process.env.port}`);
})