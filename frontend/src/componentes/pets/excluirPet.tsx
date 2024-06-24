import React, { Component } from "react";
import axios from "axios";

type Props = {
    tema: string;
    excluirPet: (nomePet: string, cpf: string) => void;
    clientes: Array<{ cpf: string; nome: string }>; // Adicionei o nome do cliente para exibição na confirmação
    pets: Pet[];
};

type Pet = {
    nomePet: string;
    raca: string;
    genero: string;
    tipo: string;
    donoCpf: string;
};

type State = {
    nomePet: string;
    cpf: string;
    cpfValido: boolean;
    petEncontrado: boolean;
    nomeDono: string; // Adicionado para armazenar o nome do dono
};

export default class ExcluirPet extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nomePet: "",
            cpf: "",
            cpfValido: false,
            petEncontrado: false,
            nomeDono: "" // Inicialização do novo campo
        };
    }

    handleNomePetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ nomePet: event.target.value });
    };

    handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ cpf: event.target.value });
    };

    validarCpf = async () => {
        const { cpf } = this.state;

        try {
            const response = await axios.get(`/buscarPetPorCpf?cpf=${cpf}`);
            const cliente = response.data;
            const cpfValido = !!cliente;
            this.setState({ cpfValido, nomeDono: cliente ? cliente.nome : "" });

            if (!cpfValido) {
                alert("CPF não encontrado!");
                this.setState({
                    nomePet: "",
                    petEncontrado: false,
                    nomeDono: ""
                });
            }
        } catch (error) {
            console.error("Erro ao buscar CPF", error);
            alert("Erro ao buscar CPF");
            this.setState({
                nomePet: "",
                petEncontrado: false,
                nomeDono: ""
            });
        }
    };

    buscarPet = async () => {
        const { nomePet } = this.state;

        try {
            const response = await axios.get(`/buscarPetPorNome?nome=${nomePet}`);
            const pet = response.data;
            if (pet) {
                this.setState({ petEncontrado: true });
            } else {
                alert("Pet não encontrado!");
                this.setState({ petEncontrado: false });
            }
        } catch (error) {
            console.error("Erro ao buscar pet", error);
            alert("Erro ao buscar pet");
            this.setState({ petEncontrado: false });
        }
    };

    handleExcluirPet = async () => {
        const { nomePet, cpf, nomeDono } = this.state;
        const confirmacao = window.confirm(`Tem certeza que deseja excluir o pet "${nomePet}" do dono "${nomeDono}"?`);

        if (confirmacao) {
            try {
                await axios.post('/excluirPet', { cpf, nomePet });
                alert("Pet excluído com sucesso!");
                this.setState({
                    nomePet: "",
                    cpf: "",
                    cpfValido: false,
                    petEncontrado: false,
                    nomeDono: ""
                });
            } catch (error) {
                console.error("Erro ao excluir pet", error);
                alert("Erro ao excluir pet");
            }
        }
    };

    render() {
        const { tema } = this.props;
        const { nomePet, cpf, cpfValido, petEncontrado } = this.state;

        return (
            <div className="container-fluid">
                {!petEncontrado ? (
                    <div className="input-group mb-3">
                        <label htmlFor="nomePet">Nome do Pet</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome do Pet"
                            aria-label="Nome do Pet"
                            aria-describedby="basic-addon1"
                            name="nomePet"
                            value={nomePet}
                            onChange={this.handleNomePetChange}
                        />
                        <button className="btn btn-outline-secondary" type="button" onClick={this.buscarPet} style={{ background: tema }}>
                            Buscar Pet
                        </button>
                    </div>
                ) : (
                    <>
                        {!cpfValido ? (
                            <div className="input-group mb-3">
                                <label htmlFor="cpf">CPF do Dono</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="CPF"
                                    aria-label="CPF"
                                    aria-describedby="basic-addon1"
                                    name="cpf"
                                    value={cpf}
                                    onChange={this.handleCpfChange}
                                />
                                <button className="btn btn-outline-secondary" type="button" onClick={this.validarCpf} style={{ background: tema }}>
                                    Validar CPF
                                </button>
                            </div>
                        ) : (
                            <div className="input-group mb-3">
                                <p>Tem certeza que deseja excluir o pet "{nomePet}" do dono "{this.state.nomeDono}"?</p>
                                <div className="mb-3"></div>
                                <button className="btn btn-outline-danger" type="button" onClick={this.handleExcluirPet} style={{ background: tema }}>
                                    Excluir Pet
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        );
    }
}
