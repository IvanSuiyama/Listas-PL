import { Connection } from "mysql"


export class Cliente {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }

    async buscarClientes(dbName: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(`SELECT * FROM cliente`, (error, results) => {
                        if (error) {
                            console.error("Erro ao buscar clientes:", error)
                            reject(error)
                        } else {
                            resolve(results)
                        }
                    })
                }
            })
        })
    }

    async cadastrarCliente(dbName: string, nome: string, nomeSocial:string, cpf:string, dt_emissao:string): Promise<boolean>{
        return new Promise((resolve, reject) => {
            this.connection.query(`Use ${dbName};`, (useError, useResults) => {
                if (useError) {
                    console.error("Erro ao selecionar database")
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso")
                    this.connection.query(`INSERT INTO cliente (nome, cpf, nomeSocial, dt_emissao) VALUES(?, ?, ?, ?)`, [nome, cpf, nomeSocial, dt_emissao], (error, results) => {
                        if (error) {
                            console.log("Erro ao cadastrar Cliente")
                            reject(error)
                        } else {
                            console.log("Cliente cadastrado com sucesso")
                            resolve(true)
                        }
                    })
                }

            })
        })
    }

    async verificaCPF(cpf: string) : Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.connection.query(`Use PetLovers;`, (useError, useResults) => {
                if (useError) {
                    console.error("Erro ao selecionar database")
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso")
                    this.connection.query(`Select cpf from cliente where cpf = ?`,[cpf], (error, results) => {
                        if (error) {
                            console.log("Erro ao buscar CPF", error)
                            reject(error)
                        } else {
                            if (results.length > 0) {
                                console.log("CPF já cadastrado: ", results[0].cpf)
                                resolve(true)
                            }
                            else {
                                resolve(false)
                            }
                        }
                            
                    })
                }
        })
    }

        )
    }

    async buscarclienteporCpf(dbName: string, cpf: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(`SELECT * FROM cliente WHERE cpf = ?`, [cpf], (error, results) => {
                        if (error) {
                            console.error("Erro ao buscar cliente por CPF:", error)
                            reject(error)
                        } else {
                            resolve(results[0])
                        }
                    })
                }
            })
        })
    }

    async alterarCliente(
        dbName: string,
        nome: string,
        nomeSocial: string,
        cpf: string,
        dt_emissao: string,
        cpfNovo: string,
    ) {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError);
                    reject(useError);
                } else {
                    console.log("Banco de dados selecionado com sucesso!");
                    this.connection.query(
                        `
                        UPDATE cliente
                        SET nome = ?, nomeSocial = ?, cpf = ?, dt_emissao = ?
                        WHERE cpf = ?;
                        `,
                        [nome, nomeSocial, cpfNovo, dt_emissao, cpf],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao atualizar cliente:", error);
                                reject(error);
                            } else {
                                console.log("Cliente atualizado com sucesso!");
                                resolve(results.affectedRows > 0);  // Verifique se houve atualização
                            }
                        }
                    );
                }
            });
        });
    }

    async excluirCliente(dbName:string, cpf:string) {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError);
                    reject(useError);
                } else {
                    console.log("Banco de dados selecionado com sucesso!");
                    this.connection.query(
                        `DELETE FROM cliente WHERE cpf = ?;`,
                        [cpf],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao excluir cliente:", error);
                                reject(error);
                            } else {
                                if (results.affectedRows > 0) {
                                    console.log("Cliente excluído com sucesso!");
                                    resolve(true); // Exclusão bem-sucedida
                                } else {
                                    console.log("Cliente não encontrado ou não pôde ser excluído.");
                                    resolve(false); // Nenhum pet foi excluído (não encontrado)
                                }
                            }
                        }
                    );
                }
            });
        });
    }

    async verificarPetsDoCliente(dbName: string, cpf: string): Promise<number> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError);
                    reject(useError);
                } else {
                    this.connection.query(
                        `SELECT COUNT(*) AS petCount FROM pet WHERE cpfDoDono = ?;`,
                        [cpf],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao verificar pets do cliente:", error);
                                reject(error);
                            } else {
                                const petCount = results[0].petCount as number; // Convertendo para number
                                resolve(petCount);
                            }
                        }
                    );
                }
            });
        });
    }
    

}