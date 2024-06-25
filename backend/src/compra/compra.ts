import { Connection } from "mysql";

export class Compra {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }


    async cadastrarCompra(dbName: string, nomeCliente: string, nomeP:string, nomeS:string, valorP:string, valorS:string): Promise<boolean>{
        return new Promise((resolve, reject) => {
            this.connection.query(`Use ${dbName};`, (useError, useResults) => {
                if (useError) {
                    console.error("Erro ao selecionar database")
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso")
                    this.connection.query(`INSERT INTO compras (nomeCliente, nomeP, nomeS, valorP, valorS) VALUES(?, ?, ?, ?, ?)`, [nomeCliente, nomeP, nomeS, valorP, valorS], (error, results) => {
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

}