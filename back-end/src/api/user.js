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
    
    async findContext(req,res){
        try {
           const user = await UserController.findUser(req?.session?.id || 0)
           return res.status(200).send(user)
        } catch (e) {
            return res.status(400).send({error: `Erro Ao listar usuário ${e.message}`})
            
        }
    }

    async createUser(req, res) {
        const { name, email, senha } = req.body;
        console.log(req.body)
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
        const { name, email, senha } = req.body;
        try {
            await UserController.updateUser(id, { name, email, senha }); 
            res.send('Usuario alterado com sucesso!');
        } catch (e) {
            console.log(e);
            res.status(400).send('Deu erro');
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            await UserController.delete(id);
            res.send('Usuario deletado com sucesso!');
        } catch (e) {
            console.log(e);
            res.status(400).send('Deu erro');
        }
    }

    async createUserAdmin(req, res) {
        const { name, email, password } = req.body;
        try {
            await UserController.createUser(name, email, password, 'admin'); 
            res.send('Usuario admin criado com sucesso!');
        } catch (e) {
            console.log(e);
            res.status(400).send('Deu erro');
        }
    }

    async updateUserAdmin(req, res) {
        const id  = req.params.id || req.session.id;
        const { name, email, password } = req.body;
        try {
            await UserController.updateUser(id, { name, email, password }); 
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

    async BloquearUser(req, res) {
        const { id } = req.params;

        try {
            const user = await UserController.BloquearUser(Number(id));
            return res.status(200).send(user);
        } catch (e) {
            return res.status(400).send({ error: `Erro ao bloquear usuário: ${e.message}` });
        }
    }

    async DesbloquearUser(req, res) {
        const { id } = req.params;

        try {
            const user = await UserController.DesbloquearUser(Number(id));
            return res.status(200).send(user);
        } catch (e) {
            return res.status(400).send({ error: `Erro ao desbloquear usuário: ${e.message}` });
        }
    }
}

module.exports = new UserApi();
