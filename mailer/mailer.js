const express = require('express');
const sendMail = require('./transporter');
const crypto = require('crypto');
const User = require('../models/User')
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/api/sendResetMail', async (req,res) => {
    try{
        const existingUser = await User.findOne({email: req.body.email});

        if(!existingUser) {
            res.status(400).json({error: 'Wrong deatails'});
            return;
        }
        
        const secretCode = crypto.randomBytes(2).toString('hex');
        const hash = await bcrypt.hash(secretCode, 10);

        existingUser.resetCode = hash;
        await existingUser.save();

        const subject = 'Password reset';
        const text = `Enter this code in 'Code from email goes here' box: ${secretCode} `;
        const info = await sendMail(req.body.email, subject, text); 
        
        res.status(200).json({
            data: { 
                info: info,
                msg: 'Mail sent',
                code: secretCode,
            }
        });

   
    } catch (err) {
        res.status(500).json({error: 'Server error'});
        console.log(err);
        return;
    } 
});

module.exports = router;
