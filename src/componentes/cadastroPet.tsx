import React, { Component, ChangeEvent, FormEvent } from "react";

type Cliente = {
    nome: string;
    cpf: string;
};

type Props = {
    tema: string;
    clientes: Cliente[];
    adicionarPet: (pet: Pet, cpfCliente: string) => void;
};

type State = {
    cpfCliente: string;
    nome: string;
    raca: string;
    genero: string;
    tipo: string;
};

type Pet = {
    nome: string;
    raca: string;
    genero: string;
    tipo: string;
};

export default class CadastroPet extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            cpfCliente: '',
            nome: '',
            raca: '',
            genero: '',
            tipo: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        this.setState({ [name]: value } as Pick<State, keyof State>);
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { nome, raca, genero, tipo, cpfCliente } = this.state;
        const { clientes } = this.props;

        // Verifica se o CPF do cliente está na lista de clientes
        const cliente = clientes.find(cliente => cliente.cpf === cpfCliente);
        if (!cliente) {
            alert("CPF do cliente não encontrado na lista de clientes.");
            return;
        }

        const novoPet: Pet = { nome, raca, genero, tipo };
        this.props.adicionarPet(novoPet, cpfCliente);
        this.setState({
            nome: '',
            raca: '',
            genero: '',
            tipo: ''
        });
    }

    render() {
        const { tema } = this.props;
        const { cpfCliente, nome, raca, genero, tipo } = this.state;

        return (
            <div className="container-fluid">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="CPF do Cliente"
                            aria-label="CPF do Cliente"
                            name="cpfCliente"
                            value={cpfCliente}
                            onChange={this.handleChange}
                        />
                    </div>
                    {cpfCliente && cpfCliente !== '' ? (
                        <>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nome do Pet"
                                    aria-label="Nome do Pet"
                                    name="nome"
                                    value={nome}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Raça"
                                    aria-label="Raça"
                                    name="raca"
                                    value={raca}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Gênero"
                                    aria-label="Gênero"
                                    name="genero"
                                    value={genero}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tipo"
                                    aria-label="Tipo"
                                    name="tipo"
                                    value={tipo}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <button
                                    className="btn btn-outline-secondary"
                                    type="submit"
                                    style={{ background: tema }}
                                >
                                    Cadastrar Pet
                                </button>
                            </div>
                        </>
                    ) : (
                        <p>Por favor, forneça o CPF do cliente para cadastrar o pet.</p>
                    )}
                </form>
            </div>
        );
    }
}
