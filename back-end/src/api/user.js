const UserController = require('../controller/user');

class UserApi {

    async findUser(req, res) {
        try {
            const users = await UserController.findAll(); 
            res.send({ users });
        } catch (e) {
            console.log(e);
            res.status(400).send('Deu erro');
        }
    }

    async createUser(req, res) {
        const { name, email, senha } = req.body;
        try {
            await UserController.createUser(name, email, senha, 'viewer');
            res.send('Usuario criado com sucesso!');
        } catch (e) {
            console.log(e);
            res.status(400).send('Deu erro');
        }
    }

    async updateUser(req, res) {
        const id  = req.params.id || req.session.id;
        console.log(id)
        const { nome, email, senha } = req.body;
        try {
            await UserController.updateUser(id, { nome, email, senha }); 
            res.send('Usuario alterado com sucesso!');
        } catch (e) {
            console.log(e);
            res.status(400).send('Deu erro');
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            await UserController.deleteUser(id);
            res.send('Usuario deletado com sucesso!');
        } catch (e) {
            console.log(e);
            res.status(400).send('Deu erro');
        }
    }

    async createUserAdmin(req, res) {
        const { nome, email, senha } = req.body;
        try {
            await UserController.createUser(nome, email, senha, 'admin'); 
            res.send('Usuario admin criado com sucesso!');
        } catch (e) {
            console.log(e);
            res.status(400).send('Deu erro');
        }
    }

    async updateUserAdmin(req, res) {
        const id  = req.params.id || req.session.id;
        const { nome, email, senha } = req.body;
        try {
            await UserController.updateUser(id, { nome, email, senha }); 
            res.send('Usuario Admin alterado com sucesso!');
        } catch (e) {
            console.log(e);
            res.status(400).send('Deu erro');
        }
    }

    async deleteUserAdmin(req, res) {
        const { id } = req.params;
        try {
            await UserController.deleteUser(id); 
            res.send('Usuario Admin deletado com sucesso!');
        } catch (e) {
            console.log(e);
            res.status(400).send('Deu erro');
        }
    }

    async login(req, res) {
        const { email, senha } = req.body;
        try {
            const token = await UserController.login(email, senha); 
            res.send({ token });
        } catch (e) {
            console.log(e);
            res.status(400).send('Deu erro');
        }
    }
}

module.exports = new UserApi();
