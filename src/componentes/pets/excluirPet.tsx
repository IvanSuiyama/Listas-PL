import React, { Component } from "react";

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

    validarCpf = () => {
        const { cpf } = this.state;
        const { clientes } = this.props;

        const cliente = clientes.find(cliente => cliente.cpf === cpf);
        const cpfValido = !!cliente;
        this.setState({ cpfValido, nomeDono: cliente ? cliente.nome : "" });
        if (!cpfValido) {
            alert("CPF não encontrado!");
            // Limpar os campos relacionados ao pet
            this.setState({
                nomePet: "",
                petEncontrado: false,
                nomeDono: ""
            });
        }
    };

    buscarPet = () => {
        const { nomePet } = this.state;
        const { pets } = this.props;

        const petEncontrado = pets.some(pet => pet.nomePet === nomePet);
        if (petEncontrado) {
            this.setState({ petEncontrado: true });
        } else {
            alert("Pet não encontrado!");
            // Limpar os campos relacionados ao pet
            this.setState({
                petEncontrado: false
            });
        }
    };

    handleExcluirPet = () => {
        const { nomePet, cpf, nomeDono } = this.state;
        const confirmacao = window.confirm(`Tem certeza que deseja excluir o pet "${nomePet}" do dono "${nomeDono}"?`);
        if (confirmacao) {
            this.props.excluirPet(nomePet, cpf);
            alert("Pet excluído com sucesso!");
            // Limpar os campos após a exclusão
            this.setState({
                nomePet: "",
                cpf: "",
                cpfValido: false,
                petEncontrado: false,
                nomeDono: ""
            });
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
