const express = require('express')
const { createUser, deleteUser, getAllUsers, getUser, updateUser } = require('../controllers/userController')
const { signUp, login } = require('../controllers/authController')

const userRouter = express.Router();
// method to sign up a new user
userRouter.route('/signup').post(signUp);
// method to log in a user
userRouter.route('/login').post(login);

// methods to /api/user
userRouter.route('/').get(getAllUsers).post(createUser)
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
module.exports = userRouter;
