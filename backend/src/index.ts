import express, { Request, Response } from "express";
import cors from "cors";
import mysql, { Connection } from 'mysql';
import { createDatabaseAndTables } from "./database";
import { Cliente } from "./cliente/cliente";
import { Pet } from "./pet/pet";
import { Produto } from "./produto/produto";
import { Servico } from "./servico/servico";
import { Compra } from "./compra/compra";
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

const compraservice = new Compra(connection)


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

app.put("/alterarCliente", async (req, res) => {
    const { nome, dataEmissao, nomeSocial, cpf, cpfNovo } = req.body;

    if (!nome || !dataEmissao || !nomeSocial || !cpf || !cpfNovo) {
        res.status(400).json({ error: "Todos os campos são necessários" });
        return;
    }

    try {
        const verificaAltera = await clienteService.alterarCliente(dbName, nome, nomeSocial, cpf, dataEmissao, cpfNovo);

        if (verificaAltera) {
            console.log("Cliente alterado com sucesso");
            res.status(200).json({ message: "Cliente alterado com sucesso" });
        } else {
            console.error("Erro ao alterar cliente");
            res.status(500).json({ error: "Erro ao alterar cliente" });
        }
    } catch (error) {
        console.error("Erro ao alterar cliente", error);
        res.status(500).json({ error: "Erro ao alterar cliente" });
    }
});

