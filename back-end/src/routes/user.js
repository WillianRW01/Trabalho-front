const express = require('express');
const UserApi = require('../api/user');
const authMiddleware = require('../Middleware/auth');

const useRouter = express.Router();

useRouter.post('/login', UserApi.login)
useRouter.get('/', authMiddleware(['admin', 'viewer']), UserApi.findUser);

useRouter.post('/admin', authMiddleware(['admin']), UserApi.createUserAdmin); 

useRouter.put('/', authMiddleware(), UserApi.updateUser);
useRouter.put('/admin/:id', authMiddleware(['admin']), UserApi.updateUserAdmin);

useRouter.delete('/:id', authMiddleware(), UserApi.deleteUser);
useRouter.delete('/admin/:id', authMiddleware(['admin']), UserApi.deleteUserAdmin); 

useRouter.post('/BloquearUser/:id', authMiddleware(['admin']), UserApi.BloquearUser)
useRouter.post('/DesbloquerUser/:id', authMiddleware(['admin']), UserApi.DesbloquearUser)

module.exports = useRouter;