const mongoose = require("mongoose")

const Schema = mongoose.Schema

const incomeSchema = new Schema({
    amount:{type:Number,required:true,default : 0},
    date:{type:Date,required:true},
    mode: { type : String, required : true },
    details:{ type : String },
    dateOfEntry : {type : Date , required : true },
    userId : { type : mongoose.Types.ObjectId , required : true , ref : "User"} 
})

module.exports = mongoose.model('Income',incomeSchema)