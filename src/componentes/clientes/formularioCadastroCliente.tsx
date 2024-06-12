import React, { Component } from "react";

type Props = {
    tema: string;
    adicionarCliente: (novoCliente: { nome: string; nomeSocial: string; cpf: string; dataEmissao: string }) => void; // Definindo a propriedade adicionarCliente
};

type State = {
    nome: string;
    nomeSocial: string;
    cpf: string;
    dataEmissao: string;
};

export default class FormularioCadastroCliente extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: "",
            nomeSocial: "",
            cpf: "",
            dataEmissao: "",
        };
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            ...prevState,
            [name]: value
        } as Pick<State, keyof State>));
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert("Cliente cadastrado com sucesso!");
        const { nome, nomeSocial, cpf, dataEmissao } = this.state;
        const novoCliente = { nome, nomeSocial, cpf, dataEmissao };
        this.props.adicionarCliente(novoCliente); // Chamando a função adicionarCliente passada por props
        this.setState({
            nome: "",
            nomeSocial: "",
            cpf: "",
            dataEmissao: ""
        });
    };

    render() {
        const { tema } = this.props;
        const { nome, nomeSocial, cpf, dataEmissao } = this.state;

        return (
            <div className="container-fluid">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group mb-3">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome"
                            aria-label="Nome"
                            aria-describedby="basic-addon1"
                            name="nome"
                            value={nome}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <label htmlFor="nomeSocial">Nome Social</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome social"
                            aria-label="Nome social"
                            aria-describedby="basic-addon1"
                            name="nomeSocial"
                            value={nomeSocial}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <label htmlFor="cpf">CPF</label>
                        <input
                            type="text"
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
                        <label htmlFor="dataEmissao">Data Emissão do CPF</label>
                        <input
                            type="date"
                            className="form-control"
                            placeholder="data"
                            aria-label="data"
                            aria-describedby="basic-addon1"
                            name="dataEmissao"
                            value={dataEmissao}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <button className="btn btn-outline-secondary" type="submit" style={{ background: tema }}>Cadastrar</button>
                    </div>
                </form>
            </div>
        );
    }
}
