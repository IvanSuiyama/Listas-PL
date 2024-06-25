import { Connection } from "mysql";

export class Compra {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }


    async cadastrarCompra(dbName: string, nomeCliente: string, cpfCliente:string, nomeP:string, nomeS:string, valorP:string, valorS:string): Promise<boolean>{
        return new Promise((resolve, reject) => {
            this.connection.query(`Use ${dbName};`, (useError, useResults) => {
                if (useError) {
                    console.error("Erro ao selecionar database")
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso")
                    this.connection.query(`INSERT INTO compras (nomeCliente, cpfCliente, nomeP, nomeS, valorP, valorS) VALUES(?, ?, ?, ?, ?, ?)`, [nomeCliente, cpfCliente, nomeP, nomeS, valorP, valorS], (error, results) => {
                        if (error) {
                            console.log("Erro ao cadastrar Compra")
                            reject(error)
                        } else {
                            console.log("Compra cadastrada com sucesso")
                            resolve(true)
                        }
                    })
                }

            })
        })
    }

    async buscarCompras(dbName: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(`SELECT * FROM compras`, (error, results) => {
                        if (error) {
                            console.error("Erro ao buscar compras:", error)
                            reject(error)
                        } else {
                            resolve(results)
                        }
                    })
                }
            })
        })
    }

    async buscarQuantidadeServicosPorCPF(dbName:string, cpf:string) {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, useResults) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError);
                    reject(useError);
                } else {
                    console.log("Banco de dados selecionado com sucesso");
    
                    this.connection.query(`SELECT COUNT(*) AS quantidadeServicos FROM compras WHERE cpfCliente = ? AND nomeS IS NOT NULL`, [cpf], (error, results) => {
                        if (error) {
                            console.error("Erro ao buscar quantidade de serviços:", error);
                            reject(error);
                        } else {
                            const quantidadeServicos = results[0].quantidadeServicos;
                            resolve(quantidadeServicos);
                        }
                    });
                }
            });
        });
    }

    async buscarQuantidadeProdutosPorCPF(dbName:string, cpf:string) {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, useResults) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError);
                    reject(useError);
                } else {
                    console.log("Banco de dados selecionado com sucesso");
    
                    this.connection.query(`SELECT COUNT(*) AS quantidadeProdutos FROM compras WHERE cpfCliente = ? AND nomeP IS NOT NULL`, [cpf], (error, results) => {
                        if (error) {
                            console.error("Erro ao buscar quantidade de produtos:", error);
                            reject(error);
                        } else {
                            const quantidadeProdutos = results[0].quantidadeProdutos;
                            resolve(quantidadeProdutos);
                        }
                    });
                }
            });
        });
    }

    async buscarServicosConsumidos(dbName: string): Promise<{ nomeS: string }[]> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, async (useError, useResults) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError);
                    reject(useError);
                } else {
                    console.log("Banco de dados selecionado com sucesso");
    
                    // Consulta SQL para buscar os serviços consumidos
                    this.connection.query(`SELECT nomeS FROM compras WHERE nomeS IS NOT NULL`, (error, results) => {
                        if (error) {
                            console.error("Erro ao buscar serviços consumidos:", error);
                            reject(error);
                        } else {
                            // Transforma os resultados em um array de objetos { nomeS: string }
                            const servicosConsumidos = results.map((row: any) => ({ nomeS: row.nomeS }));
                            resolve(servicosConsumidos);
                        }
                    });
                }
            });
        });
    }


    async buscarProdutosConsumidos(dbName: string): Promise<{ nomeP: string }[]> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, async (useError, useResults) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError);
                    reject(useError);
                } else {
                    console.log("Banco de dados selecionado com sucesso");
    
                    // Consulta SQL para buscar os produtos consumidos
                    this.connection.query(`SELECT nomeP FROM compras WHERE nomeP IS NOT NULL`, (error, results) => {
                        if (error) {
                            console.error("Erro ao buscar produtos consumidos:", error);
                            reject(error);
                        } else {
                            // Transforma os resultados em um array de objetos { nomeP: string }
                            const produtosConsumidos = results.map((row: any) => ({ nomeP: row.nomeP }));
                            resolve(produtosConsumidos);
                        }
                    });
                }
            });
        });
    }

    async buscarTop5ClientesMaisConsumiram(dbName: string) {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, async (useError, useResults) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError);
                    reject(useError);
                } else {
                    console.log("Banco de dados selecionado com sucesso");
    
                    // Consulta SQL para buscar o total consumido por cada cpfCliente
                    this.connection.query(`
                        SELECT cpfCliente, 
                               SUM(IFNULL(CAST(valorS AS DECIMAL), 0)) AS totalValorS, 
                               SUM(IFNULL(CAST(valorP AS DECIMAL), 0)) AS totalValorP 
                        FROM compras 
                        GROUP BY cpfCliente
                        ORDER BY (totalValorS + totalValorP) DESC
                        LIMIT 5
                    `, (error, results) => {
                        if (error) {
                            console.error("Erro ao buscar os top 5 clientes que mais consumiram:", error);
                            reject(error);
                        } else {
                            // Retorna os top 5 clientes que mais consumiram
                            resolve(results);
                        }
                    });
                }
            });
        });
    }
    
    async buscarTop5SePporReT(dbName: string) {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, async (useError, useResults) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError);
                    reject(useError);
                } else {
                    console.log("Banco de dados selecionado com sucesso");
    
                    // Consulta SQL para buscar os top 5 produtos consumidos por tipo e raça de pet
                    const query = `
                        SELECT p.tipo AS tipoPet, p.raca AS racaPet,
                               COUNT(c.nomeP) AS quantidadeProdutos
                        FROM compras c
                        JOIN pet p ON c.cpfCliente = p.cpfDoDono
                        WHERE c.nomeP IS NOT NULL
                        GROUP BY p.tipo, p.raca
                        ORDER BY quantidadeProdutos DESC
                        LIMIT 5
                    `;
    
                    this.connection.query(query, (error, results) => {
                        if (error) {
                            console.error("Erro ao buscar top produtos consumidos por tipo e raça de pet:", error);
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    });
                }
            });
        });
    }
    
    
    
    
    

}