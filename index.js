const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();
const userRouter = require('./routes/users_router')
const postRouter = require('./routes/posts_router')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(morgan('dev'));
app.listen(process.env.PORT, ()=>{
    console.log('Server is running on port 3001');
})

app.use('/users', userRouter);
app.use('/posts', postRouter);

module.exports = app;