import express, { Request, Response } from "express";
import cors from "cors";
import mysql, { Connection } from 'mysql'; // Importe também o 'Connection' do MySQL
import { createDatabaseAndTables } from "./database";
import { Cliente } from "./cliente/cliente";

const app = express();
const PORT = process.env.PORT || 5000;
const dbName = "PetLovers"
app.use(express.json());

// Configurações de CORS
const corOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
    optionsSuccessStatus: 200,
};
app.use(cors());

// Configuração da conexão MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'fatec',
});

// Conectar ao MySQL e criar a database e tabelas
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao MySQL.');

    createDatabaseAndTables(); 

    // Após criar as tabelas, iniciar o servidor Express
    app.listen(PORT, () => {
        console.log(`Servidor iniciado na porta ${PORT}`);
    });
});

// Instanciar o serviço de Cliente após a conexão estar estabelecida
const clienteService = new Cliente(connection);

// Rotas da API
app.get('/listarClientes', async (req, res) => {
    try {
        const clientes = await clienteService.buscarClientes("PetLovers");
        console.log(clientes)
        res.json(clientes);
    } catch (error) {
        console.error('Erro ao obter clientes:', error);
        res.status(500).json({ error: 'Erro interno ao obter clientes' });
    }
});

app.post("/cadastroCliente", async (req, res) => {
    const { cpf, nome, nomeSocial, dataEmissao } = req.body;

    try {
        const cpfExistente = await clienteService.verificaCPF(cpf);

        if (cpfExistente) {
            console.log("CPF já cadastrado"); // Log no servidor
            return res.status(400).json({ error: "CPF já cadastrado" }); // Enviar erro como resposta JSON
        }

        const verificaCadastro = await clienteService.cadastrarCliente(dbName, nome, nomeSocial, cpf, dataEmissao);

        if (verificaCadastro) {
            console.log("Cliente cadastrado com sucesso");
            res.status(200).send("Cliente cadastrado");
        } else {
            console.log("Erro ao cadastrar cliente");
            res.status(500).send("Erro ao cadastrar cliente");
        }
    } catch (error) {
        console.log("Erro ao cadastrar cliente", error);
        res.status(500).send("Erro ao cadastrar Cliente");
    }
});

