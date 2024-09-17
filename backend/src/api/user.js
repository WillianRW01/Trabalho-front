const UserController = require('../controller/user')

class UserApi {
    findUser(req, res) {
        try {
            UserController.findAll()
            res.send({ users })
        } catch (e) {
            console.log(e)
            res.status(400).send('Deu erro')
        }
    }

    createUser(req, res) {
        try {
            UserController.create()
            res.send('post')
        } catch (e) {
            console.log(e)
            res.status(400).send('Deu erro')
        }
    }

    updateUser(req, res) {
        try {
            UserController.update()
            res.send('put')
        } catch (e) {
            console.log(e)
            res.status(400).send('Deu erro')
        }
    }

    deleteUser(req, res) {
        try {
            UserController.delete()
            res.send('delete')
        } catch (e) {
            console.log(e)
            res.status(400).send('Deu erro')
        }
    }
}

module.exports = new UserApi()