import mysql from 'mysql';

// Configurações de conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'fatec',
});

// Função para criar a database PetLovers e as tabelas
// Função para criar a database PetLovers e as tabelas
export function createDatabaseAndTables() {
    // Conectar ao MySQL
    connection.connect((err) => {
      if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
      }
      console.log('Conectado ao MySQL.');
  
      // Criar a database PetLovers se não existir
      connection.query('CREATE DATABASE IF NOT EXISTS PetLovers', (err) => {
        if (err) {
          console.error('Erro ao criar a database PetLovers:', err);
          connection.end();
          return;
        }
        console.log('Database PetLovers criada com sucesso.');
  
        // Alterar a conexão para usar a database PetLovers
        connection.changeUser({ database: 'PetLovers' }, (err) => {
          if (err) {
            console.error('Erro ao selecionar a database PetLovers:', err);
            connection.end();
            return;
          }
          console.log('Conectado à database PetLovers.');
  
          // Query para criar a tabela cliente
          const createClienteTableQuery = `
            CREATE TABLE IF NOT EXISTS cliente (
              nome VARCHAR(255),
              nomeSocial VARCHAR(255),
              cpf VARCHAR(14) PRIMARY KEY,
              dt_emissao VARCHAR(20)
            )
          `;
          
          // Query para criar o índice na coluna 'nome' da tabela cliente
          const createClienteIndexQuery = `
            CREATE INDEX idx_nome ON cliente(nome)
          `;
          
        // Query para criar a tabela pet
        const createPetTableQuery = `
          CREATE TABLE IF NOT EXISTS pet (
            id_pet INT AUTO_INCREMENT PRIMARY KEY,
            nomePet VARCHAR(255),
            raca VARCHAR(100),
            genero VARCHAR(10),
            tipo VARCHAR(100),
            cpfDoDono VARCHAR(14),
            FOREIGN KEY (cpfDoDono) REFERENCES cliente(cpf)
          )
        `;

        const createPetIndexQuery = `
        CREATE INDEX idx_nomePet ON pet(nomePet)
      `;

        // Query para criar a tabela produto
        const createProdutoTableQuery = `
          CREATE TABLE IF NOT EXISTS produto (
            id_prod INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255),
            descricao TEXT,
            valor DECIMAL(10, 2),
            cpf_dono VARCHAR(14),
            id_pet INT,
            FOREIGN KEY (cpf_dono) REFERENCES cliente(cpf),
            FOREIGN KEY (id_pet) REFERENCES pet(id_pet)
          )
        `;

        const createProdutoIndexQuery = `
        CREATE INDEX idx_nome_produto ON produto(nome)
      `;

        // Query para criar a tabela servico
        const createServicoTableQuery = `
          CREATE TABLE IF NOT EXISTS servico (
            id_serv INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255),
            descricao TEXT,
            valor DECIMAL(10, 2),
            cpf_dono VARCHAR(14),
            id_pet INT,
            FOREIGN KEY (cpf_dono) REFERENCES cliente(cpf),
            FOREIGN KEY (id_pet) REFERENCES pet(id_pet)
          )
        `;

        const createServicoIndexQuery = `
        CREATE INDEX idx_nome_servico ON servico(nome)
      `;


        // Query para criar a tabela compras
        const createComprasTableQuery = `
          CREATE TABLE IF NOT EXISTS compras (
            id_compra INT AUTO_INCREMENT PRIMARY KEY,
            nomeCliente VARCHAR(255),
            nomePet VARCHAR(255),
            nomeP VARCHAR(255),
            nomeS VARCHAR(255),
            valorP DECIMAL(10, 2),
            valorS DECIMAL(10, 2),
            FOREIGN KEY (nomeCliente) REFERENCES cliente(nome),
            FOREIGN KEY (nomePet) REFERENCES pet(nomePet),
            FOREIGN KEY (nomeP) REFERENCES produto(nome),
            FOREIGN KEY (nomeS) REFERENCES servico(nome)
          )
        `;

        // Executar as queries para criar as tabelas
        connection.query(createClienteTableQuery, (err) => {
            if (err) {
              console.error('Erro ao criar tabela cliente:', err);
              connection.end();
              return;
            }
            console.log('Tabela cliente criada com sucesso.');
  
            connection.query(createClienteIndexQuery, (err) => {
              if (err) {
                console.error('Erro ao criar índice na tabela cliente:', err);
                connection.end();
                return;
              }
              console.log('Índice criado na tabela cliente.');
  

          connection.query(createPetTableQuery, (err) => {
            if (err) {
              console.error('Erro ao criar tabela pet:', err);
              connection.end();
              return;
            }
            console.log('Tabela pet criada com sucesso.');

            connection.query(createPetIndexQuery, (err) => {
                if (err) {
                  console.error('Erro ao criar índice na tabela pet:', err);
                  connection.end();
                  return;
                }
                console.log('Índice criado na tabela pet.');

            connection.query(createProdutoTableQuery, (err) => {
              if (err) {
                console.error('Erro ao criar tabela produto:', err);
                connection.end();
                return;
              }
              console.log('Tabela produto criada com sucesso.');


               connection.query(createProdutoIndexQuery, (err) => {
                    if (err) {
                      console.error('Erro ao criar índice na tabela produto:', err);
                      connection.end();
                      return;
                    }
                    console.log('Índice criado na tabela produto.');

                    connection.query(createServicoTableQuery, (err) => {
                      if (err) {
                        console.error('Erro ao criar tabela servico:', err);
                        connection.end();
                        return;
                      }
                      console.log('Tabela servico criada com sucesso.');

                      connection.query(createServicoIndexQuery, (err) => {
                        if (err) {
                          console.error('Erro ao criar índice na tabela servico:', err);
                          connection.end();
                          return;
                        }
                        console.log('Índice criado na tabela servico.');

                        connection.query(createComprasTableQuery, (err) => {
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


