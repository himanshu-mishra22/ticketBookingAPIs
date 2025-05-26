const express = require('express');
const dotenv = require('dotenv').config();
// const {db}= require('./db/mysql');
const authRoutes = require('./routes/authRoutes')
const eventRoutes = require('./routes/eventRoutes')
const bookRoutes = require('./routes/bookRoutes')

const app = express();

app.use(express.json());
// app.get('/',(req,res)=>{
//     res.send('Hello World')
// });

app.use('/backend/auth', authRoutes);
app.use('/backend/events', eventRoutes);
app.use('/backend/bookings',bookRoutes );


app.listen(process.env.BACKEND_PORT,()=>{
    console.log(`server: ${process.env.BACKEND_PORT}`);
});