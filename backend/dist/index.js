"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var mysql_1 = __importDefault(require("mysql"));
var database_1 = require("./database");
var cliente_1 = require("./cliente/cliente");
var pet_1 = require("./pet/pet");
var produto_1 = require("./produto/produto");
var servico_1 = require("./servico/servico");
var app = (0, express_1.default)();
var PORT = process.env.PORT || 5000;
var dbName = "PetLovers";
app.use(express_1.default.json());
app.use((0, cors_1.default)());
var connection = mysql_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'fatec',
});
connection.connect(function (err) {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao MySQL.');
    (0, database_1.createDatabaseAndTables)();
    app.listen(PORT, function () {
        console.log("Servidor iniciado na porta ".concat(PORT));
    });
});
var clienteService = new cliente_1.Cliente(connection);
var petservices = new pet_1.Pet(connection);
var produtoservices = new produto_1.Produto(connection);
var servicoSs = new servico_1.Servico(connection);
app.get('/listarClientes', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var clientes, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, clienteService.buscarClientes("PetLovers")];
            case 1:
                clientes = _a.sent();
                console.log(clientes);
                res.json(clientes);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('Erro ao obter clientes:', error_1);
                res.status(500).json({ error: 'Erro interno ao obter clientes' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/cadastroCliente", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, cpf, nome, nomeSocial, dataEmissao, cpfExistente, verificaCadastro, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, cpf = _a.cpf, nome = _a.nome, nomeSocial = _a.nomeSocial, dataEmissao = _a.dataEmissao;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, clienteService.verificaCPF(cpf)];
            case 2:
                cpfExistente = _b.sent();
                if (cpfExistente) {
                    console.log("CPF já cadastrado"); // Log no servidor
                    return [2 /*return*/, res.status(400).json({ error: "CPF já cadastrado" })]; // Enviar erro como resposta JSON
                }
                return [4 /*yield*/, clienteService.cadastrarCliente(dbName, nome, nomeSocial, cpf, dataEmissao)];
            case 3:
                verificaCadastro = _b.sent();
                if (verificaCadastro) {
                    console.log("Cliente cadastrado com sucesso");
                    res.status(200).send("Cliente cadastrado");
                }
                else {
                    console.log("Erro ao cadastrar cliente");
                    res.status(500).send("Erro ao cadastrar cliente");
                }
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                console.log("Erro ao cadastrar cliente", error_2);
                res.status(500).send("Erro ao cadastrar Cliente");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.get("/listaPet", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pets, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, petservices.buscarPet(dbName)];
            case 1:
                pets = _a.sent();
                console.log(pets);
                res.json(pets);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error('Erro ao obter pets:', error_3);
                res.status(500).json({ error: 'Erro interno ao obter pets' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/cadastrarPet", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, nomePet, raca, genero, tipo, cpf, clienteExist, verificaCadastroPet, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, nomePet = _a.nomePet, raca = _a.raca, genero = _a.genero, tipo = _a.tipo, cpf = _a.cpf;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, clienteService.verificaCPF(cpf)];
            case 2:
                clienteExist = _b.sent();
                if (!clienteExist) {
                    console.log("Cliente não cadastrado");
                    return [2 /*return*/, res.status(404).send("Cliente não cadastrado")];
                }
                return [4 /*yield*/, petservices.cadastrarPet(dbName, nomePet, raca, genero, tipo, cpf)];
            case 3:
                verificaCadastroPet = _b.sent();
                if (verificaCadastroPet) {
                    console.log("Pet cadastrado com sucesso");
                    return [2 /*return*/, res.status(200).send("Pet cadastrado com sucesso")];
                }
                else {
                    console.error("Erro ao cadastrar pet");
                    return [2 /*return*/, res.status(500).send("Erro ao cadastrar pet")];
                }
                return [3 /*break*/, 5];
            case 4:
                error_4 = _b.sent();
                console.error("Erro ao cadastrar pet", error_4);
                return [2 /*return*/, res.status(500).send("Erro ao cadastrar pet")];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.post("/cadastroProduto", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, nome, descricao, valor, verificaCad, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, nome = _a.nome, descricao = _a.descricao, valor = _a.valor;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, produtoservices.cadastrarProduto(dbName, nome, descricao, valor)];
            case 2:
                verificaCad = _b.sent();
                if (verificaCad) {
                    console.log("Produto cadastrado com sucesso");
                    res.status(200).send("Produto cadastrado com sucesso");
                }
                else {
                    console.error("Erro ao cadastrar produto");
                    res.status(500).send("Erro ao cadastrar produto");
                }
                return [3 /*break*/, 4];
            case 3:
                error_5 = _b.sent();
                console.error("Erro ao cadastrar produto", error_5);
                res.status(500).send("Erro ao cadastrar produto");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post("/cadastroServico", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, nome, descricao, valor, verificaCadServico, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, nome = _a.nome, descricao = _a.descricao, valor = _a.valor;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, servicoSs.cadastrarServico(dbName, nome, descricao, valor)];
            case 2:
                verificaCadServico = _b.sent();
                if (verificaCadServico) {
                    console.log("Serviço cadastrado com sucesso");
                    res.status(200).send("Serviço cadastrado com sucesso");
                }
                else {
                    console.error("Erro ao cadastrar serviço");
                    res.status(500).send("Erro ao cadastrar serviço");
                }
                return [3 /*break*/, 4];
            case 3:
                error_6 = _b.sent();
                console.error("Erro ao cadastrar serviço", error_6);
                res.status(500).send("Erro ao cadastrar serviço");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get("/listarProduto", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var produtos, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, produtoservices.buscarProduto(dbName)];
            case 1:
                produtos = _a.sent();
                console.log(produtos);
                res.json(produtos);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                console.error('Erro ao obter produtos:', error_7);
                res.status(500).json({ error: 'Erro interno ao obter prosutos' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/listarServico", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var servicos, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, servicoSs.buscarServico(dbName)];
            case 1:
                servicos = _a.sent();
                console.log(servicos);
                res.json(servicos);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                console.error('Erro ao obter serviços:', error_8);
                res.status(500).json({ error: 'Erro interno ao obter serviços' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.put("/alterarCliente", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, nome, dataEmissao, nomeSocial, cpf, cpfNovo, verificaAltera, error_9;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, nome = _a.nome, dataEmissao = _a.dataEmissao, nomeSocial = _a.nomeSocial, cpf = _a.cpf, cpfNovo = _a.cpfNovo;
                if (!nome || !dataEmissao || !nomeSocial || !cpf || !cpfNovo) {
                    res.status(400).json({ error: "Todos os campos são necessários" });
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, clienteService.alterarCliente(dbName, nome, nomeSocial, cpf, dataEmissao, cpfNovo)];
            case 2:
                verificaAltera = _b.sent();
                if (verificaAltera) {
                    console.log("Cliente alterado com sucesso");
                    res.status(200).json({ message: "Cliente alterado com sucesso" });
                }
                else {
                    console.error("Erro ao alterar cliente");
                    res.status(500).json({ error: "Erro ao alterar cliente" });
                }
                return [3 /*break*/, 4];
            case 3:
                error_9 = _b.sent();
                console.error("Erro ao alterar cliente", error_9);
                res.status(500).json({ error: "Erro ao alterar cliente" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get("/buscarclienteporCpf", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cpf, cliente, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cpf = req.query.cpf;
                if (!cpf) {
                    res.status(400).send("Parâmetro 'cpf' não foi fornecido");
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, clienteService.buscarclienteporCpf(dbName, cpf)];
            case 2:
                cliente = _a.sent();
                if (!cliente) {
                    res.status(404).json(null); // Cliente não encontrado
                }
                else {
                    res.status(200).json(cliente); // Cliente encontrado
                }
                return [3 /*break*/, 4];
            case 3:
                error_10 = _a.sent();
                console.error("Erro ao buscar cliente por CPF", error_10);
                res.status(500).send("Erro ao buscar cliente por CPF");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//dando problema
app.put("/alterarPet", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, nomePet, raca, genero, tipo, donoCpf, novoNomePet, verificaAlteraPet, error_11;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, nomePet = _a.nomePet, raca = _a.raca, genero = _a.genero, tipo = _a.tipo, donoCpf = _a.donoCpf, novoNomePet = _a.novoNomePet;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, petservices.alterarPet(dbName, nomePet, raca, genero, tipo, donoCpf, novoNomePet)];
            case 2:
                verificaAlteraPet = _b.sent();
                if (verificaAlteraPet) {
                    console.log("Pet alterado com sucesso");
                    res.status(200).send("Pet alterado com sucesso");
                }
                else {
                    console.error("Erro ao alterar pet");
                    res.status(500).send("Erro ao alterar pet");
                }
                return [3 /*break*/, 4];
            case 3:
                error_11 = _b.sent();
                console.error("Erro ao alterar pet", error_11);
                res.status(500).send("Erro ao alterar pet");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get("/buscarPetPorCpf", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cpf, pet, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cpf = req.query.cpf;
                if (!cpf) {
                    res.status(400).send("Parâmetro 'cpf' não foi fornecido");
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, petservices.buscarPetPorCpf(dbName, cpf)];
            case 2:
                pet = _a.sent();
                if (!pet) {
                    res.status(404).json(null);
                }
                else {
                    res.status(200).json(pet);
                }
                return [3 /*break*/, 4];
            case 3:
                error_12 = _a.sent();
                console.error("Erro ao buscar pet por CPF", error_12);
                res.status(500).send("Erro ao buscar pet por CPF");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get("/buscarPetPorNome", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var nome, pet, error_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                nome = req.query.nome;
                if (!nome) {
                    res.status(400).send("Parâmetro 'nomePet' não foi fornecido");
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, petservices.buscarPetPorNome(dbName, nome)];
            case 2:
                pet = _a.sent();
                if (!pet) {
                    res.status(404).json(null);
                }
                else {
                    res.status(200).json(pet);
                }
                return [3 /*break*/, 4];
            case 3:
                error_13 = _a.sent();
                console.error("Erro ao buscar pet por Nome", error_13);
                res.status(500).send("Erro ao buscar pet por Nome");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//dando bo
app.post("/excluirPet", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, cpf, nomePet, verificaexcluipet, error_14;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, cpf = _a.cpf, nomePet = _a.nomePet;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, petservices.excluirPet(dbName, nomePet, cpf)];
            case 2:
                verificaexcluipet = _b.sent();
                if (verificaexcluipet) {
                    console.log("Pet excluido com sucesso");
                    res.status(200).send("Pet excluido com sucesso");
                }
                else {
                    console.log("Erro ao excluir pet");
                    res.status(500).send("Erro ao excluir pet");
                }
                return [3 /*break*/, 4];
            case 3:
                error_14 = _b.sent();
                console.log("Erro ao excluir pet", error_14);
                res.status(500).send("Erro ao excluir pet");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.put("/alterarProduto", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id_prod, nome, valor, descricao, produtook, alteraProduto, error_15;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id_prod = _a.id_prod, nome = _a.nome, valor = _a.valor, descricao = _a.descricao;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                console.log("Recebido para altera\u00E7\u00E3o - ID: ".concat(id_prod, ", Nome: ").concat(nome, ", Valor: ").concat(valor, ", Descri\u00E7\u00E3o: ").concat(descricao));
                return [4 /*yield*/, produtoservices.buscarProdutoPorId(dbName, id_prod)];
            case 2:
                produtook = _b.sent();
                if (!produtook) return [3 /*break*/, 4];
                console.log("Produto encontrado: ".concat(JSON.stringify(produtook)));
                return [4 /*yield*/, produtoservices.alterarProduto(dbName, id_prod, nome, descricao, valor)];
            case 3:
                alteraProduto = _b.sent();
                if (alteraProduto) {
                    console.log("Produto alterado com sucesso");
                    res.status(200).send("Produto alterado com sucesso");
                }
                else {
                    console.error("Erro ao alterar Produto");
                    res.status(500).send("Erro ao alterar produto");
                }
                return [3 /*break*/, 5];
            case 4:
                console.log("Produto não encontrado");
                res.status(404).send("Produto não encontrado");
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_15 = _b.sent();
                console.error("Erro ao alterar Produto", error_15);
                res.status(500).send("Erro ao alterar produto");
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
app.get("/produtos", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var produtos, error_16;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, produtoservices.buscarProduto(dbName)];
            case 1:
                produtos = _a.sent();
                console.log("Produtos retornados do banco de dados:", produtos); // Log dos produtos retornados
                res.json(produtos);
                return [3 /*break*/, 3];
            case 2:
                error_16 = _a.sent();
                console.error("Erro ao buscar produtos:", error_16);
                res.status(500).send("Erro ao buscar produtos.");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/* app.put("/alterarServico", async (req: Request, res: Response) => {
    
});

app.get("/servicos", async (req, res) => {

}) */ 
