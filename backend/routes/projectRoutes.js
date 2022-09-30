

const express = require('express');


const router = express.Router();






// GET all Projects
router.get('/',(req,res)=>{
    res.json({mss:" GET all Projects"});
});

// GET all tickets and members associated
router.get('/:id',(req,res)=>{
    res.json({mss:" GET all tickets and members"});
});


// POST a new Project
router.post('/:id',(req,res)=>{
    res.json({mss:" POST a new Project"});
});


// PATCH Project's status to 'Close'
router.patch('/:id',(req,res)=>{
    res.json({mss:" Update a Project"});
});

// Delete a Project
router.delete('/:id',(req,res)=>{
    res.json({mss:" DELETE a Project"});
});





module.exports=router