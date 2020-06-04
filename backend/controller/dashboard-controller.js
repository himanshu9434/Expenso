const User = require ("../models/user-model.js")
const Expense = require ("../models/expense-model.js")
const HttpError = require("../models/Http-error")

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate()
const addMonths = (input, months) => {
  const date = new Date(input)
  date.setDate(1)
  date.setMonth(date.getMonth() + months)
  date.setDate(Math.min(input.getDate(), getDaysInMonth(date.getFullYear(), date.getMonth()+1)))
  return date
}


const charts = async(req,res,next) => {
    const userId = req.params.uid 
    let sum = [0,0,0,0,0,0]
    let date = addMonths(new Date(),-5)
    date=new Date (date.setDate(1))
    try {
        const list  = await Expense.find({userId : userId , date:{$gte:date}}).select('date amount')
        let newlist =  list.map(item=>{

        switch(item.date.getMonth()){
            case date.getMonth() :{
                sum[0] = sum[0]+item.amount
                break
            }
            case addMonths(date,+1).getMonth() :{
                sum[1] = sum[1]+item.amount
                break
            }
            case addMonths(date,+2).getMonth() :{
                sum[2] = sum[2]+item.amount
                break
            }
            case addMonths(date,+3).getMonth() :{
                sum[3] = sum[3]+item.amount
                break
            }
            case addMonths(date,+4).getMonth() :{
                sum[4] = sum[4]+item.amount
                break
            }
            case addMonths(date,+5).getMonth() :{
                sum[5] = sum[5]+item.amount
                break
            }
        }
    })
    } catch (error) {
        return next(new HttpError("something went wrong",500))
    }
    if (!sum){
        return next(new HttpError("No data Entered"),422)
    }
    res.json({list:sum})
}


const savings = async (req,res,next) => {
    let income = 0
    let expense = 0
    const userId = req.params.uid
    let savingsAmount = 0
    let userwithExpense
    let userWithIncome
    try {
        userwithExpense = await User.findById(userId).populate("expenses")
        userWithIncome = await User.findById(userId).populate("incomes")
        const expenseList = userwithExpense.expenses.map(item=>item.amount)
        const incomeList = userWithIncome.incomes.map(item=>item.amount)
        if(incomeList.length>0){income = incomeList.reduce((total,num)=>total+num)}
        if(expenseList.length>0){expense = expenseList.reduce((total,num)=>total+num)}
    } catch (error) {
        return next (
            new HttpError(error,500)
        )
    }

    savingsAmount = (income-expense)
    res.json({savingsAmount})
}



const lastExpenses = async(req,res,next) => {
    const userId = req.params.uid
    let list
    try {
        list = await Expense.find({userId : userId},'-_id').sort({date:'desc'}).limit(5)
    } catch (error) {
        return next(new HttpError("something went wrong",500))
    }
    
    res.json({list})
}
exports.charts = charts
exports.savings = savings
exports.lastExpenses = lastExpenses







// let sortedlist = []
// let sum = 0
// const currentDate = new Date()
// for (let i = 0;i<=5;++i){ 
//   sortedlist[i] =  list.map(item=>{
//     let month = date.getMonth()
//     if (date.getMonth()+i>11)
//         month = (date.getMonth()+i)-12
//     if (item.date.getMonth()===month)
//         return month
// })}
// sortedlist = sortedlist.map(item=>item)
// sum = sortedlist.map(item=>{
//     if (item[0]){
//         let amount = item.map(obj=>{
//             return obj.amount
//         })
//         const sumfunc = (total,num)=>{
//             return total+num
//         }
//     let val = amount.reduce(sumfunc)
//     return val}
//     else
//     return 0
// })
