const User = require ('../models/user-model')
const HttpError = require ("../models/Http-error")

const getUtilities = async (req,res,next) => {
    const userId = req.params.uid
    let existingUser
    try {
        existingUser = await User.findById(userId)
    } catch (error) {
        return (next(new HttpError ("Somethin",500)))
    }
    if (!existingUser){
        return(next (new HttpError("User NOt Found",404)))
    }
    let utilities = {
        expense_categories : existingUser.expense_categories,
        expense_modes : existingUser.expense_modes,
        income_modes : existingUser.income_modes
    }

    res.json({utilities})
}   

const saveUtilities = async (req,res,next) => {
    const userId = req.params.uid
    let {selectOption,value} = req.body
    if(value.length===0){
        return(next (new HttpError("Please Enter Correct Value",404)))
    }
    let existingUser
    try {
        existingUser = await User.findById(userId)
    } catch (error) {
        return (next(new HttpError ("Somethin",500)))
    }
    if (!existingUser){
        return(next (new HttpError("User NOt Found",404)))
    }
    let isPresent = 0 
    switch (selectOption) {
        case ('expense_categories') : {
            isPresent = existingUser.expense_categories.indexOf(value)
            if (isPresent !== -1){
                return (next(new HttpError("Data Already Present",422)))
            }
            existingUser.expense_categories.push(value)
            break
        }
        case ('expense_modes') : {
            isPresent = existingUser.expense_modes.indexOf(value)
            if (isPresent !== -1){
                return (next(new HttpError("Data Already Present",422)))
            }
            existingUser.expense_modes.push(value)
            break
        }
        case ('income_modes') : {
            isPresent = existingUser.income_modes.indexOf(value)
            if (isPresent !== -1){
                return (next(new HttpError("Data Already Present",422)))
            }
            existingUser.income_modes.push(value)
            break
        }
        default : {
            return (next(new HttpError("Please Choose Category",422)))
        }
    }
    
    try {
        existingUser.save()
    } catch (error) {
        return(next (new HttpError("Something Went Wrong",404)))
    }

    res.json({selectOption,value})
}

const deleteUtilities = async (req,res,next) => {
    const userId = req.params.uid
    let {selectOption,value} = req.body
    if(value.length===0){
        return(next (new HttpError("Please Enter Correct Value",404)))
    }
    let existingUser
    try {
        existingUser = await User.findById(userId)
    } catch (error) {
        return (next(new HttpError ("Somethin",500)))
    }
    if (!existingUser){
        return(next (new HttpError("User NOt Found",404)))
    }
    let isPresent = 0 
    switch (selectOption) {
        case ('expense_categories') : {
            isPresent = existingUser.expense_categories.indexOf(value)
            if (isPresent === -1){
                return (next(new HttpError("Data Not Present. PLease Save First",422)))
            }
            existingUser.expense_categories.pull(value)
            break
        }
        case ('expense_modes') : {
            isPresent = existingUser.expense_modes.indexOf(value)
            if (isPresent === -1){
                return (next(new HttpError("Data Not Present. PLease Save First",422)))
            }
            existingUser.expense_modes.pull(value)
            break
        }
        case ('income_modes') : {
            isPresent = existingUser.income_modes.indexOf(value)
            if (isPresent === -1){
                return (next(new HttpError("Data Not Present. PLease Save First",422)))
            }
            existingUser.income_modes.pull(value)
            break
        }
        default : {
            return (next(new HttpError("Please Choose Category",422)))
        }
    }
    
    try {
        existingUser.save()
    } catch (error) {
        return(next (new HttpError("Something Went Wrong",404)))
    }

    res.json({selectOption,value})
}

const saveTheme = async (req,res,next) => {
    const userId = req.params.uid
    const {primary,secondary,background,paper,text} = req.body
    let existingUser
    try {
        existingUser = await User.findById(userId)
    } catch (error) {
        return(next (new HttpError("Something Went Wrong",404)))
    }

    existingUser.theme = {
        primary,
        secondary,
        background,
        paper,
        text
    }

    try {
        existingUser.save()
    } catch (error) {
        return(next (new HttpError("Something Went Wrong",404)))
    }
    res.json({theme : existingUser.theme})
}
exports.getUtilities = getUtilities
exports.saveUtilities = saveUtilities
exports.deleteUtilities = deleteUtilities
exports.saveTheme = saveTheme