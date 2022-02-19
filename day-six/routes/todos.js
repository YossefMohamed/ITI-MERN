const express = require('express');
const router = express.Router();
const todo = require('../models/todo');

router.post('/', (req, res) => {
    const {userId, title} = req.body;
    if (userId && title) {
        var obj = {
            ...(req.body.status && { status: req.body.status } ),
            title,
            userId
        }

        var newTodo = new todo(obj);
        newTodo.save(function(err, td){
            if(err) {
                res.json({message: 'error creating todo', success: false})
            } else {
                res.json({
                    message: 'todo created successfully', 
                    success: true,
                    data: td
                })
            }
        });

    } else {
        res.json({message: 'userId and title are required', success: false})
    }
})

router.get('/:userId', (req, res) => {
    todo.findById({
        userId: req.params.userId
    }, (err, td) => {
        if(err) {
            res.json({
                message: 'error finding todo', 
                success: false
            })
        } else {
            res.json({
                message: 'Successfully found', 
                success: true,
                data: td
            })
        }
    })
})

router.delete('/:id', (req, res) => {
    todo.findByIdAndRemove({
        _id: req.params.id
    }, (err, td) => {
        if(err) {
            res.json({
                message: 'error deleting todo', 
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
        ...(req.body.title && { age: req.body.title } ),
        ...(req.body.status && { username: req.body.status } ),
    }

    todo.findOneAndUpdate({
        _id: req.params.id
    },{
        $set: obj
    }, (err, td) => {
        if(err) {
            res.json({
                message: 'error updating todo', 
                success: false
            })
        } else {
            res.json({
                message: 'Successfully updated', 
                success: true,
                data: td
            })
        }
    });
})

module.exports=router;
