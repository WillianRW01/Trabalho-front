const express = require('express');
const useRouter = require('./src/router/user');
const pokemonRouter = require('./src/router/pokemon'); // Importar as rotas de Pokémon
const database = require('./src/config/database');

const app = express();

app.use(express.json());

app.use("/api/v1/user", useRouter);
app.use("/api/v1", pokemonRouter); 

database.db
    .sync({ force: false })
    .then((_) => {
        app.listen(3000, () => {
            console.log("Servidor rodando na porta 3000");
        });
    })
    .catch((e) => {
        console.error("Erro ao conectar com o banco: ", e);
    });