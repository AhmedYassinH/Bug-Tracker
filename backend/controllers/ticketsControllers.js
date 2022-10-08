
const pool = require('./sqlconnect');

// GET the ticket Name, Status, Type, Team members

const getTicket = async(req,res)=>{


    const id = req.params.id;

    try{
        
        const response = await pool.query('SELECT * from tickets WHERE ticket_id='+ id)
        
        
        res.json({ticket : response.rows});

    }catch(err){
        res.status(404).json({error:err.message})
    }

}



// GET Comments and who wrote them
const getComments = async(req,res)=>{


    const id = req.params.id;

    try{
        
        const comments = await pool.query('SELECT * from comments LEFT JOIN users ON comments.user_id = users.user_id WHERE ticket_id='+ id)
        
        
        res.json({comments : comments.rows});

    }catch(err){
        res.status(404).json({error:err.message})
    }

}


// POST a Comment
 
const createComment = async(req,res)=>{
    const id = req.params.id;
    const user_id = req.user.rows[0].user_id
    const query = 'INSERT INTO comments (comment, ticket_id, user_id) VALUES (\''
    +req.body.comment + '\','
    + id + ','
    + '\'' + user_id + '\'' 
    +')' ;


    try{

    await pool.query(query);
                                
    const comments = await pool.query('SELECT * from comments LEFT JOIN users ON comments.user_id = users.user_id WHERE ticket_id='+ id)
    res.json({comments : comments.rows});
    }catch(err){
    res.status(404).json({error:err.message}) ;
    }



}









// POST a Ticket(Name,Status,Type,Members if found)

const createTicket = async(req,res)=>{
    
    const user_id = req.user.rows[0].user_id ;

    let query = 'INSERT INTO tickets  (name, project_id'
                +(user_id? (', user_id'):'') 
                +(req.body.status? (', status'):'')
                +(req.body.type? (', type'):'')
                + ') VALUES ('
                +' \''+req.body.name+ '\''
                +', \''+req.body.project_id+ '\'' 
                +(user_id? (', \''+user_id+ '\''):'')
                +(req.body.status? (', \''+req.body.status+ '\''):'') 
                +(req.body.type? (', \''+req.body.type+ '\''):'') 
                + ')'
            
    const ticketsQuery = 'SELECT * FROM tickets where project_id='+req.body.project_id;
    console.log('request', query)
    try{
        
        if (req.user.rows[0].role != 'ADMIN'){
            throw Error ("You Need to an ADMIN to create a ticket ")
        }

        await pool.query(query);
                                        
        const tickets = await pool.query(ticketsQuery);
        
        res.json({tickets : tickets.rows});
    }catch(err){
        res.status(404).json({error:err.message}) ;
    }


}

// PATCH a Ticket(Name,Status,Type,Members if found)
const updateTicket = async(req,res)=>{

    const id = req.params.id;

    let query = 'UPDATE tickets SET'
    +(req.body.name? (' name = \''+req.body.name+ '\' ,'):'') 
    +(req.body.status? (' status = \''+req.body.status+ '\' ,'):'') 
    +(req.body.type? ('type =  \''+req.body.type+ '\' ,'):'') 
    +(req.body.project_id? ('project_id =  \''+req.body.project_id+ '\' ,'):'') 
    +(req.body.user_id? ('user_id =  \''+req.body.user_id+ '\' ,'):'') 

    query = query.substring(0,query.length-1) + 'WHERE ticket_id='+ id ;
    const ticketsQuery = 'SELECT * FROM tickets WHERE project_id IN (SELECT project_id FROM tickets where ticket_id='+id+')';
    

    try{
        

        await pool.query(query);
        const tickets = await pool.query(ticketsQuery);
        
        res.json({tickets : tickets.rows});
    }catch(err){
        res.status(404).json({error:err.message});
    }

}

// DELETE a Ticket(Name,Status,Type,Members if found)
const delTicket = async(req,res)=>{

    const id = req.params.id;

    const query = 'DELETE FROM tickets WHERE ticket_id = ' + id ;
    

    const project_id_query = 'SELECT project_id FROM tickets where ticket_id='+id
    
    

    try{
        if (req.user.rows[0].role != 'ADMIN'){
            throw Error ("You Need to an ADMIN to delete a ticket ")
        }
        
        const project_id = await pool.query(project_id_query);
        await pool.query(query);
        const ticketsQuery = 'SELECT * FROM tickets WHERE project_id ='+ project_id.rows[0].project_id;
        
        const tickets = await pool.query(ticketsQuery);

        
        res.json({tickets : tickets.rows});
    }catch(err){
        res.status(404).json({error:err.message})
    }

}




module.exports = {
    getTicket,
    getComments,
    createComment,
    createTicket,
    updateTicket,
    delTicket

}
