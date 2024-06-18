"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
// Configurações de conexão com o banco de dados MySQL
var connection = mysql_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'fatec',
});
// Função para criar a database PetLovers e as tabelas
// Função para criar a database PetLovers e as tabelas
function createDatabaseAndTables() {
    // Conectar ao MySQL
    connection.connect(function (err) {
        if (err) {
            console.error('Erro ao conectar ao MySQL:', err);
            return;
        }
        console.log('Conectado ao MySQL.');
        // Criar a database PetLovers se não existir
        connection.query('CREATE DATABASE IF NOT EXISTS PetLovers', function (err) {
            if (err) {
                console.error('Erro ao criar a database PetLovers:', err);
                connection.end();
                return;
            }
            console.log('Database PetLovers criada com sucesso.');
            // Alterar a conexão para usar a database PetLovers
            connection.changeUser({ database: 'PetLovers' }, function (err) {
                if (err) {
                    console.error('Erro ao selecionar a database PetLovers:', err);
                    connection.end();
                    return;
                }
                console.log('Conectado à database PetLovers.');
                // Query para criar a tabela cliente
                var createClienteTableQuery = "\n            CREATE TABLE IF NOT EXISTS cliente (\n              nome VARCHAR(255) PRIMARY KEY,\n              nomeSocial VARCHAR(255),\n              cpf VARCHAR(14) UNIQUE,\n              dt_emissao DATE\n            )\n          ";
                // Query para criar o índice na coluna 'nome' da tabela cliente
                var createClienteIndexQuery = "\n            CREATE INDEX idx_nome ON cliente(nome)\n          ";
                // Query para criar a tabela pet
                var createPetTableQuery = "\n          CREATE TABLE IF NOT EXISTS pet (\n            id_pet INT AUTO_INCREMENT PRIMARY KEY,\n            nomePet VARCHAR(255),\n            raca VARCHAR(100),\n            genero VARCHAR(10),\n            tipo VARCHAR(100),\n            cpfDoDono VARCHAR(14),\n            FOREIGN KEY (cpfDoDono) REFERENCES cliente(cpf)\n          )\n        ";
                var createPetIndexQuery = "\n        CREATE INDEX idx_nomePet ON pet(nomePet)\n      ";
                // Query para criar a tabela produto
                var createProdutoTableQuery = "\n          CREATE TABLE IF NOT EXISTS produto (\n            id_prod INT AUTO_INCREMENT PRIMARY KEY,\n            nome VARCHAR(255),\n            descricao TEXT,\n            valor DECIMAL(10, 2),\n            cpf_dono VARCHAR(14),\n            id_pet INT,\n            FOREIGN KEY (cpf_dono) REFERENCES cliente(cpf),\n            FOREIGN KEY (id_pet) REFERENCES pet(id_pet)\n          )\n        ";
                var createProdutoIndexQuery = "\n        CREATE INDEX idx_nome_produto ON produto(nome)\n      ";
                // Query para criar a tabela servico
                var createServicoTableQuery = "\n          CREATE TABLE IF NOT EXISTS servico (\n            id_serv INT AUTO_INCREMENT PRIMARY KEY,\n            nome VARCHAR(255),\n            descricao TEXT,\n            valor DECIMAL(10, 2),\n            cpf_dono VARCHAR(14),\n            id_pet INT,\n            FOREIGN KEY (cpf_dono) REFERENCES cliente(cpf),\n            FOREIGN KEY (id_pet) REFERENCES pet(id_pet)\n          )\n        ";
                var createServicoIndexQuery = "\n        CREATE INDEX idx_nome_servico ON servico(nome)\n      ";
                // Query para criar a tabela compras
                var createComprasTableQuery = "\n          CREATE TABLE IF NOT EXISTS compras (\n            id_compra INT AUTO_INCREMENT PRIMARY KEY,\n            nomeCliente VARCHAR(255),\n            nomePet VARCHAR(255),\n            nomeP VARCHAR(255),\n            nomeS VARCHAR(255),\n            valorP DECIMAL(10, 2),\n            valorS DECIMAL(10, 2),\n            FOREIGN KEY (nomeCliente) REFERENCES cliente(nome),\n            FOREIGN KEY (nomePet) REFERENCES pet(nomePet),\n            FOREIGN KEY (nomeP) REFERENCES produto(nome),\n            FOREIGN KEY (nomeS) REFERENCES servico(nome)\n          )\n        ";
                // Executar as queries para criar as tabelas
                connection.query(createClienteTableQuery, function (err) {
                    if (err) {
                        console.error('Erro ao criar tabela cliente:', err);
                        connection.end();
                        return;
                    }
                    console.log('Tabela cliente criada com sucesso.');
                    connection.query(createClienteIndexQuery, function (err) {
                        if (err) {
                            console.error('Erro ao criar índice na tabela cliente:', err);
                            connection.end();
                            return;
                        }
                        console.log('Índice criado na tabela cliente.');
                        connection.query(createPetTableQuery, function (err) {
                            if (err) {
                                console.error('Erro ao criar tabela pet:', err);
                                connection.end();
                                return;
                            }
                            console.log('Tabela pet criada com sucesso.');
                            connection.query(createPetIndexQuery, function (err) {
                                if (err) {
                                    console.error('Erro ao criar índice na tabela pet:', err);
                                    connection.end();
                                    return;
                                }
                                console.log('Índice criado na tabela pet.');
                                connection.query(createProdutoTableQuery, function (err) {
                                    if (err) {
                                        console.error('Erro ao criar tabela produto:', err);
                                        connection.end();
                                        return;
                                    }
                                    console.log('Tabela produto criada com sucesso.');
                                    connection.query(createProdutoIndexQuery, function (err) {
                                        if (err) {
                                            console.error('Erro ao criar índice na tabela produto:', err);
                                            connection.end();
                                            return;
                                        }
                                        console.log('Índice criado na tabela produto.');
                                        connection.query(createServicoTableQuery, function (err) {
                                            if (err) {
                                                console.error('Erro ao criar tabela servico:', err);
                                                connection.end();
                                                return;
                                            }
                                            console.log('Tabela servico criada com sucesso.');
                                            connection.query(createServicoIndexQuery, function (err) {
                                                if (err) {
                                                    console.error('Erro ao criar índice na tabela servico:', err);
                                                    connection.end();
                                                    return;
                                                }
                                                console.log('Índice criado na tabela servico.');
                                                connection.query(createComprasTableQuery, function (err) {
                                                    if (err) {
                                                        console.error('Erro ao criar tabela compras:', err);
                                                        connection.end();
                                                        return;
                                                    }
                                                    console.log('Tabela compras criada com sucesso.');
                                                    // Fechar conexão após a criação das tabelas
                                                    connection.end();
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}
// Chamar a função para criar a database e as tabelas ao executar o arquivo database.ts
createDatabaseAndTables();
