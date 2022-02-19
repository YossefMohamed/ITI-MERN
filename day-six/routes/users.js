const express = require('express');
const router = express.Router();
const user = require('../models/user');
const todo = require('../models/todo');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    const users = user.find({}).exec(function (err, usrs) {
        const l = usrs.map(usr => {
            return usr.firstName
        })
        res.json({users: l});
    });
})

router.post('/register', (req, res) => {
    const {username, password, firstName} = req.body;
    if (username && password && firstName) {
        var obj = {
            ...(req.body.age && { age: req.body.age } ),
            username,
            password,
            firstName
        }

        var newUser = new user(obj);
        newUser.save(function(err, usr){
            if(err) {
                res.json({message: 'error registering new user', success: false, error: err})
            } else {
                const token = jwt.sign({username, password}, "secretKey")
                res.json({
                    message: 'user was registered successfully and token', 
                    success: true,
                    token
                })
            }
        });

    } else {
        res.json({message: 'username, password and firstName are required', success: false})
    }
})

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    if (username && password) {
        user.findOne({username: username, password: password}).exec(function (err, usr) {
            if (err){
                res.json({
                    message: 'error while login', 
                    success: false, 
                    error: err
                })
            } else {
                if (usr) {
                    todo.find({userId: usr.userId}).exec(function (err, tds) {
                        const token = jwt.sign({username, password}, "secretKey")
                        res.json({
                            message: 'logged in successfully', 
                            success: true,
                            token,
                            todos: tds
                        })
                    })
                } else {
                    res.json({message: 'invalid credentials', success: false})
                }
            }
        })
    } else {
        res.json({message: 'username and password are required', success: false})
    }
})

router.delete('/:id', (req, res) => {
    user.findByIdAndRemove({
        _id: req.params.id
    }, (err, usr) => {
        if(err) {
            res.json({
                message: 'error deleting user', 
                success: false
            })
        } else {
            res.json({
                message: 'Successfully deleted', 
                success: true
            })
        }
    })
})

router.patch('/:id', (req, res) => {
    const obj = {
        ...(req.body.age && { age: req.body.age } ),
        ...(req.body.username && { username: req.body.username } ),
        ...(req.body.firstName && { firstName: req.body.firstName } ),
    }

    user.findOneAndUpdate({
        _id: req.params.id
    },{
        $set: obj
    }, (err, usr) => {
        if(err) {
            res.json({
                message: 'error updating user', 
                success: false
            })
        } else {
            res.json({
                message: 'Successfully updated', 
                success: true,
                user: usr
            })
        }
    });
})

module.exports=router;
