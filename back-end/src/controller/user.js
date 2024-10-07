const UserModel = require('../model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const salts = 12;
class UserController {

    async createUser(name, email, password,role) {
        if (!name || !email || !password) {
            throw new Error("Name, email e password são obrigatórios.")
        }

        const passwordHashed = bcrypt.hash(password, salts)

        const userValue = await UserModel.create({
            name,
            email,
            password,
            role
        })
        return userValue;
    }

    async updateUser(id, { name, email, password, role }) {
        const user = await user.findById(id);
        if (!user) {
            throw new Error("Usuário não encontrado.");
        }
    
        if (password) {
            const passwordHashed = await bcrypt.hash(password, salts);
            user.password = passwordHashed;
        }
    
        if (name) user.name = name;
        if (email) user.email = email;
        if (role) user.role = role;
    
        const updatedUser = await user.save();
        return updatedUser;
    }

    async deleteUser(id) {
        const user = await user.findByIdAndDelete(id);
        if (!user) {
            throw new Error("Usuário não encontrado.");
        }
        return user;
    }    
    
    findAll() {
        return user.findAll();
    }

    async login(email, password) {
        const userLogged = await user.findOne({ where: { email }});

        if(!userLogged) {
            throw new Error("Email ou senha inválido. Tente novamente!")
        }

        const validPassword = userLogged.password === password;
        
        if(!validPassword) {
            throw new Error("Email ou senha inválido. Tente novamente!")
        }

        return jwt.sign({ id: userLogged.id, email: userLogged.email },
            'MeuSegredo123!'

        )
    }
}

module.exports = new UserController;