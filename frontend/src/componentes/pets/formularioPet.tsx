import React, { Component } from "react";
import axios from "axios";
import InputMask from "react-input-mask";

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
    nomePet: string;
    raca: string;
    genero: string;
    tipo: string;
    errorMessage: string;
};

export default class FormularioCadastroPet extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            cpf: "",
            nomePet: "",
            raca: "",
            genero: "",
            tipo: "",
            errorMessage: ""
        };
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState({ [name]: value } as unknown as State);
    };

    handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { nomePet, raca, genero, tipo, cpf } = this.state;

        const cleanedCpf = cpf.replace(/\D/g, '');

        try {
            const response = await axios.post("http://localhost:5000/cadastrarPet", {
                nomePet,
                raca,
                genero,
                tipo,
                cpf: cleanedCpf
            });

            if (response.status === 200) {
                alert("Pet cadastrado com sucesso");
                const novoPet: Pet = { nomePet, raca, genero, tipo, donoCpf: cleanedCpf };
                this.props.adicionarPet(novoPet);

                this.setState({
                    nomePet: "",
                    raca: "",
                    genero: "",
                    tipo: "",
                    cpf: "",
                    errorMessage: ""
                });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 404) {
                    alert("Cliente não cadastrado");
                } else {
                    console.error("Erro ao cadastrar pet", error);
                    this.setState({ errorMessage: "Erro ao cadastrar pet" });
                }
            } else {
                console.error("Erro desconhecido", error);
                this.setState({ errorMessage: "Erro desconhecido ao cadastrar pet" });
            }
        }
    };

    render() {
        const { tema } = this.props;
        const { cpf, nomePet, raca, genero, tipo, errorMessage } = this.state;

        return (
            <div className="container-fluid">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group mb-3">
                        <label htmlFor="cpf">CPF do Dono</label>
                        <InputMask
                            mask="999.999.999-99"
                            className="form-control"
                            placeholder="CPF"
                            aria-label="CPF"
                            aria-describedby="basic-addon1"
                            name="cpf"
                            value={cpf}
                            onChange={this.handleInputChange}
                        />
                    </div>
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
                        <label htmlFor="genero">Gênero do seu pet</label>
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
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <div className="input-group mb-3">
                        <button
                            className="btn btn-outline-secondary"
                            type="submit"
                            style={{ background: tema }}
                        >
                            Cadastrar pet
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
