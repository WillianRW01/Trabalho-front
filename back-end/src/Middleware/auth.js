const jwt = require('jsonwebtoken')
const user = require('../controller/user')

function authMiddleware(roles = []) {
    return (req, res, next) => {
        const token = req.headers["authorization"]
        console.log

        if (!token) {
           return res.status(500).json({ msg: "Usuário não está logado"})
        }

        jwt.verify(token, 'MeuSegredo123!', async (err, decoded) => {
            if (err) {
                return res.status(500).json({ msg: "Usuário não está logado"})

            }

            const userLogger =  await user.findUser(decoded.id)
            if (!userLogger) {
                return res.status(500).json("USUÁRIO NÃO ENCONTRADO")
            }
            if (roles.length && !roles.includes(userLogger.role)) {
                return res.status(500).json("USUÁRIO SEM, PERMISSÃO")
            }

            req.session = decoded
            console.log(decoded)

            next()
        })

    }
}
module.exports = authMiddleware