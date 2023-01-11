import jwt from "jsonwebtoken"
import Project from "../models/projectModel.js"
import User from "../models/userModel.js"

export const admin = (req, res, next) => {
    if(req.user && req.user.role === '0'){
        next()
    } else{
        res.status(401).send('Not Authorized!')
    }
}

export const projectManager = (req, res, next) => {
    if(req.user && req.user.role === '0' || req.user.role === '1'){
        next()
    }else{
        res.status(401).send('Not authorized')
    }
}

export const protect = async(req, res, next) => {
    const { authorization } = req.headers
    let token
    if(authorization && authorization.startsWith('Bearer')){
        try{
            token = authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')
            return next()
        } catch(err){
            res.status(401).send('Not authorized. User token not found')
        }
    }
    if(!token){
        res.status(401).send("Not authorized. User token not found");
    }
}