import Express from "express";
import employeeSchema from "../models/employee.model.js";
import { name } from "ejs";

const employeeRouter = Express.Router();


employeeRouter.get('/', (req, res) => {
    employeeSchema.find().then((employees) => {
        res.render('index', { employees: employees });
    }).catch((err) => {
        req.flash('error_msg', 'ERROR: +err');
        res.redirect('/');
    })
})

employeeRouter.get('/employee/new', (req, res) => {
    res.render('new');
})

employeeRouter.post('/employee/new', (req, res) => {
    let employee = {
        name: req.body.name,
        designation: req.body.designation,
        salary: req.body.salary
    }

    employeeSchema.create(employee).then(() => {
        req.flash('success_msg', 'Employee data added successfully');
        res.redirect('/');
    }).catch((err) => {
        req.flash('error_msg', 'ERROR:' + err)
        res.redirect('/')
    })
})

employeeRouter.get('/employee/', (req, res) => {
    //find by name
    employeeSchema.findOne({ name: req.query.name }).then((employee) => {
        res.render('search', { employee: employee });
    }).catch((err) => {
        req.flash('error_msg', 'ERROR:' + err)
        res.redirect('/');
    })
})

employeeRouter.get('/employee/search', (req, res) => {
    employeeSchema.find({ name: req.query.name }).then((employees) => {
        if (employees.length > 0) {
            res.render('index', { employee: employees[0] });
        }
        res.render('search', { employee: null });
    }).catch((err) => {
        req.flash('error_msg', 'ERROR:' + err)
        res.redirect('/');
    })
})

employeeRouter.get('/edit/:id', (req, res) => {
    employeeSchema.findById(req.params.id).then((employee) => {
        res.render('edit', { employee: employee });
    }).catch((err) => {
        req.flash('error_msg', 'ERROR:' + err)
        res.redirect('/');
    })
})

employeeRouter.post('/edit/:id', (req, res) => {
    let employee = {
        name: req.body.name,
        designation: req.body.designation,
        salary: req.body.salary
    }

    employeeSchema.updateOne({ _id: req.params.id }, {
        $set: {
            name: employee.name,
            designation: employee.designation,
            salary: employee.salary
        }
    }).then((employee) => {
        req.flash('success_msg', 'Employee data updated successfully');
        res.redirect('/');
    }).catch((err) => {
        req.flash('error_msg', 'ERROR:' + err)
        res.redirect('/');
    })
})

employeeRouter.post('/delete/:id', (req, res) => {
    employeeSchema.deleteOne({ _id: req.params.id }).then(() => {
        req.flash('success_msg', 'Employee data deleted successfully');
        res.redirect('/');
    }).catch((err) => {
        req.flash('error_msg', 'ERROR:' + err)
        res.redirect('/');
    })
})

export default employeeRouter;