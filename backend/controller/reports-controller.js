const User = require ("../models/user-model.js")
const Expense = require ("../models/expense-model.js")
const HttpError = require("../models/Http-error")

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const categoryWiseMonthData = async (req,res,next) => {
    const userId = req.params.uid
    let gmonth
    let lmonth
    const {selectedDate} = req.body
    const date = new Date(selectedDate)
    const month = date.getMonth()
    const year = date.getFullYear()
    gmonth = new Date(year,month)
    lmonth = new Date (new Date(year, month+1)-1)
    
    let existingUser
    try {
        existingUser = await User.findById(userId)
    } catch (error) {
        return next(new HttpError("something went wrong",500))
    }

    list = existingUser.expense_categories.map(item => item)
    listLength = list.length

    let monthlyData
    try {
        monthlyData = await Expense.find({ userId : userId, date : {$gte : gmonth, $lte : lmonth}})
    } catch (error) {
        return (next(new HttpError("Something Went Wrong",500))) 
    }
    
    let sortedData = list.reduce((acc,curr) =>([...acc,{category : `${curr}`,amount  : 0}]),[])

    monthlyData.map(data => {
        sortedData.map(item => {
            if(item.category === data.category){
                item.amount = item.amount + data.amount
            }
        })
    })
    res.json({sortedData : sortedData})
    
    
    
}

exports.categoryWiseMonthData = categoryWiseMonthData