
const express = require('express');

const router = express.Router();


// GET the ticket Name, Status, Type, Team members
router.get('/:id',(req,res)=>{
    res.json({mss:" GET a ticket info"});
});


// POST a Ticket(Name,Status,Type,Members if found)
router.post('/:id',(req,res)=>{
    res.json({mss:" POST a ticket info"});
});

// PATCH a Ticket(Name,Status,Type,Members if found)
router.patch('/:id',(req,res)=>{
    res.json({mss:" UPDATE a ticket info"});
});

// DELETE a Ticket(Name,Status,Type,Members if found)
router.delete('/:id',(req,res)=>{
    res.json({mss:" DELETE a ticket info"});
});



module.exports = router;