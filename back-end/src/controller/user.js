const UserModel = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const salts = 12;
class UserController {

    async createUser(name, email, senha, role) {
        if (!name || !email || !senha) {
            throw new Error("Name, email e senha são obrigatórios.");
        }

        const passwordHashed = await bcrypt.hash(senha, salts)

        if(email==='admin@admin.com.br'){
            return UserModel.create({
                name,
                email,
                senha: passwordHashed, 
                role: "admin"
            });
        }

        const userValue = await UserModel.create({
            name,
            email,
            senha: passwordHashed, 
            role,
        });
        return userValue;
    }
    async findUser(id) { 
        return UserModel.findByPk(id); 
    }


    async updateUser(id, { name, email, senha, role }) {
        const user = await UserModel.findByPk(id); 
        if (!user) {
            throw new Error("Usuário não encontrado.");
        }

        if (senha) {
            const senhaHashed = await bcrypt.hash(senha, salts);
            user.senha = senhaHashed;
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (role) user.role = role;

        const updatedUser = await user.save();
        return updatedUser;
    }

    async deleteUser(id) {
        const user = await UserModel.findByIdAndDelete(id);
        if (!user) {
            throw new Error("Usuário não encontrado.");
        }
        return user;
    }


    async findAll() {
        return UserModel.findAll();
    }

    async login(email, senha) {
        const userLogged = await UserModel.findOne({ where: { email } });
    
        if (!userLogged) {
            throw new Error("Email ou senha inválido. Tente novamente!");
        }
    
    
        const validPassword = await bcrypt.compare(senha, userLogged.senha);
    
        if (!validPassword) {
            throw new Error("Email ou senha inválido. Tente novamente!");
        }
    
        return jwt.sign(
            { id: userLogged.id, email: userLogged.email, role:userLogged.role },
            'MeuSegredo123!',
            { expiresIn: 60 * 60}
        );
    }
    async BloquearUser(id){
        const userValue = await this.findUser(id);
        userValue.status = 'bloqueado';
        await userValue.save();
        return userValue;
    }

    async DesbloquearUser(id){
        const userValue = await this.findUser(id);
        userValue.status = 'ativo';
        await userValue.save();
        return userValue;
    }
    

}

module.exports = new UserController();
