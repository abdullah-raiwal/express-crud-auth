const express = require('express')
const { createUser, deleteUser, getAllUsers, getUser, updateUser } = require('../controllers/userController')

const userRouter = express.Router();
// methods to /api/user
userRouter.route('/').get(getAllUsers).post(createUser)
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
module.exports = userRouter;