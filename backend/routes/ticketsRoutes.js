


const express = require('express');

const router = express.Router();
const requireAuth = require('../middleware/requireAuth')



const {getTicket, getComments, createComment, createTicket, updateTicket, delTicket} = require('../controllers/ticketsControllers');


// require authentication for all tickets routes
router.use(requireAuth)

// GET the ticket Name, Status, Type, Team members
router.get('/:id',getTicket);

// GET Comments
router.get('/comments/:id',getComments);

// POST a Comment
router.post('/comment/:id' , createComment);


// POST a Ticket(Name,Status,Type,Members if found)
router.post('/',createTicket);

// PATCH a Ticket(Name,Status,Type,Members if found)
router.patch('/:id',updateTicket);

// DELETE a Ticket(Name,Status,Type,Members if found)
router.delete('/:id',delTicket);


module.exports = router;