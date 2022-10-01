



const express = require('express');

const router = express.Router();


const { getProjects, getTicketsAndMembers, createProject, closeProject, delProject} = require('../controllers/projectsControllers');


// GET all Projects
router.get('/',getProjects);

// GET all tickets and members associated
router.get('/:id',getTicketsAndMembers);


// POST a new Project
router.post('/',createProject);


// PATCH Project's status to 'Close'
router.patch('/:id',closeProject);

// Delete a Project
router.delete('/:id',delProject);





module.exports=router