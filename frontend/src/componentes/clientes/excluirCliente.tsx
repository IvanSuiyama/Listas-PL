import React, { Component } from "react";
import InputMask from "react-input-mask";
import axios from "axios";

type Props = {
    tema: string;
    excluirCliente(cpf: string): any;
};

type State = {
    cpf: string;
    cpfValido: boolean;
    petsAssociados: boolean | null; // Null para indicar que a verificação ainda não foi feita
};

export default class ExcluirCliente extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            cpf: "",
            cpfValido: false,
            petsAssociados: null,
        };
    }

    handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ cpf: event.target.value });
    };

    validarCpf = async () => {
        const { cpf } = this.state;

        const cpfSemMascara = cpf.replace(/[^\d]/g, ""); // Remover a máscara do CPF

        try {
            // Verificar se o CPF está cadastrado no backend
            const response = await axios.get(`http://localhost:5000/buscarClientePorCpf?cpf=${cpfSemMascara}`);

            if (response.status === 200) {
                this.setState({ cpfValido: true });

                // Verificar se há pets associados
                await this.verificarPetsAssociados(cpfSemMascara);
            } else {
                this.setState({ cpfValido: false, petsAssociados: null });
                alert("CPF não encontrado na base de dados.");
            }
        } catch (error) {
            console.error("Erro ao verificar CPF do cliente", error);
            alert("Erro ao verificar CPF do cliente. Verifique o console para mais detalhes.");
        }
    };

    verificarPetsAssociados = async (cpfSemMascara: string) => {
        try {
            const response = await axios.get(`http://localhost:5000/verificarPetsDoCliente?cpf=${cpfSemMascara}`);

            if (response.status === 200) {
                const pets = response.data;
                const petsAssociados = pets.length > 0;
                this.setState({ petsAssociados });
            } else {
                this.setState({ petsAssociados: null });
                alert("Erro ao verificar pets associados ao cliente.");
            }
        } catch (error) {
            console.error("Erro ao verificar pets associados ao cliente", error);
            alert("Erro ao verificar pets associados ao cliente. Verifique o console para mais detalhes.");
        }
    };

    handleExcluirCliente = async () => {
        const { cpf, petsAssociados } = this.state;
        const { excluirCliente } = this.props;

        const cpfSemMascara = cpf.replace(/[^\d]/g, ""); // Remover a máscara do CPF

        if (petsAssociados === true) {
            alert("Erro ao excluir cliente. Primeiro exclua os pets associados.");
            return;
        }

        try {
            // Proceder com a exclusão do cliente
            const responseExcluir = await axios.post(`http://localhost:5000/excluirCliente`, { cpf: cpfSemMascara });

            if (responseExcluir.status === 200) {
                alert("Cliente excluído com sucesso!");

                // Limpa o estado após a exclusão
                this.setState({
                    cpf: "",
                    cpfValido: false,
                    petsAssociados: null,
                });
            } else {
                alert("Erro ao excluir cliente. Status: " + responseExcluir.status);
            }
        } catch (error) {
            console.error("Erro ao excluir cliente", error);
            alert("Erro ao excluir cliente. Verifique o console para mais detalhes.");
        }
    };

    render() {
        const { tema } = this.props;
        const { cpf, cpfValido, petsAssociados } = this.state;

        return (
            <div className="container-fluid">
                <div className="input-group mb-3">
                    <label htmlFor="cpf">CPF do Cliente</label>
                    <InputMask
                        mask="999.999.999-99"
                        className="form-control"
                        placeholder="CPF"
                        aria-label="CPF"
                        aria-describedby="basic-addon1"
                        name="cpf"
                        value={cpf}
                        onChange={this.handleCpfChange}
                    />
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={this.validarCpf}
                        style={{ background: tema }}
                    >
                        Validar CPF
                    </button>
                </div>
                {cpfValido && petsAssociados !== null && (
                    <div className="input-group mb-3">
                        {petsAssociados ? (
                            <p>
                                Existem pets associados ao cliente. Você precisa excluir os pets antes de excluir o
                                cliente.
                            </p>
                        ) : (
                            <React.Fragment>
                                <p>Tem certeza que deseja excluir o cliente "{cpf}"? </p>
                                <button
                                    className="btn btn-outline-danger"
                                    type="button"
                                    onClick={this.handleExcluirCliente}
                                    style={{ background: tema }}
                                >
                                    Excluir Cliente
                                </button>
                            </React.Fragment>
                        )}
                    </div>
                )}
            </div>
        );
    }
}
