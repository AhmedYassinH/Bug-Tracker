
const pool = require('./sqlconnect');

// GET the ticket Name, Status, Type, Team members

const getTicket = async(req,res)=>{


    const id = req.params.id;

    try{
        
        const response = await pool.query('SELECT * from tickets WHERE ticket_id='+ id);
        
        
        res.json({projects : response.rows});

    }catch(err){
        res.status(404).json({error:err.message})
    }

}


// POST a Ticket(Name,Status,Type,Members if found)

const createTicket = async(req,res)=>{
    
    

    let query = 'INSERT INTO tickets  (name'
                +(req.body.project_id? (', project_id'):'')
                +(req.body.user_id? (', user_id'):'') 
                +(req.body.status? (', status'):'')
                +(req.body.type? (', type'):'')
                + ') VALUES ('
                +' \''+req.body.name+ '\''
                +(req.body.project_id? (', \''+req.body.project_id+ '\''):'') 
                +(req.body.user_id? (', \''+req.body.user_id+ '\''):'')
                +(req.body.status? (', \''+req.body.status+ '\''):'') 
                +(req.body.type? (', \''+req.body.type+ '\''):'') 
                + ')'
            


    try{
        
        const response = await pool.query(query);
                                        
        
        res.json({res:"TICKET CREATED"});
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
    
    

    try{
        
        const response = await pool.query(query);
        
        
        res.json({res:"TICKET UPDATED"});
    }catch(err){
        res.status(404).json({error:err.message});
    }

}

// DELETE a Ticket(Name,Status,Type,Members if found)
const delTicket = async(req,res)=>{

    const id = req.params.id;

    const query = 'DELETE FROM tickets WHERE ticket_id = ' + id ;
    
    

    try{
        
        const response = await pool.query(query);
        
        
        res.json({res:"TICKET DELETED"});
    }catch(err){
        res.status(404).json({error:err.message})
    }

}




module.exports = {
    getTicket,
    createTicket,
    updateTicket,
    delTicket

}
