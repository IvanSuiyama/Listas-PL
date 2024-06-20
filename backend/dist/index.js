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
var mysql_1 = __importDefault(require("mysql")); // Importe também o 'Connection' do MySQL
var database_1 = require("./database");
var cliente_1 = require("./cliente/cliente");
var pet_1 = require("./pet/pet");
var app = (0, express_1.default)();
var PORT = process.env.PORT || 5000;
var dbName = "PetLovers";
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Configuração da conexão MySQL
var connection = mysql_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'fatec',
});
// Conectar ao MySQL e criar a database e tabelas
connection.connect(function (err) {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao MySQL.');
    (0, database_1.createDatabaseAndTables)();
    // Após criar as tabelas, iniciar o servidor Express
    app.listen(PORT, function () {
        console.log("Servidor iniciado na porta ".concat(PORT));
    });
});
// Instanciar o serviço de Cliente após a conexão estar estabelecida
var clienteService = new cliente_1.Cliente(connection);
var petservices = new pet_1.Pet(connection);
// Rotas da API
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
app.put("/alterarCliente", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, nome, nomeSocial, cpf, novoCpf, dataEmissao, clienteexist, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, nome = _a.nome, nomeSocial = _a.nomeSocial, cpf = _a.cpf, novoCpf = _a.novoCpf, dataEmissao = _a.dataEmissao;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, clienteService.buscarUsuarioPorCpf(dbName, cpf)];
            case 2:
                clienteexist = _b.sent();
                if (!clienteexist) {
                    res.status(404).send("Cliente não encontrado");
                }
                return [4 /*yield*/, clienteService.alterarCliente(dbName, nome, nomeSocial, novoCpf, dataEmissao, cpf)];
            case 3:
                _b.sent();
                console.log("Cliente alterado com sucesso");
                res.status(200).send("Cliente alterado com sucesso");
                return [3 /*break*/, 5];
            case 4:
                error_3 = _b.sent();
                console.error("Erro ao alterar cliente");
                res.status(500).send("Erro ao alterar cliente");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.get("/listaPet", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var clientes, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, petservices.buscarPet("PetLovers")];
            case 1:
                clientes = _a.sent();
                console.log(clientes);
                res.json(clientes);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error('Erro ao obter pets:', error_4);
                res.status(500).json({ error: 'Erro interno ao obter pets' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/cadastrarPet", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, nomePet, raca, genero, tipo, cpf, clienteexist, verificaCadastroPet, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, nomePet = _a.nomePet, raca = _a.raca, genero = _a.genero, tipo = _a.tipo, cpf = _a.cpf;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, clienteService.verificaCPF(cpf)];
            case 2:
                clienteexist = _b.sent();
                if (!clienteexist) {
                    console.log("cliente não cadastrado");
                    res.status(404).send("Cliente não cadastrado");
                }
                return [4 /*yield*/, petservices.cadastrarPet(dbName, nomePet, raca, genero, tipo, cpf)];
            case 3:
                verificaCadastroPet = _b.sent();
                if (verificaCadastroPet) {
                    console.log("pet cadastrado com sucesso");
                    res.status(200).send("Pet cadastrado com sucesso");
                }
                else {
                    console.error("Erro ao cadastrar pet");
                    res.status(500).send("Erro ao cadastrar pet");
                }
                return [3 /*break*/, 5];
            case 4:
                error_5 = _b.sent();
                console.error("Erro ao cadastrar pet", error_5);
                res.status(500).send("Erro ao cadastrar pet");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
