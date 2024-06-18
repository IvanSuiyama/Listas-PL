import React, { Component } from "react";

type Props = {
    tema: string;
    alterarCliente: (clienteAtualizado: Cliente) => void;
    clientes: Array<Cliente>;
};

type Cliente = {
    nome: string;
    nomeSocial: string;
    cpf: string;
    dataEmissao: string;
};

type State = {
    cpf: string;
    cpfValido: boolean;
    nome: string;
    nomeSocial: string;
    dataEmissao: string;
};

export default class AlterarCliente extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            cpf: "",
            cpfValido: false,
            nome: "",
            nomeSocial: "",
            dataEmissao: ""
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

        if (cpfValido) {
            // Encontrou cliente com CPF válido, preencher os campos com os dados do cliente
            const cliente = clientes.find(cliente => cliente.cpf === cpf);
            if (cliente) {
                this.setState({
                    nome: cliente.nome,
                    nomeSocial: cliente.nomeSocial,
                    dataEmissao: cliente.dataEmissao
                });
            }
        } else {
            // Limpar os campos se o CPF não for válido
            this.setState({
                nome: "",
                nomeSocial: "",
                dataEmissao: ""
            });
        }
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
        const { nome, nomeSocial, dataEmissao, cpf } = this.state;
        const clienteAtualizado: Cliente = { nome, nomeSocial, dataEmissao, cpf };
        this.props.alterarCliente(clienteAtualizado);
        alert("Cliente alterado com sucesso!");
        // Limpar os campos após a submissão
        this.setState({
            cpf: "",
            cpfValido: false,
            nome: "",
            nomeSocial: "",
            dataEmissao: ""
        });
    };

    render() {
        const { tema } = this.props;
        const { cpf, cpfValido, nome, nomeSocial, dataEmissao } = this.state;

        return (
            <div className="container-fluid">
                {!cpfValido ? (
                    <div className="input-group mb-3">
                        <label htmlFor="cpf">CPF do Cliente</label>
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
                                placeholder="Nome Social"
                                aria-label="Nome Social"
                                aria-describedby="basic-addon1"
                                name="nomeSocial"
                                value={nomeSocial}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <label htmlFor="dataEmissao">Data de Emissão</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Data de Emissão"
                                aria-label="Data de Emissão"
                                aria-describedby="basic-addon1"
                                name="dataEmissao"
                                value={dataEmissao}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <button className="btn btn-outline-secondary" type="submit" style={{ background: tema }}>Alterar Cliente</button>
                        </div>
                    </form>
                )}
            </div>
        );
    }
}
