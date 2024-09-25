const express = require('express');
const UserApi = require('../api/user');
const authMiddleware = require('../Middleware/auth');

const useRouter = express.Router();

useRouter.post('/login', UserApi.login)
useRouter.get('/', authMiddleware(['admin', 'viewer']), UserApi.findUser);

useRouter.post('/', UserApi.createUser);
useRouter.post('/admin', authMiddleware(['admin']), UserApi.createUserAdmin); //CREATE USER E ADMIN

useRouter.put('/:id', UserApi.updateUser);
useRouter.put('/admin/:id', authMiddleware(['admin']), UserApi.updateUserAdmin); //UPDATE USER E ADMIN

useRouter.delete('/:id', UserApi.deleteUser);
useRouter.delete('/admin/:id', authMiddleware(['admin']), UserApi.deleteUserAdmin); //DELETE USER E ADMIN

module.exports = useRouter;