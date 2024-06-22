import express, { Request, Response } from "express";
import cors from "cors";
import mysql, { Connection } from 'mysql';
import { createDatabaseAndTables } from "./database";
import { Cliente } from "./cliente/cliente";
import { Pet } from "./pet/pet";
import { Produto } from "./produto/produto";
import { Servico } from "./servico/servico";
const app = express();
const PORT = process.env.PORT || 5000;
const dbName = "PetLovers"
app.use(express.json());


app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'fatec',
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao MySQL.');

    createDatabaseAndTables();

    app.listen(PORT, () => {
        console.log(`Servidor iniciado na porta ${PORT}`);
    });
});

const clienteService = new Cliente(connection);

const petservices = new Pet(connection);

const produtoservices = new Produto(connection);

const servicoSs = new Servico(connection)



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



app.get("/listaPet", async (req, res) => {
    try {
        const pets = await petservices.buscarPet(dbName);
        console.log(pets);
        res.json(pets);
    } catch (error) {
        console.error('Erro ao obter pets:', error);
        res.status(500).json({ error: 'Erro interno ao obter pets' });
    }
});

app.post("/cadastrarPet", async (req, res) => {
    const { nomePet, raca, genero, tipo, cpf } = req.body;

    try {
        const clienteExist = await clienteService.verificaCPF(cpf);

        if (!clienteExist) {
            console.log("Cliente não cadastrado");
            return res.status(404).send("Cliente não cadastrado");
        }

        const verificaCadastroPet = await petservices.cadastrarPet(dbName, nomePet, raca, genero, tipo, cpf);
        if (verificaCadastroPet) {
            console.log("Pet cadastrado com sucesso");
            return res.status(200).send("Pet cadastrado com sucesso");
        } else {
            console.error("Erro ao cadastrar pet");
            return res.status(500).send("Erro ao cadastrar pet");
        }
    } catch (error) {
        console.error("Erro ao cadastrar pet", error);
        return res.status(500).send("Erro ao cadastrar pet");
    }
});

app.post("/cadastroProduto", async (req, res) => {
    const { nome, descricao, valor } = req.body

    try {
        const verificaCad = await produtoservices.cadastrarProduto(dbName, nome, descricao, valor);

        if (verificaCad) {
            console.log("Produto cadastrado com sucesso")
            res.status(200).send("Produto cadastrado com sucesso")
        }
        else {
            console.error("Erro ao cadastrar produto")
            res.status(500).send("Erro ao cadastrar produto")
        }

    } catch (error) {
        console.error("Erro ao cadastrar produto", error)
        res.status(500).send("Erro ao cadastrar produto")
    }
})


app.post("/cadastroServico", async (req, res) => {
    const { nome, descricao, valor } = req.body

    try {
        const verificaCadServico = await servicoSs.cadastrarServico(dbName, nome, descricao, valor);

        if (verificaCadServico) {
            console.log("Serviço cadastrado com sucesso")
            res.status(200).send("Serviço cadastrado com sucesso")
        }
        else {
            console.error("Erro ao cadastrar serviço")
            res.status(500).send("Erro ao cadastrar serviço")
        }

    } catch (error) {
        console.error("Erro ao cadastrar serviço", error)
        res.status(500).send("Erro ao cadastrar serviço")
    }
})


app.get("/listarProduto", async (req, res) => {
    try {
        const produtos = await produtoservices.buscarProduto(dbName)
        console.log(produtos);
        res.json(produtos);
    } catch (error) {
        console.error('Erro ao obter produtos:', error);
        res.status(500).json({ error: 'Erro interno ao obter prosutos' });
    }
});

app.get("/listarServico", async (req, res) => {
    try {
        const servicos = await servicoSs.buscarServico(dbName);
        console.log(servicos);
        res.json(servicos);
    } catch (error) {
        console.error('Erro ao obter serviços:', error);
        res.status(500).json({ error: 'Erro interno ao obter serviços' });
    }
});

app.put("/alterarClienes", async (req, res) => {
    const { cpf } = req.body
    const { nome, dataEmissao, nomeSocial, cpfNovo } = req.body

    try {
        
        const verificaAltera = await clienteService.alterarCliente(dbName, nome, nomeSocial, cpf, dataEmissao, cpfNovo)

        if (verificaAltera) {
            console.log("Cliente alterado com sucesso")
            res.status(200).send("Cliente alterado com sucesso")
        }

        else {
            console.error("Erro ao alterar cliente")
            res.status(500).send("Erro ao alterar cliente");

        }

    } catch (error) {
        console.error("Erro ao alterar cliente", error)
        res.status(500).send("Erro ao cadstrar cliente")
    }

})

app.get("/buscarClientePorCpf", async (req: Request, res: Response) => {
    const cpf: string = req.query.cpf as string;

    if (!cpf) {
        res.status(400).send("Parâmetro 'cpf' não foi fornecido");
        return;
    }

    try {
        const cliente = await clienteService.buscarclienteporCpf(dbName, cpf);

        if (!cliente) {
            res.status(404).json(null); // Cliente não encontrado
        } else {
            res.status(200).json(cliente); // Cliente encontrado
        }
    } catch (error) {
        console.error("Erro ao buscar cliente por CPF", error);
        res.status(500).send("Erro ao buscar cliente por CPF");
    }
});
