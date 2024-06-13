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
        this.setState(prevState => ({
            ...prevState,
            [name]: value
        } as Pick<State, keyof State>));
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { nome, nomeSocial, cpf, dataEmissao } = this.state;
    
    if (!this.isValidCpf(cpf)) {
        alert("CPF inválido!");
        return; // Evita continuar o processo de cadastro se o CPF for inválido
    }

    alert("Cliente cadastrado com sucesso!");
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
