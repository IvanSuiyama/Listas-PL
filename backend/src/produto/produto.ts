import { Connection } from "mysql"


export class Produto {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }

    async buscarProduto(dbName: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(`SELECT * FROM produto`, (error, results) => {
                        if (error) {
                            console.error("Erro ao buscar produto:", error)
                            reject(error)
                        } else {
                            resolve(results)
                        }
                    })
                }
            })
        })
    }

    async cadastrarProduto(dbName: string, nome: string, descricao:string, valor:number): Promise<boolean>{
        return new Promise((resolve, reject) => {
            this.connection.query(`Use ${dbName};`, (useError, useResults) => {
                if (useError) {
                    console.error("Erro ao selecionar database")
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso")
                    this.connection.query(`INSERT INTO produto (nome, descricao, valor) VALUES(?, ?, ?)`, [nome, descricao, valor], (error, results) => {
                        if (error) {
                            console.log("Erro ao cadastrar produto")
                            reject(error)
                        } else {
                            console.log("Produto cadastrado com sucesso")
                            resolve(true)
                        }
                    })
                }

            })
        })
    }

    async alterarProduto(dbName:string, id_produto:string, nome:string, descricao:string, valor:string) {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(
                        `
                        UPDATE produto
                        SET nome = ?, descricao = ?, valor = ?
                        WHERE id_prod = ?;
                        `,
                        [nome, descricao, valor, id_produto],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao atualizar produto:", error)
                                reject(error)
                            } else {
                                console.log("Produto atualizado com sucesso!")
                                resolve(results[0])
                            }
                        }
                    )
                }
            })
        })
    }

    async buscarProdutoPorId(dbName: string, id_produto: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError);
                    reject(useError);
                } else {
                    console.log("Banco de dados selecionado com sucesso!");
                    this.connection.query(`SELECT * FROM produto WHERE id_prod = ?`, [id_produto], (error, results) => {
                        if (error) {
                            console.error("Erro ao buscar produto:", error);
                            reject(error);
                        } else {
                            console.log(`Produto encontrado: ${JSON.stringify(results[0])}`);
                            resolve(results[0]);
                        }
                    });
                }
            });
        });
    }

    async excuirProduto(dbName:string, id_prod:string){
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError);
                    reject(useError);
                } else {
                    console.log("Banco de dados selecionado com sucesso!");
                    this.connection.query(
                        `DELETE from produto WHERE id_prod = ?;
                        `,
                        [id_prod],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao excluir Produto :", error);
                                reject(error);
                            } else {
                                console.log("Produto excluido com sucesso!");
                                resolve(results.affectedRows > 0);  // Verifique se houve atualização
                            }
                        }
                    );
                }
            });
        });
    }

}