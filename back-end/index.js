const express = require('express');
const cors = require("cors");
const useRouter = require('./src/routes/user');
const pokemonRouter = require('./src/routes/pokemon');
const database = require('./src/config/database');
const  authMiddleware = require('./src/Middleware/auth');
const UserApi = require('./src/api/user');
const app = express();
 
app.use(express.json());
app.use(cors())
 
app.get("/", (req, res) => {
    res.status(200).json({ message: "OK" });
  });
 
app.post("/api/v1/user/login", UserApi.login);
app.post("/api/v1/user", UserApi.createUser);
 
app.use("/api/v1/user",authMiddleware(), useRouter);
app.use("/api/v1/pokemon", pokemonRouter);  
 
database.db
    .sync({ force:false })
    .then((_) => {
        app.listen(3000, () => {
            console.log("Servidor rodando na porta 3000");
        });
    })
    .catch((e) => {
        console.error("Erro ao conectar com o banco: ", e);
    });
 
 