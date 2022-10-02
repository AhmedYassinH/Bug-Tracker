

const pool = require('./sqlconnect');




// GET all Projects

const getProjects = async (req,res)=>{

    try{
        const response = await pool.query('SELECT * from projects');

        res.json({projects : response.rows});
    }catch(err){
        res.status(404).json({error:err.message})
    }



}



// GET all tickets and members associated
const getTicketsAndMembers = async (req,res)=>{

    const id = req.params.id ;

    const ticketsQuery = 'SELECT * FROM tickets where project_id='+id
    const membersQuery = 'SELECT * FROM relations JOIN users ON relations.user_id = users.user_id WHERE project_id =' + id


    try{
        
        const tickets = await pool.query(ticketsQuery);
        const members = await pool.query(membersQuery);
        
        res.json({tickets : tickets.rows, members : members.rows});
    }catch(err){
        res.status(404).json({error:err.message})
    }



}

// GET Project Team
const getTeam = async(req,res) => {

    const id = req.params.id ;

    const query = 'SELECT name FROM relations JOIN users ON relations.user_id = users.user_id WHERE project_id ='+id
    

    try{
        
        const team = await pool.query(query);
        
        res.json({team : team.rows});
    }catch(err){
        res.status(404).json({error:err.message})
    }


}






// POST a new Project
const createProject =async (req,res)=>{


    const query = 'INSERT INTO projects(name'
                + (req.body.description? (',description'):'')
                +') VALUES(\''+req.body.name+'\''
                +(req.body.description? (', \''
                +req.body.description+ '\''):'') 
                + ')'

    try{
        
        const response = await pool.query(query );
        
        
        res.json({res:"PROJECT CREATED"});
    }catch(err){
        res.status(404).json({error:err.message})
    }

}

// PATCH Project's status to 'Close'
const closeProject = async(req,res)=>{
    
    const id = req.params.id;
    const query = 'UPDATE projects SET status= \'CLOSED\' WHERE project_id='+ id


    try{
        
        const response = await pool.query(query);
        
       
        res.json({res:"PROJECT UPDATED"});
    }catch(err){
        res.status(404).json({error:err.message})
    }




}

// Delete a Project

const delProject = async(req,res)=>{

    const id = req.params.id;
    const query = 'DELETE FROM projects WHERE project_id='+ id

    try{
        
        const response = await pool.query(query);
        
        
        res.json({res:"PROJECT DELETED"});
    }catch(err){
        res.status(404).json({error:err.message})
    }

}



module.exports = {
    getProjects,
    getTicketsAndMembers,
    getTeam,
    createProject,
    closeProject,
    delProject

}







