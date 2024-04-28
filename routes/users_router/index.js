const express = require('express');
const {createUser, getAllUser, deleteUser, updateUser, getUserDetail} = require('../../resolver/users_resolver');

const userRouter = express.Router();

userRouter.get('/', getAllUser);
userRouter.get('/:id/show-user', getUserDetail);
userRouter.post('/insert-user', createUser);
userRouter.put('/:id/update-user', updateUser);
userRouter.delete('/:id/delete-user', deleteUser);

module.exports = userRouter;