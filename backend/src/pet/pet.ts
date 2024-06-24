import { Connection } from "mysql"


export class Pet {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }

    async buscarPet(dbName: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(`SELECT * FROM pet`, (error, results) => {
                        if (error) {
                            console.error("Erro ao buscar pet:", error)
                            reject(error)
                        } else {
                            resolve(results)
                        }
                    })
                }
            })
        })
    }

    async cadastrarPet(dbName: string, nome: string, raca: string, genero: string, tipo: string, donoCpf: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.connection.query(`Use ${dbName};`, (useError, useResults) => {
                if (useError) {
                    console.error("Erro ao selecionar database")
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso")
                    this.connection.query(`INSERT INTO pet (nomePet, raca, genero, tipo, cpfDoDono) VALUES(?, ?, ?, ?, ?)`, [nome, raca, genero, tipo, donoCpf], (error, results) => {
                        if (error) {
                            console.log("Erro ao cadastrar Pet")
                            reject(error)
                        } else {
                            console.log("Pet cadastrado com sucesso")
                            resolve(true)
                        }
                    })
                }

            })
        })
    }

    async buscarPetPorCpf(dbName: string, cpf: string) {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(`SELECT * FROM pet WHERE cpfDoDono = ?`, [cpf], (error, results) => {
                        if (error) {
                            console.error("Erro ao buscar pet por CPF:", error)
                            reject(error)
                        } else {
                            resolve(results[0])
                        }
                    })
                }
            })
        })
    }

    async buscarPetPorNome(dbName: string, nomePet: string) {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(`SELECT * FROM pet WHERE nomePet = ?`, [nomePet], (error, results) => {
                        if (error) {
                            console.error("Erro ao buscar pet por Nome:", error)
                            reject(error)
                        } else {
                            resolve(results[0])
                        }
                    })
                }
            })
        })
    }

    async alterarPet(dbName: string, nome: string, raca: string, genero: string, tipo: string, donoCpf: string, novoNomePet: string) {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(
                        `
                        UPDATE pet
                        SET nomePet = ?, raca = ?, genero = ?, tipo = ?
                        WHERE cpfDoDono = ? and nomePet = ?;
                        `,
                        [novoNomePet, raca, genero, tipo, donoCpf, nome],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao atualizar pet:", error)
                                reject(error)
                            } else {
                                console.log("Pet atualizado com sucesso!")
                                resolve(results[0])
                            }
                        }
                    )
                }
            })
        })
    }

    async excluirPet(dbName:string, nomePet:string, cpf:string) {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError);
                    reject(useError);
                } else {
                    console.log("Banco de dados selecionado com sucesso!");
                    this.connection.query(
                        `DELETE FROM pet WHERE nomePet = ? AND cpfDoDono = ?;`,
                        [nomePet, cpf],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao excluir pet:", error);
                                reject(error);
                            } else {
                                if (results.affectedRows > 0) {
                                    console.log("Pet excluído com sucesso!");
                                    resolve(true); // Exclusão bem-sucedida
                                } else {
                                    console.log("Pet não encontrado ou não pôde ser excluído.");
                                    resolve(false); // Nenhum pet foi excluído (não encontrado)
                                }
                            }
                        }
                    );
                }
            });
        });
    }
    



}



