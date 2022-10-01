
const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const projectsRoutes = require('./routes/projectRoutes')
const ticketsRoutes = require('./routes/ticketsRoutes');
// express app
const app = express();



app.use(express.json());

app.use(morgan('dev'));

app.use('/api/projects',projectsRoutes);

// Tickets routes
app.use('/api/tickets', ticketsRoutes);

// use dotenv :-
app.listen( process.env.PORT, ()=>{
    console.log('Listening to requests on' , process.env.PORT);
});
