import React, { Component, RefObject } from "react";
import InputMask from "react-input-mask";

type Props = {
    tema: string;
    adicionarCliente: (novoCliente: { nome: string; nomeSocial: string; cpf: string; dataEmissao: string }) => void;
};

type State = {
    nome: string;
    nomeSocial: string;
    cpf: string;
    dataEmissao: string;
};

export default class FormularioCadastroCliente extends Component<Props, State> {
    cpfInputRef: RefObject<HTMLInputElement>; // Corrigido para RefObject<HTMLInputElement>

    constructor(props: Props) {
        super(props);
        this.state = {
            nome: "",
            nomeSocial: "",
            cpf: "",
            dataEmissao: "",
        };

        this.cpfInputRef = React.createRef(); // Criando a ref como RefObject<HTMLInputElement>
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
            [name as string]: value // Corrigindo o type assertion para string
        }));
    };

    handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { nome, nomeSocial, cpf, dataEmissao } = this.state;

        const cleanedCpf = cpf.replace(/\D/g, '');

        if (!this.isValidCpf(cleanedCpf)) {
            alert("CPF inválido!");
            return; // Evita continuar o processo de cadastro se o CPF for inválido
        }

        const novoCliente = { nome, nomeSocial, cpf: cleanedCpf, dataEmissao };

        try {
            const response = await fetch('http://localhost:5000/cadastroCliente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoCliente),
            });

            if (response.ok) {
                alert("Cliente cadastrado com sucesso!");
                this.props.adicionarCliente(novoCliente); // Chamando a função adicionarCliente passada por props
                this.setState({
                    nome: "",
                    nomeSocial: "",
                    cpf: "",
                    dataEmissao: ""
                });
            } else {
                const errorData = await response.json();
                if (errorData.error === "CPF já cadastrado") {
                    alert("CPF já cadastrado");
                    return; // Stop further processing if CPF is already registered
                }
                alert(errorData.error || "Erro ao cadastrar cliente");
            }
        } catch (error) {
            if (error instanceof Error) {
                alert("Erro ao cadastrar cliente: " + error.message);
            } else {
                alert("Erro desconhecido ao cadastrar cliente");
            }
        }
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
                        <InputMask
                            mask="999.999.999-99"
                            className="form-control"
                            placeholder="CPF"
                            aria-label="CPF"
                            aria-describedby="basic-addon1"
                            name="cpf"
                            value={cpf}
                            onChange={this.handleInputChange}
                            inputRef={this.cpfInputRef} // Passando a ref correta
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
