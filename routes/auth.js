const express = require('express')
const route = express.Router()
const {User} = require('../models/user')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const passwordComplexity = require("joi-password-complexity");
const Joi = require('joi');


route.post('/', async (req, res)=>{
    const {error} = validateObject(req.body)
    if(error) return res.status(400).send(error.details[0].message)    

    let user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Invalid email.')
    
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send('Invalid email or pasword.')

    const token = user.generateAuthToken()
    
    res.send(token)
})

function validateObject(req){
    const complexityOptions = {
        min: 8,
        max: 1024,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 2,
      };

    const schema =Joi.object({
        email: Joi.string().min(5).max(255).email().required(),
        password: passwordComplexity(complexityOptions).required()
    } )
    return schema.validate(req)
    
}


module.exports = route