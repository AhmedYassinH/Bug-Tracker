



const express = require('express');
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();


const { getProjects, getTicketsAndMembers, getTeam, 
    createProject, closeProject, delProject,
     getUsers, addUser} = require('../controllers/projectsControllers');



// require authentication for all project routes
router.use(requireAuth)

// GET all Projects
router.get('/',getProjects);


// GET all users
router.get('/users',getUsers);

// Add user to a team
router.post('/add-user/:id',addUser);



// GET all tickets and members associated
router.get('/:id',getTicketsAndMembers);



// GET Project Team
router.get('/team/:id',getTeam) ;


// POST a new Project
router.post('/',createProject);


// PATCH Project's status to 'Close'
router.patch('/:id',closeProject);

// Delete a Project
router.delete('/:id',delProject);





module.exports=router