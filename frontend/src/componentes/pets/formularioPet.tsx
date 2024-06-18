import React, { Component } from "react";

type Props = {
    tema: string;
    adicionarPet: (pet: Pet) => void;
    clientes: Array<{ cpf: string }>;
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
    raca: string;
    genero: string;
    tipo: string;
};

export default class FormularioCadastroPet extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            cpf: "",
            cpfValido: false,
            nomePet: "",
            raca: "",
            genero: "",
            tipo: ""
        };
    }

    handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ cpf: event.target.value });
    };

    validarCpf = () => {
        const { cpf } = this.state;
        const { clientes } = this.props;

        const cpfValido = this.isValidCpf(cpf) && clientes.some(cliente => cliente.cpf === cpf);
        this.setState({ cpfValido });
    };

    isValidCpf = (cpf: string): boolean => {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

        let sum = 0, remainder;
        for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        return remainder === parseInt(cpf.substring(10, 11));
    };

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState({ [name]: value } as unknown as Pick<State, keyof State>);
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert("Pet cadastrado com sucesso")
        const { nomePet, raca, genero, tipo, cpf } = this.state;

        const novoPet: Pet = { nomePet, raca, genero, tipo, donoCpf: cpf };
        this.props.adicionarPet(novoPet);

        this.setState({
            nomePet: "",
            raca: "",
            genero: "",
            tipo: "",
            cpfValido: false,
            cpf: ""
        });
    };

    render() {
        const { tema } = this.props;
        const { cpf, cpfValido, nomePet, raca, genero, tipo } = this.state;

        return (
            <div className="container-fluid">
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
                            <label htmlFor="nomePet">Nome do Pet</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="NomePet"
                                aria-label="NomePet"
                                aria-describedby="basic-addon1"
                                name="nomePet"
                                value={nomePet}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <label htmlFor="raca">Raça</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Raca"
                                aria-label="Raca"
                                aria-describedby="basic-addon1"
                                name="raca"
                                value={raca}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <label htmlFor="genero">Genero do seu pet</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Genero"
                                aria-label="Genero"
                                aria-describedby="basic-addon1"
                                name="genero"
                                value={genero}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <label htmlFor="tipo">Tipo do seu pet</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="tipo"
                                aria-label="tipo"
                                aria-describedby="basic-addon1"
                                name="tipo"
                                value={tipo}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <button className="btn btn-outline-secondary" type="submit" style={{ background: tema }}>Cadastrar pet</button>
                        </div>
                    </form>
                )}
            </div>
        );
    }
}
