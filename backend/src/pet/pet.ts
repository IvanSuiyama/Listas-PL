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

    async cadastrarPet(dbName: string, nome: string, raca:string, genero:string, tipo:string, donoCpf:string): Promise<boolean>{
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

}

    

    