import { Connection } from "mysql"


export class Servico {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }

    async buscarServico(dbName: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(`SELECT * FROM servico`, (error, results) => {
                        if (error) {
                            console.error("Erro ao buscar servico:", error)
                            reject(error)
                        } else {
                            resolve(results)
                        }
                    })
                }
            })
        })
    }

    async cadastrarServico(dbName: string, nome: string, descricao:string, valor:number): Promise<boolean>{
        return new Promise((resolve, reject) => {
            this.connection.query(`Use ${dbName};`, (useError, useResults) => {
                if (useError) {
                    console.error("Erro ao selecionar database")
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso")
                    this.connection.query(`INSERT INTO servico (nome, descricao, valor) VALUES(?, ?, ?)`, [nome, descricao, valor], (error, results) => {
                        if (error) {
                            console.log("Erro ao cadastrar serviço")
                            reject(error)
                        } else {
                            console.log("Serviço cadastrado com sucesso")
                            resolve(true)
                        }
                    })
                }

            })
        })
    }

}