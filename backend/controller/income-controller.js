const mongoose = require("mongoose")
const User = require("../models/user-model")
const Income = require("../models/income-model")
const HttpError = require ("../models/Http-error")

const getIncome = async (req,res,next) => {
    const userId = req.params.uid
    let date = new Date()
    let month = date.getMonth()
    let year = date.getFullYear()
    let day = date.getDate()
    let startTime = new Date(year,month,day,0)
    let endTime = new Date()
    let userWithIncome
    try {
        userWithIncome = await Income.find({ userId : userId, date : {$gte : startTime, $lte : endTime}})
    } catch (error) {
        const err = new HttpError("Something Went Wrong",500)
        return next(err)
    }
    if (!userWithIncome || userWithIncome.length===0){
        const error = new HttpError("Cannot find Income . Please Add Income ",500)
        return next(error)
    }
    res.json({
        incomes : userWithIncome
    })
}

const getIncomeByTime = async (req,res,next) => {
    const userId = req.params.uid
    let startTime
    let endTime
    startTime = req.body.startTime
    endTime = req.body.endTime

    let monthlyData
    try {
        monthlyData = await Income.find({ userId : userId, date : {$gte : startTime, $lte : endTime}})
    } catch (error) {
        return (next(new HttpError("Something Went Wrong",500))) 
    }

    if (!monthlyData || monthlyData.length===0){
        return next(
            new HttpError("No Expenses found. Please Add Expenses")
        )
    }


    res.json({incomes : monthlyData})
}


const addIncome = async (req,res,next) => {
    const userId = req.params.uid
   

    const {amount,date,mode,details} = req.body

    let createIncome = new Income ({
        amount,
        date,
        mode,
        details,
        dateOfEntry : new Date(),
        userId
    })

    let user
    try {
        user = await User.findById(userId)
    } catch (error) {
        const err = new HttpError("Something Went Wrong",500)
        return next(err)
    }
    if (!user){
        const error = new HttpError("Cannot find User",500)
        return next(error)
    }

    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await createIncome.save({session:sess})
        user.incomes.push(createIncome)
        await user.save({session:sess})
        await sess.commitTransaction()

    } catch (error) {
        return next(error)
    }
    res.status(201).json({createIncome})
}

const updateIncome = async (req,res,next)=>{
    let incomeId = req.params.iid
    let {amount,date,mode,details} = req.body.newData
    let income
    try {   
         income = await Income.findById(incomeId) 
    } catch (error) {
        return next (new HttpError ("Something Went Wrong",500))
    }

    if(!income){
        return next (new HttpError("Income doesnot Exist for provided id"))
    }

    income.amount = amount
    income.date =date
    income.mode = mode
    income.details = details
    income.dateOfEntry = new Date()

    try {
        await income.save()
    } catch (error) {
        return next (new HttpError("income Could not be updated",500))
    }
    res.status(200).json({income:income.toObject({getters:true})})
}

const deleteincome = async (req,res,next) =>{
    let incomeId = req.params.iid

    let income
    try {
        income = await Income.findById(incomeId).populate('userId')
    } catch (error) {
        return next (new HttpError("Income Could not be updated",500))
    }
    
    if (!income){
        return next (new HttpError("Income cannot be found for the given ID",500))
    }

    try {
        const sess = await mongoose.startSession()
         sess.startTransaction()
         income.userId.incomes.pull(income)
        await income.remove({session:sess})
        await income.userId.save({session:sess})
        await sess.commitTransaction()
    } catch (error) {
        return next (new HttpError("Something gone wrong here",500)) 
    }
    res.status(201).json("Income Deleted")

}
exports.getIncome = getIncome
exports.addIncome = addIncome
exports.updateIncome = updateIncome
exports.deleteincome = deleteincome
exports.getIncomeByTime = getIncomeByTime