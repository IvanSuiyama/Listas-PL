import React, { Component } from "react";
import InputMask from "react-input-mask";

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
    cpfNovo: string;
    erroCpfNaoCadastrado: boolean;
    erroAoAlterarCliente: boolean;
};

export default class AlterarCliente extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            cpf: "",
            cpfValido: false,
            nome: "",
            nomeSocial: "",
            dataEmissao: "",
            cpfNovo: "",
            erroCpfNaoCadastrado: false,
            erroAoAlterarCliente: false
        };
    }

    handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ cpf: event.target.value });
    };

    handleCpfNovoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ cpfNovo: event.target.value });
    };

    validarCpf = async () => {
        const { cpf } = this.state;
        const { clientes } = this.props;

        const cleanedCpf = cpf.replace(/\D/g, '');

        try {
            const response = await fetch(`http://localhost:5000/buscarClientePorCpf?cpf=${cleanedCpf}`);
            
            if (response.ok) {
                const data = await response.json();
                
                if (data) {
                    this.setState({
                        nome: data.nome,
                        nomeSocial: data.nomeSocial,
                        dataEmissao: data.dataEmissao,
                        cpfNovo: data.cpf,
                        erroCpfNaoCadastrado: false,
                        cpfValido: true // Define como válido após encontrar cliente
                    });
                } else {
                    this.setState({
                        erroCpfNaoCadastrado: true,
                        cpfValido: false // Define como inválido se não encontrar cliente
                    });
                }
            } else {
                console.error(`Erro ao validar CPF: ${response.statusText}`);
                alert("Erro ao validar CPF");
            }
        } catch (error) {
            console.error("Erro ao validar CPF", error);
            alert("Erro ao validar CPF");
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
    
        // Converter para unknown primeiro
        const unknownValue: unknown = { [name]: value };
    
        // Converter para Pick<State, keyof State>
        const typedValue = unknownValue as Pick<State, keyof State>;
    
        this.setState(typedValue);
    };
    

    handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { nome, nomeSocial, dataEmissao, cpf, cpfNovo } = this.state;

        const cleanedCpf = cpf.replace(/\D/g, '');
        const cleanedCpfNovo = cpfNovo.replace(/\D/g, '');

        try {
            const response = await fetch("http://localhost:5000/alterarClienes", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nome, nomeSocial, dataEmissao, cpf: cleanedCpf, cpfNovo: cleanedCpfNovo })
            });

            if (response.ok) {
                const clienteAtualizado: Cliente = { nome, nomeSocial, dataEmissao, cpf: cleanedCpfNovo };
                this.props.alterarCliente(clienteAtualizado);
                alert("Cliente alterado com sucesso!");
                this.setState({
                    cpf: "",
                    cpfValido: false,
                    nome: "",
                    nomeSocial: "",
                    dataEmissao: "",
                    cpfNovo: "",
                    erroCpfNaoCadastrado: false,
                    erroAoAlterarCliente: false // Resetar estado de erro ao alterar cliente
                });
            } else {
                const errorText = await response.text();
                console.error(`Erro ao alterar cliente: ${errorText}`);
                this.setState({ erroAoAlterarCliente: true });
                alert(`Erro ao alterar cliente: ${errorText}`);
            }
        } catch (error) {
            console.error("Erro ao enviar solicitação para alterar cliente", error);
            this.setState({ erroAoAlterarCliente: true });
            alert("Erro ao alterar cliente");
        }
    };

    render() {
        const { tema } = this.props;
        const { cpf, cpfValido, nome, nomeSocial, dataEmissao, cpfNovo, erroCpfNaoCadastrado, erroAoAlterarCliente } = this.state;

        return (
            <div className="container-fluid">
                {!cpfValido ? (
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
                        <button className="btn btn-outline-secondary" type="button" onClick={this.validarCpf} style={{ background: tema }}>
                            Validar CPF
                        </button>
                    </div>
                ) : (
                    <form onSubmit={this.handleSubmit}>
                        {erroCpfNaoCadastrado && (
                            <div className="alert alert-danger" role="alert">
                                Cliente não cadastrado.
                            </div>
                        )}
                        {erroAoAlterarCliente && (
                            <div className="alert alert-danger" role="alert">
                                Erro ao alterar cliente.
                            </div>
                        )}
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
                            <label htmlFor="cpfNovo">Novo CPF</label>
                            <InputMask
                                mask="999.999.999-99"
                                className="form-control"
                                placeholder="Novo CPF"
                                aria-label="Novo CPF"
                                aria-describedby="basic-addon1"
                                name="cpfNovo"
                                value={cpfNovo}
                                onChange={this.handleCpfNovoChange}
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
