const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const userController = {
    authUser : async (req, res, next) => {
        const login = req.body.login;
        const password = req.body.password;

        if(!login || !password) { return next(req.header('Content-type'))}

        let existingUser;
        try {
            existingUser = await User.findOne({login: login});
        }catch {
            const err = new Error('Failed to find in database');
            return next(err);
        };

        if(!existingUser) { 
            const err = 'wrong details';
            res.status(404).json({data: 'wrong details'});
            next(err);
        }
        else{
            let correctPassword = await bcrypt.compare(password, existingUser.password);

            if(!existingUser || !correctPassword) {
                res.status(404).json({data: 'wrong details'});
            }
    
            let token;
            try {
                token = jwt.sign(
                    {
                        userId: existingUser.id,
                        email: existingUser.email,
                    },
                    config.secret,
                    {expiresIn: "72h"}
                );
            } catch (err) {
                console.log(err);
                const error = new Error('Failed to make a token');
                return next(error);
            }

            res.cookie('authorization', token, {
                maxAge: 7*24*60*60*1000,
                sameSite: 'Lax',
                path: '/',
                httpOnly: true,
            });
    
            res.status(200).json({
                data: {
                    userId: existingUser.id,
                    email: existingUser.email,
                },
            });
        }
    },

    createUser: async (req,res, next) => {
        let hash;
        try {
            hash = await bcrypt.hash(req.body.password, 10);
        }catch(error){ 
            const err = new Error('Failed to hash');
            return next(error);
        };

        const newUser = User({
            login: req.body.login,
            email: req.body.email,
            password: hash,
            name: req.body.name
        });
    
        let existingUser;
        try{
            existingUser = await User.findOne({$or : [{login : req.body.login}, {email: req.body.email}]});
            if(existingUser) {
                res.status(400).json({error: "User with this login/email already exists"});
                throw new Error('User already exists')
            }
        } catch(err) { return next(err)}

        try{
            await newUser.save();
        }catch(error) {
            const err = new Error('Falied to save newUser');
            return next(error);
        };
    
        let token;
        try {
            token = jwt.sign(
                {
                userId: newUser.id,
                email: newUser.email,
                login: newUser.login,
                },
                config.secret,
                {expiresIn: '72h'}
            );
        } catch (err) {
            const error = new Error('Failed to make new token');
            return next(err);
        };
   
        res.cookie('authorization', token, {
            maxAge: 7*24*60*60*1000,
            sameSite: 'Lax',
            path: '/',
            httpOnly: true,
        });

        res.status(201).json({
            data: {
                userId: newUser.id,
                email: newUser.email,
            },
        });
    },

    getUser: async (req,res, next) => {
    },

    changeUserData: async (req,res) => {
        const token = req.body.token;
    
        if (!token) { return res.status(401).json({error: 'Unauthorized'});}
    
        let decodedResult;
        jwt.verify(token, config.secret, (err, decoded) => {
            if(err) {return res.status(401).json({error: 'Unauthorized'});}
            decodedResult = decoded;
        });
    
        try {
            existingUser = User.findById(decodedResult.userId);
        } catch(err) {
            return next(err);
        }

        if(req.headers['changePassword']) {
            existingUser.password = req.body.password;
            existingUser.save();
            return res.status(200).json({data: 'password have been changed'});
        }
    
        res.status(200);
    //potom sdelayu ostalnie polya

    },
    changeUserPassword: async (req,res) => {
        const email = req.body.email;
        const resetCode = req.body.resetCode;

        let newPassword;
        let existingUser;
        let correctCode;
        try{
            existingUser = await User.findOne({email: email});
            correctCode = await bcrypt.compare(resetCode, existingUser.resetCode);
            newPassword = await bcrypt.hash(req.body.password, 10);
            User.findOne({email: email}, {$unset: {secretCode: 1}});
        }catch(err){
            res.status(500).json({error: 'Server Error'});
            console.log(err);
            return;
        }

        if(!correctCode) {
            res.status(400).json({error: 'Invalid Code'});
            return;
        }

        existingUser.password = newPassword;
        existingUser.resetCode = "";
        existingUser.save();
        
        res.status(200).json({data: 'Password changed succesfully'});
    },

}


module.exports = userController;
