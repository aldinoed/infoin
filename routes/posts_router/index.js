const express = require('express');
const {createPost, getPostDetail, deletePost, updatePost, getAllPosts} = require('../../resolver/post_resolver');

const postRouter = express.Router();

postRouter.get('/', getAllPosts);
postRouter.get('/:id/show-post', getPostDetail);
postRouter.post('/insert-post', createPost);
postRouter.put('/:id/update-post', updatePost);
postRouter.delete('/:id/delete-post', deletePost);

module.exports = postRouter;