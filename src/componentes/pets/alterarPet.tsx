import React, { Component } from "react";

type Props = {
    tema: string;
    alterarPet: (petAtualizado: Pet) => void;
    clientes: Array<{ cpf: string }>;
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
    cpf: string;
    cpfValido: boolean;
    nomePet: string;
    petEncontrado: boolean;
    petAtual: Pet | null;
    novoNomePet: string;
    novaRaca: string;
    novoGenero: string;
    novoTipo: string;
};

export default class AlterarPet extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            cpf: "",
            cpfValido: false,
            nomePet: "",
            petEncontrado: false,
            petAtual: null,
            novoNomePet: "",
            novaRaca: "",
            novoGenero: "",
            novoTipo: ""
        };
    }

    handleNomePetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ nomePet: event.target.value });
    };

    buscarPet = () => {
        const { nomePet } = this.state;
        const { pets } = this.props;

        const petAtual = pets.find(pet => pet.nomePet === nomePet);
        if (petAtual) {
            this.setState({
                petEncontrado: true,
                petAtual,
                novoNomePet: petAtual.nomePet,
                novaRaca: petAtual.raca,
                novoGenero: petAtual.genero,
                novoTipo: petAtual.tipo
            });
        } else {
            alert("Pet não encontrado!");
            // Limpar os campos relacionados ao pet
            this.setState({
                petEncontrado: false,
                petAtual: null,
                novoNomePet: "",
                novaRaca: "",
                novoGenero: "",
                novoTipo: ""
            });
        }
    };

    handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ cpf: event.target.value });
    };

    validarCpf = () => {
        const { cpf } = this.state;
        const { clientes } = this.props;

        const cpfValido = clientes.some(cliente => cliente.cpf === cpf);
        this.setState({ cpfValido });
        if (!cpfValido) {
            alert("CPF não encontrado!");
            // Limpar os campos relacionados ao pet
            this.setState({
                nomePet: "",
                petEncontrado: false,
                petAtual: null,
                novoNomePet: "",
                novaRaca: "",
                novoGenero: "",
                novoTipo: ""
            });
        }
    };

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState({ [name]: value } as unknown as Pick<State, keyof State>);
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { novoNomePet, novaRaca, novoGenero, novoTipo, petAtual } = this.state;

        if (petAtual) {
            const petAtualizado: Pet = { ...petAtual, nomePet: novoNomePet, raca: novaRaca, genero: novoGenero, tipo: novoTipo };
            this.props.alterarPet(petAtualizado);
            alert("Pet alterado com sucesso!");
            // Limpar os campos após a submissão
            this.setState({
                nomePet: "",
                petEncontrado: false,
                petAtual: null,
                novoNomePet: "",
                novaRaca: "",
                novoGenero: "",
                novoTipo: ""
            });
        }
    };

    render() {
        const { tema } = this.props;
        const { nomePet, petEncontrado, novoNomePet, novaRaca, novoGenero, novoTipo, cpf, cpfValido } = this.state;

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
                            <form onSubmit={this.handleSubmit}>
                                <div className="input-group mb-3">
                                    <label htmlFor="novoNomePet">Novo Nome do Pet</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Novo Nome do Pet"
                                        aria-label="Novo Nome do Pet"
                                        aria-describedby="basic-addon1"
                                        name="novoNomePet"
                                        value={novoNomePet}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <label htmlFor="novaRaca">Nova Raça</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nova Raça"
                                        aria-label="Nova Raça"
                                        aria-describedby="basic-addon1"
                                        name="novaRaca"
                                        value={novaRaca}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <label htmlFor="novoGenero">Novo Gênero do Pet</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Novo Gênero do Pet"
                                        aria-label="Novo Gênero do Pet"
                                        aria-describedby="basic-addon1"
                                        name="novoGenero"
                                        value={novoGenero}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <label htmlFor="novoTipo">Novo Tipo do Pet</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Novo Tipo do Pet"
                                        aria-label="Novo Tipo do Pet"
                                        aria-describedby="basic-addon1"
                                        name="novoTipo"
                                        value={novoTipo}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <button className="btn btn-outline-secondary" type="submit" style={{ background: tema }}>Alterar pet</button>
                                </div>
                            </form>
                        )}
                    </>
                )}
            </div>
        );
    }
}
