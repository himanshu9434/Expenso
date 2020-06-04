const mongoose = require ("mongoose")
const Expense = require ("../models/expense-model")
const User = require ("../models/user-model")
const HttpError = require ("../models/Http-error")

const getExpense = async (req,res,next) => {
    const userId = req.params.uid
    let date = new Date()
    let month = date.getMonth()
    let year = date.getFullYear()
    let day = date.getDate()
    let startTime = new Date(year,month,day,0)
    let endTime = new Date()
    let userWithExpenses
    try {
        userWithExpenses = await Expense.find({ userId : userId, date : {$gte : startTime, $lte : endTime}})
    } catch (err) {
        const error = new HttpError("Something Went Wrong",500)
        return next(error)
    }
    if (!userWithExpenses || userWithExpenses.length===0){
        return next(
            new HttpError("No Expenses found. Please Add Expenses")
        )
    }
    res.json({
        expenses : userWithExpenses
    })
}

const getExpenseByTime = async (req,res,next) => {
    const userId = req.params.uid
    let startTime
    let endTime
    startTime = req.body.startTime
    endTime = req.body.endTime

    let monthlyData
    try {
        monthlyData = await Expense.find({ userId : userId, date : {$gte : startTime, $lte : endTime}})
    } catch (error) {
        return (next(new HttpError("Something Went Wrong",500))) 
    }

    if (!monthlyData || monthlyData.length===0){
        return next(
            new HttpError("No Expenses found. Please Add Expenses")
        )
    }

    res.json({expenses : monthlyData})
}


const addExpense = async (req,res,next) => {
    const userId = req.params.uid
    const {amount ,date ,category ,mode , details} = req.body


    const createExpense = new Expense ({
        amount,
        date,
        category,
        mode,
        details,
        dateOfEntry : new Date(),
        userId
    })

    let user
    try {
        user = await User.findById(userId)
    } catch (error) {
        return next(
            new HttpError("Something Went wrong",500)
        )
    }
    if (!user){
        return next(new HttpError("Could not find User for Provided Id "),404)
    }

    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await createExpense.save({session:sess})
        user.expenses.push(createExpense)
        await user.save({session:sess})
        await sess.commitTransaction()

    } catch (error) {
        console.log(error)
        return next(new HttpError("Something Went Wrong ",500))
    }

    res.status(201).json({createExpense})
}


const updateExpense = async (req,res,next)=>{
    let expenseId = req.params.eid
    let {amount,date,mode,category,details} = req.body.newData
    let expense
    try {   
         expense = await Expense.findById(expenseId) 
    } catch (error) {
        return next (new HttpError ("Something Went Wrong",500))
    }

    if(!expense){
        return next (new HttpError("Expense doesnot Exist for provided id"))
    }

    expense.amount = amount
    expense.date =date
    expense.mode = mode
    expense.category =category
    expense.details = details
    expense.dateOfEntry = new Date()

    try {
        await expense.save()
    } catch (error) {
        return next (new HttpError("Expense Could not be updated",500))
    }
    res.status(200).json({expense:expense.toObject({getters:true})})
}

const deleteExpense = async (req,res,next) =>{
    let expenseId = req.params.eid

    let expense
    try {
        expense = await Expense.findById(expenseId).populate('userId')
    } catch (error) {
        return next (new HttpError("Expense Could not be updated",500))
    }
    
    if (!expense){
        return next (new HttpError("Expense cannot be found for the given ID",500))
    }

    try {
        const sess = await mongoose.startSession()
         sess.startTransaction()
         expense.userId.expenses.pull(expense)
        await expense.remove({session:sess})
        await expense.userId.save({session:sess})
        await sess.commitTransaction()
    } catch (error) {
        return next (new HttpError("Something gone wrong here",500)) 
    }
    res.status(201).json("Expense Deleted")

}
exports.getExpense = getExpense
exports.addExpense = addExpense
exports.deleteExpense = deleteExpense
exports.updateExpense = updateExpense
exports.getExpenseByTime = getExpenseByTime