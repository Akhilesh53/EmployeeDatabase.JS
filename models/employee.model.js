import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: String,
    designation: String,
    salary: Number
})

// to use already created collection, pass the third argument as the name of the collection
// else mongo will create a collection with the plural of the model name
// i.e. Employee -> employees
export default mongoose.model('Employee', employeeSchema, 'employee');