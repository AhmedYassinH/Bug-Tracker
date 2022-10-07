

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



// GET all users
const getUsers = async(req,res) => {
    

    const query = 'SELECT user_id, name, email, role  FROM users'
    

    try{
        
        const users = await pool.query(query);
        
        
        res.json({users : users.rows});
    }catch(err){
        res.status(404).json({error:err.message})
    }


}

// Add member to a team
const addMember =async (req,res)=>{

    const project_id = req.params.id;
    const user_id = req.body.user_id;

    const add_query = 'INSERT INTO relations ( project_id , user_id) VALUES ('
                       +project_id+', '
                       +'\''+user_id + '\''
                       + ')'

    const check_query = 'SELECT relations.user_id FROM relations JOIN users ON relations.user_id = users.user_id WHERE project_id ='+project_id
    
    try{
        
        const check_response = await pool.query(check_query );

        const check_existence = (user_id, response) => {
            let i;
            for (i = 0; i < response.length; i++) {
                
                if (response[i].user_id === user_id) {
                    
                    return true;
                    
                }
            }
        
            return false;
        }

       if(check_existence(user_id, check_response.rows)){

        throw Error('user already in the team')
       }

        
        


        const response = await pool.query(add_query);

        
        
        res.json({res:"Added user to the team"});
    }catch(err){
        res.status(404).json({error:err.message})
    }

}


// Delete a member fro a team
const delMember = async(req,res) => {

    const project_id = req.body.project_id ;
    const user_id = req.body.user_id ;

    const query = 'DELETE FROM relations WHERE project_id='+ project_id 
                    + '  AND user_id =\'' + user_id + '\''

    try{

        if (req.user.rows[0].role != 'ADMIN'){
            throw Error ("You Need to be an ADMIN to delete a mamber ")
        }
        
        await pool.query(query);
        
        
        res.json({res:"Member DELETED"});
    }catch(err){
        res.status(404).json({error:err.message})
    }



}




// GET Project Team
const getTeam = async(req,res) => {

    const id = req.params.id ;

    const query = 'SELECT name,relations.user_id FROM relations JOIN users ON relations.user_id = users.user_id WHERE project_id ='+id
    

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

        if (req.user.rows[0].role != 'ADMIN'){
            throw Error ("You Need to an ADMIN to create a project ")
        }
        
        await pool.query(query );
        // send back all projects
        const response = await pool.query('SELECT * from projects');
        
        
        res.json({projects : response.rows});
    }catch(err){
        res.status(404).json({error:err.message})
    }

}

// PATCH Project's status to 'Close'
const closeProject = async(req,res)=>{
    
    const id = req.params.id;
    const query = 'UPDATE projects SET status= \'CLOSED\' WHERE project_id='+ id


    try{
        if (req.user.rows[0].role != 'ADMIN'){
            throw Error ("You Need to be an ADMIN to modify a project ")
        }

        await pool.query(query);
        // send back all projects
        const response = await pool.query('SELECT * from projects');
        
       
        res.json({projects : response.rows});
    }catch(err){
        res.status(404).json({error:err.message})
    }




}

// Delete a Project

const delProject = async(req,res)=>{

    const id = req.params.id;
    const query = 'DELETE FROM projects WHERE project_id='+ id

    try{

        if (req.user.rows[0].role != 'ADMIN'){
            throw Error ("You Need to be an ADMIN to delete a project ")
        }
        
        await pool.query(query);
        // send back all projects
        const response = await pool.query('SELECT * from projects');
        
       
        res.json({projects : response.rows});
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
    delProject,
    getUsers,
    addMember,
    delMember

}







