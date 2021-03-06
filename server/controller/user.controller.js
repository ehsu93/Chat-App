import express from 'express';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { config } from '../store/config';
import {
    generateHashedPassword,
    generateServerErrorCode,
    registerValidation,
    loginValidation,
} from '../store/utils';
import {
    SOMETHING_WENT_WRONG,
    USER_EXISTS_ALREADY,
    WRONG_PASSWORD,
    USER_DOES_NOT_EXIST,
} from '../store/constants';
import { User } from "../database/models";
import passport from 'passport';

const userController = express.Router();

function createUser(email, password) {
    const data = {
        email,
        hashedPassword: generateHashedPassword(password),
    };
    return new User(data).save();
}

userController.get( '/', 
                    passport.authenticate('jwt', { session: false}), 
                    async (req, res) => {
    try {
        let data = await User.find();
        res.status(200).send(data);
    }
    catch(err) {
        res.status(500).send({
            err:
            err.message || "Error occured running GET"
        });
    }
});

userController.post('/register', registerValidation, async(req, res) => {
    const errorsAfterValidation = validationResult(req);
    if (!errorsAfterValidation.isEmpty()) {
        res.status(400).json({
            code: 400,
            errors: errorsAfterValidation.mapped()
        });
    }
    else {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if(!user) {
                await createUser(email, password);
                //Sign token
                const newUser = await User.findOne({ email });
                const token = jwt.sign({ email }, config.passport.secret, {
                    expiresIn: 10000000,
                });
                const userToReturn = { ...newUser.toJSON(), ...{ token } };
                delete userToReturn.hashedPassword;
                res.status(200).json(userToReturn);
            }
            else {
                generateServerErrorCode(res, 403, 'register email error', USER_EXISTS_ALREADY, 'email');
            }
        }
        catch(e) {
            generateServerErrorCode(res, 500, e, e)
        }
    }
/*
    const {email, password} = req.body;
    const userData = {
        email,
        hashedPassword: sha256(password)
    };
    const newUser = new User(userData);
    try {
        let data = await newUser.save();
        res.status(200).send(data);
    }
    catch(err) {
        res.status(400).send({
            err:
            err.message || "Unable to save to User database"
        })
    }*/
});

userController.post('/login', loginValidation, async(req, res) => {
    const errorsAfterValidation = validationResult(req);
    if(!errorsAfterValidation.isEmpty()) {
        res.status(400).json({
            code: 400,
            errors: errorsAfterValidation.mapped(),
        });
    }
    else {
        try {
            const {email, password } = req.body;
            const user = await User.findOne({ email });
            if (user && user.email) {
                const isPasswordMatched = user.comparePassword(password);
                if(isPasswordMatched) {
                    const token = jwt.sign({ email }, config.passport.secret,
                        {
                            expiresIn: 1000000,
                        });
                        const userToReturn = { ...user.toJSON(), ...{ token } };
                        delete userToReturn.hashedPassword;
                        res.status(200).json(userToReturn);
                }
                else {
                    generateServerErrorCode(res, 403, 'login password error', WRONG_PASSWORD, 'password');
                }
            }
        }
        catch(e) {
            generateServerErrorCode(res, 404, 'login email error', USER_DOES_NOT_EXIST, 'email');
        }
    }
});

export default userController;