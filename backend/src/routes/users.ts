import express,{Request,Response} from 'express';
const router =express.Router();
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { check, validationResult } from "express-validator";


router.post('/register',
    [
    check("first_name", "First Name is required").isString(),
    check("last_name", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
    ],
    async (req : Request , res : Response )=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
        }
        try{
            let user= await User.findOne({email:req.body.email});
            if (user) {
                return res.status(400).json({ message: "User already exists" });
            }
            user = new User(req.body);
            await user.save();
            try {
                const token = await jwt.sign({ userID: user.id }, process.env.JWT_SECRET_KEY as string, {
                    expiresIn: "1d"
                });
                res.cookie("auth_token", token, {
                    // httpOnly: true,
                    // secure: process.env.NODE_ENV === "production",
                    maxAge: 86400000,
                });            
                res.status(200).send({message:"user register successful", auth_token:token});
            }
            catch (error) {
                console.error('Error signing JWT or setting cookie:', error);
                res.status(500).send({ message: "Something went wrong" });
            }        
        }
        catch(error){
            console.log(error);
            res.status(500).send({ message: "Something went wrong" });
        }
});

export default router;