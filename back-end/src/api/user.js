const UserController = require('../controller/user')

class UserApi {

    findUser(req, res) {

        console.log("api", req.session)
        try {
            const users = UserController.findAll()
            res.send({ users });
        } catch (e) {
            console.log(e)
            res.status(400).send('Deu erro')
        }
    }

    createUser(req, res) {
        const { name, email, password } = req.body
        try {
            UserController.createUser(name, email, password, 'viewer')
            res.send('Usuario criado com sucesso!');
        } catch (e) {
            console.log(e)
            res.status(400).send('Deu erro')
        }
    }

    updateUser(req, res) {
        const { id } = req.params;
        const { nome, email, senha } = req.body;

        try {
            UserController.updateUser(id, { nome, email, senha });
            res.send('Usuario alterado com sucesso!');
        } catch (e) {
            console.log(e);
            res.status(400).send('An error occurred');
        }
    }


    deleteUser(req, res) {
        const { id } = req.params;
        try {
            UserController.deleteUser(id);
            res.send('Usuario deletado com sucesso!');
        } catch (e) {
            console.log(e);
            res.status(400).send('An error occurred');
        }
    }

    createUserAdmin(req, res) {
        const { nome, email, senha } = req.body
        try {
            UserController.user(nome, email, senha, 'admin')
            res.send('post');
        } catch (e) {
            console.log(e)
            res.status(400).send('Deu erro')
        }
    }


    updateUserAdmin(req, res) {
        const { id } = req.params;
        const { nome, email, senha } = req.body;

        try {
            UserController.updateUser(id, { nome, email, senha });
            res.send('Usuario Admin alterado com sucesso!');
        } catch (e) {
            console.log(e);
            res.status(400).send('An error occurred');
        }
    }


    deleteUserAdmin(req, res) {
        const { id } = req.params;
        try {
            UserController.deleteUser(id);
            res.send('Usuario Admin deletado com sucesso!');
        } catch (e) {
            console.log(e);
            res.status(400).send('An error occurred');
        }
    }

    async login(req, res) {
        const { email, password } = req.body
        try {
            const token = await UserController.login(email, password)
            res.send({ token });
        } catch (e) {
            console.log(e)
            res.status(400).send('Deu erro')
        }
    }
}

module.exports = new UserApi()