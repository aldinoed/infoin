const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();
const userRouter = require('../blog-app-node/routes/users_router')
const postRouter = require('../blog-app-node/routes/posts_router')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(morgan('dev'));

app.use('/users', userRouter);
app.use('/posts', postRouter);

app.listen(process.env.PORT, ()=>{
    console.log('Server is running on port 3001');
})