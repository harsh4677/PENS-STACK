const user = require('../db/models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const generateToken = (payload)=>{
   return jwt.sign(payload, process.env.JWT_SECRET,{
        expiresIn: process.env.EXPIRESIN
    })
}

const signup = async (req, res, next)=>{
    const body = req.body;

    if(!['1', '2'].includes(body.userType)){
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid user Type'
        })
    }

    const newUser = await user.create({
        userType: body.userType,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        confirmPassword : body.confirmPassword,
    })

    const result = newUser.toJSON()

    delete result.password;
    delete result.deletedAt;

    result.token = generateToken({
        id: result.id
    })

    if(!result){
        return res.status(400).json({
            status: 'fail',
            message: 'Failed to create User'
        })
    }

    return res.status(201).json({
        status:'success',
        data: result,
    })
}

const login = async (req, res, next)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            status: 'Fail',
            message: 'Please provide Email and Password'
        })
    }

    const result = await user.findOne({where: {email}});
    if(!result || !(await bcrypt.compare(password, result.password))){
        return res.status(400).json({
            status: 'Fail',
            message: 'Email or Password is Incorrect'
        })
    }

    const token = generateToken({
        id: result.id,
    })

    return res.json({
        status: 'Success',
        token,
    })
}

module.exports = {signup, login}