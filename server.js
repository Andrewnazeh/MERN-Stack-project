import express from "express";
import mongoose from "mongoose";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import routerSubjects from './routers/subjects.js';
import routerDepartments from './routers/departments.js';
import routerDoctors from "./routers/doctors.js";
import methodOverride from "method-override";
import routerAuthentication from "./routers/authentication.js";
import authentication from "./middleware/authentication.js";
import doctorRoutes from "./routers/doctorroute.js";
import routerStudents from "./routers/students.js";
import routerStudentspage from "./routers/studentpage.js";



// ++++++++ connect to database ++++++++ //
mongoose.connect(process.env.mongConnection);

const app = express();

app.use(cookieParser())
// ++++++++ Using this function to link the css file with file temlates ++++++++ //
app.use(express.static('public'));
app.use('/uploads',express.static('uploads'));

// ++++++++ using to be req.body in controller ++++++++ //
app.use(express.urlencoded({extended:true}));

// ++++++++ using to be override the main methods in Form [POST,GET] to [POST,GET,DELETE,PUT] in controller ++++++++ //
app.use(methodOverride('_method'));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './templates');

app.use("/",authentication, routerAuthentication);

// ++++++++ Using route of subjects ++++++++ //
app.use("/subjects", routerSubjects);

// ++++++++ Using route of departments ++++++++ //
app.use("/departments", routerDepartments);

// ++++++++ Using route of doctors ++++++++ //
app.use("/doctors",authentication,routerDoctors);

app.use("/doctorpage",authentication,doctorRoutes);
app.use("/studentpage",authentication,routerStudentspage);

app.use("/students",routerStudents);

// ++++++++ When run project main screen this http://localhost:3000 ++++++++ // 
app.use("/",(req,res)=>{
    res.render('authentication/login', {layout: false});
})

app.listen(process.env.port, () => {
    console.log(`Started application on URL: http://localhost:${process.env.port}`);
})