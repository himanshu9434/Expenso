const bycrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')


const User = require("../models/user-model")
const HttpError = require ("../models/Http-error")

const signup = async(req,res,next) => {

    const {firstName,lastName,email,password,expense_categories,expense_modes,income_modes} = req.body

    let existingUser

    try {
        existingUser = await User.findOne({email})
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
          );
          return next(error);
    }

    if (existingUser){
        const error = new HttpError(
            'User Exists. Try Logging In',
            422
          );
          return next(error);
    }
    hashedPassword = await bycrypt.hash(password,12)

    const createUser = new User({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        expense_categories,
        expense_modes,
        income_modes,
    })

    try {
        await createUser.save()
    }catch (err){
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
          );
          return next(error);
    }
    let token
    try {
        token = jwt.sign(
            {userId:createUser.id,email:createUser.email},
            'himanshu'
        )
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
          );
          return next(error);
    }
    
    res.status(201).json({
        userId:createUser.id,
        userName:createUser.firstName,
        email:createUser.email,
        token:token,
        theme : createUser.theme
    })
}

const login = async(req,res,next) => {
    const {email,password} = req.body
    let existingUser=null
    try {
        existingUser = await User.findOne({email})
    } catch (err) {
        const error = new HttpError(
            'Logging in failed, please try again later.',
            500
          );
          return next(error);
    }
    if (!existingUser){
        const error = new HttpError(
            'Invalid credentials, could not log you in.',
            403
          );
          return next(error);
    }

    let validPassword = false 
    try {
        validPassword = await bycrypt.compare(password,existingUser.password)
    } catch (err) {
        const error = new HttpError(
            'Could not log you in, please check your credentials and try again.',
            500
          );
          return next(error);
    }

    if(!validPassword){
        const error = new HttpError(
            'Invalid credentials, could not log you in.',
            403
          );
          return next(error);
    }

    let token
    try {
        token = jwt.sign(
            {userId:existingUser.id,email:existingUser.email},
            'himanshu'
        )
    } catch (err) {
        const error = new HttpError(
            'Logging up failed, please try again later.',
            500
          );
          return next(error);
    }
    
    res.status(201).json({
        userId:existingUser.id,
        userName:existingUser.firstName,
        email:existingUser.email,
        token:token,
        theme : existingUser.theme
    })
}


const updateUser = async (req,res,next) =>{
    const userId = req.params.uid
    let firstName , lastName,currentPassword,newPassword 
    let pass = false
    if (req.body.currentPassword){
        pass = true
        firstName = req.body.firstName, 
        lastName = req.body.lastName,
        currentPassword = req.body.currentPassword,
        newPassword = req.body.newPassword
    }
    else{
        firstName = req.body.firstName, 
        lastName = req.body.lastName
    }

    let existingUser
    try {
        existingUser = await User.findById(userId)
    } catch (error) {
        console.log(error)
        return next (new HttpError("Something Went Wrong",500))
    }

    if (!existingUser){
        return next (new HttpError("Cannot find the Provided Id",404))    
    }

    if (pass) {
        let validPassword = false 

        try {
            validPassword = await bycrypt.compare(currentPassword,existingUser.password)
        } catch (err) {
            const error = new HttpError(
                'Could not Update Password. Please try again.',
                500
            );
            return next(error);
        }

        if(!validPassword){
            const error = new HttpError(
                'Invalid Current Password',
                403
            );
            return next(error);
        }
        let oldPass
        try {
            oldPass = await bycrypt.compare(newPassword , existingUser.password)
        } catch (error) {
            return next(new HttpError('Could not Update Password. Please try again.',500)) 
        }

        if (oldPass){
            return next(new HttpError("New Password cannot be same as Old Password",422))
        }

        hashedPassword = await bycrypt.hash(newPassword,12)

        existingUser.set({
            firstName : firstName,
            lastName : lastName,
            password : hashedPassword
        })

        try {
            await existingUser.save()
        } catch (error) {
            return next (new HttpError("Something Went Wrong",500))
        }

    }

    else {
        existingUser.set({firstName : firstName , lastName : lastName})

        try {
            await existingUser.save()
        } catch (error) {
            return next (new HttpError("Something Went Wrong",500))
        }
    }

    console.log(existingUser)
    res.json({existingUser : existingUser})
    
}

const userData = async (req,res,next) => {
    const userId  = req.params.uid

    let existingUser

    try {
        existingUser = await User.findById(userId)
    } catch (error) {
        console.log(error)
        return next (new HttpError("Something Went Wrong",500))
    }

    if (!existingUser){
        return next (new HttpError("Cannot find the Provided Id",404))    
    }

    res.json({existingUser : existingUser})

}

exports.signup = signup
exports.login = login
exports.updateUser = updateUser
exports.userData = userData