app.get("/buscarclienteporCpf", async (req: Request, res: Response) => {
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

// dando bo
app.put("/alterarPet", async (req, res) => {
    const { nomePet, raca, genero, tipo, cpf, novoNomePet } = req.body;

    try {
        const verificaAlteraPet = await petservices.alterarPet(dbName, nomePet, raca, genero, tipo, cpf, novoNomePet);

        if (verificaAlteraPet) {
            console.log("Pet alterado com sucesso");
            res.status(200).send("Pet alterado com sucesso");
        } else {
            console.error("Erro ao alterar pet");
            res.status(500).send("Erro ao alterar pet");
        }
    } catch (error) {
        console.error("Erro ao alterar pet", error);
        res.status(500).send("Erro ao alterar pet");
    }
});



app.get("/buscarPetPorCpf", async (req: Request, res: Response) => {
    const cpf: string = req.query.cpf as string;

    if (!cpf) {
        res.status(400).send("Parâmetro 'cpf' não foi fornecido");
        return;
    }

    try {
        const pet = await petservices.buscarPetPorCpf(dbName, cpf)

        if (!pet) {
            res.status(404).json(null);
        } else {
            res.status(200).json(pet);
        }
    } catch (error) {
        console.error("Erro ao buscar pet por CPF", error);
        res.status(500).send("Erro ao buscar pet por CPF");
    }
});


app.get("/buscarPetPorNome", async (req: Request, res: Response) => {
    const nome: string = req.query.nome as string;

    if (!nome) {
        res.status(400).send("Parâmetro 'nomePet' não foi fornecido");
        return;
    }

    try {
        const pet = await petservices.buscarPetPorNome(dbName, nome)

        if (!pet) {
            res.status(404).json(null);
        } else {
            res.status(200).json(pet);
        }
    } catch (error) {
        console.error("Erro ao buscar pet por Nome", error);
        res.status(500).send("Erro ao buscar pet por Nome");
    }
});

app.post("/excluirPet", async (req, res) => {
    const { cpf, nomePet } = req.body;

    try {
        // Lógica para excluir o pet no banco de dados
        const resultado = await petservices.excluirPet(dbName, nomePet, cpf);

        if (resultado) {
            console.log('Pet excluído com sucesso');
            res.status(200).json({ success: true });
        } else {
            console.log('Erro ao excluir pet');
            res.status(500).json({ success: false, message: 'Erro ao excluir pet' });
        }
    } catch (error) {
        console.error('Erro ao excluir pet', error);
        res.status(500).json({ success: false, message: 'Erro ao excluir pet' });
    }
});

//bozinho
app.put("/alterarProduto", async (req, res) => {
    const { id_prod, nome, valor, descricao } = req.body;

    try {
        console.log(`Recebido para alteração - ID: ${id_prod}, Nome: ${nome}, Valor: ${valor}, Descrição: ${descricao}`);
        const produtook = await produtoservices.buscarProdutoPorId(dbName, id_prod);

        if (produtook) {
            console.log(`Produto encontrado: ${JSON.stringify(produtook)}`);
            const alteraProduto = await produtoservices.alterarProduto(dbName, id_prod, nome, descricao, valor);

            if (alteraProduto) {
                console.log("Produto alterado com sucesso");
                res.status(200).json({ message: "Produto atualizado com sucesso!" });
            } else {
                console.error("Erro ao alterar Produto no banco de dados");
                res.status(500).json({ error: "Erro ao alterar produto no banco de dados" });
            }
        } else {
            console.log("Produto não encontrado");
            res.status(404).json({ error: "Produto não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao alterar Produto", error);
        res.status(500).json({ error: "Erro interno ao tentar alterar o produto" });
    }
});


app.get("/produtos", async (req, res) => {
    try {
        const produtos = await produtoservices.buscarProduto(dbName);
        console.log("Produtos retornados do banco de dados:", produtos); // Log dos produtos retornados
        res.json(produtos);
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        res.status(500).send("Erro ao buscar produtos.");
    }
});

//bo
app.post("/excluirCliente", async(req, res) => {
    const { cpf } = req.body;

    try {
        const resultado = await clienteService.excluirCliente(dbName, cpf);
        if (resultado) {
            res.status(200).json({ success: true });
        } else {
            res.status(500).json({ success: false, message: 'Erro ao excluir cliente.' });
        }
    } catch (error) {
        console.error('Erro ao excluir cliente', error);
        res.status(500).json({ success: false, message: 'Erro interno ao processar a requisição.' });
    }
});

// bo
app.get("/verificarPetsDoCliente", async (req:Request, res:Response) => {
    const cpf:string = req.query.cpf as string

    if (!cpf) {
        res.status(400).send("Parâmetro 'cpf' não foi fornecido");
        return;
    }

    try {
        const pets = await clienteService.verificarPetsDoCliente(dbName, cpf)
        if (!pets) {
            res.status(404).json(null);
        } else {
            res.status(200).json(pets);
        }
    } catch (error) {
        console.error("Erro ao buscar pets por cpf do dono", error);
        res.status(500).send("Erro ao buscar pets por cpf do dono");
    }
})

//bozinho
app.put("/alterarServico", async (req: Request, res: Response) => {
    const { id_serv, nome, valor, descricao } = req.body;

    try {
        console.log(`Recebido para alteração - ID: ${id_serv}, Nome: ${nome}, Valor: ${valor}, Descrição: ${descricao}`);
        const servicoOk = await servicoSs.buscarServicoPorId(dbName, id_serv);

        if (servicoOk) {
            console.log(`Serviço encontrado: ${JSON.stringify(servicoOk)}`);
            const alteraServico = await servicoSs.alterarServico(dbName, id_serv, nome, descricao, valor);

            if (alteraServico) {
                console.log("Serviço alterado com sucesso");
                res.status(200).json({ message: "Serviço atualizado com sucesso!" });
            } else {
                console.error("Erro ao alterar Serviço no banco de dados");
                res.status(500).json({ error: "Erro ao alterar serviço no banco de dados" });
            }
        } else {
            console.log("Produto não encontrado");
            res.status(404).json({ error: "Serviço não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao alterar Serviço", error);
        res.status(500).json({ error: "Erro interno ao tentar alterar o produto" });
    }
});

app.get("/servicos", async (req, res) => {
    try {
        const servicos = await servicoSs.buscarServico(dbName);
        console.log("Serviços retornados do banco de dados:", servicos); // Log dos produtos retornados
        res.json(servicos);
    } catch (error) {
        console.error("Erro ao buscar serviços:", error);
        res.status(500).send("Erro ao buscar serviços.");
    }
}) 


app.post("/excluirProduto", async (req, res) => {
    const { id_prod } = req.body;

    if (!id_prod) {
        console.error("ID do produto não fornecido");
        res.status(400).send("ID do produto não fornecido");
        return;
    }

    try {
        const excluirProduto = await produtoservices.excuirProduto(dbName, id_prod);

        if (!excluirProduto) {
            console.error("Erro ao excluir produto");
            res.status(500).send("Erro ao excluir produto");
        } else {
            console.log("Produto excluído com sucesso");
            res.status(200).send("Produto excluído com sucesso");
        }
    } catch (error) {
        console.error("Erro ao excluir produto", error);
        res.status(500).send("Erro ao excluir produto");
    }
});

app.get("/buscarProdutoPorId", async(req,res) => {
    const id_prod:string  = req.query.id_prod as string
    
    if (!id_prod) {
        res.status(400).send("Parâmetro 'id' não foi fornecido");
        return;
    }

    try {
        const produto = await produtoservices.buscarProdutoPorId(dbName, id_prod)

        if (!produto) {
            res.status(404).json(null);
        } else {
            res.status(200).json(produto);
        }
    } catch (error) {
        console.error("Erro ao buscar produto por id", error);
        res.status(500).send("Erro ao buscar produto por id");
    }
});


app.post("/excluirServico", async (req, res) => {
    const { id_serv } = req.body;

    try {
        const excluirServico = await servicoSs.excluirServico(dbName, id_serv);
        if (!excluirServico) {
            console.error("Erro ao excluir serviço");
            res.status(500).send("Erro ao excluir serviço");
        } else {
            console.log("Serviço excluído com sucesso");
            res.status(200).send("Serviço excluído com sucesso");
        }
    } catch (error) {
        console.error("Erro ao excluir serviço", error);
        res.status(500).send("Erro ao excluir serviço");
    }
});

app.get("/buscarServicoPorId", async (req, res) => {
    const id_serv = req.query.id_serv as string;

    if (!id_serv) {
        res.status(400).send("Parâmetro 'id_serv' não foi fornecido");
        return;
    }

    try {
        const servico = await servicoSs.buscarServicoPorId(dbName, id_serv);

        if (!servico) {
            res.status(404).json(null);
        } else {
            res.status(200).json(servico);
        }
    } catch (error) {
        console.error("Erro ao buscar serviço por id", error);
        res.status(500).send("Erro ao buscar serviço por id");
    }
});

app.post("/cadastrarCompra", async (req, res) => {
    const { cpfCliente, idServico, idProduto } = req.body;

    if (!cpfCliente || (!idServico && !idProduto)) {
        res.status(400).send({ message: "Parâmetros insuficientes fornecidos" });
        return;
    }

    try {
        const cliente = await clienteService.buscarclienteporCpf(dbName, cpfCliente);
        if (!cliente) throw new Error("Cliente não encontrado");

        let produto = null;
        let servico = null;

        if (idProduto) {
            produto = await produtoservices.buscarProdutoPorId(dbName, idProduto);
            if (!produto) throw new Error("Produto não encontrado");
        }

        if (idServico) {
            servico = await servicoSs.buscarServicoPorId(dbName, idServico);
            if (!servico) throw new Error("Serviço não encontrado");
        }

        const nomeCliente = cliente.nome;
        const nomeP = produto ? produto.nome : null;
        const nomeS = servico ? servico.nome : null;
        const valorP = produto ? produto.valor : null;
        const valorS = servico ? servico.valor : null;

        const sucesso = await compraservice.cadastrarCompra(dbName, nomeCliente, nomeP, nomeS, valorP, valorS);

        if (sucesso) {
            res.status(200).send({ message: "Compra cadastrada com sucesso" });
        } else {
            res.status(500).send({ message: "Erro ao cadastrar compra" });
        }
    } catch (error) {
        console.error("Erro ao cadastrar compra", error);
        res.status(500).send({ message: (error as Error).message });
    }
});


app.get("/mostrarCompras", async (req, res) => {
    try {
        const compras = await compraservice.buscarCompras(dbName);
        console.log(compras)
        res.json(compras);
    } catch (error) {
        console.error('Erro ao obter compras:', error);
        res.status(500).json({ error: 'Erro interno ao obter compras' });
    }
})


