const express = require('express');
const {createPost, getPostDetail, deletePost, getAllPosts} = require('../../resolver/post_resolver');

const postRouter = express.Router();

postRouter.get('/', getAllPosts);
postRouter.get('/:id/show-post', getPostDetail);
postRouter.post('/create-post', createPost);
postRouter.delete('/:id/delete-post', deletePost);

module.exports = postRouter;