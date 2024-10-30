const user = require('../db/models/user')
const jwt = require('jsonwebtoken')

const generateToken = (payload)=>{
    jwt.sign(payload, process.env.JWT_SCERET, ()=>{
        expiresIn: '90d'
    })
}

const signup = async (req, res, next)=>{
    const body = req.body;

    if(!['1', '2'].includes(body.userType)){
        return res.status(400).json({
            status: 'fai;',
            message: 'Invalid user Type'
        })
    }

    const newUser = await user.create({
        userType: body.userType,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        consfirmPassword : body.consfirmPassword,
    })

    const result = newUser.toJSON()

    delete result.password;
    delete result.deletedAt;

    result.token = generateToken({
        id: result.id
    })

    if(!newUser){
        return res.status(400).json({
            status: 'fail',
            message: 'Failed to create User'
        })
    }

    return res.status(201).json({
        status:'success',
        data: newUser,
    })
}

module.exports = {signup}