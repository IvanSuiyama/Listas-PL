import React, { Component } from "react";

type Props = {
    tema: string;
    adicionarServico: (novoServico: Servico) => void;
};

type State = {
    nome: string;
    descricao: string;
    valor: string;
};

type Servico = {
    nome: string;
    descricao: string;
    valor: number;
};

export default class FormularioCadastroServico extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: "",
            descricao: "",
            valor: "",
        };
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        this.setState({ [name]: value } as Pick<State, keyof State>);
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { nome, descricao, valor } = this.state;
        const valorNum = parseFloat(valor);
        if (isNaN(valorNum)) {
            alert("Valor do serviço inválido!");
            return;
        }
        const novoServico: Servico = { nome, descricao, valor: valorNum };
        this.props.adicionarServico(novoServico);
        alert("Serviço cadastrado com sucesso!");
        // Limpar os campos após a submissão
        this.setState({
            nome: "",
            descricao: "",
            valor: "",
        });
    };

    render() {
        const { tema } = this.props;
        const { nome, descricao, valor } = this.state;

        return (
            <div className="container-fluid">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group mb-3">
                        <label htmlFor="nome">Nome do Serviço</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome"
                            aria-label="Nome"
                            name="nome"
                            value={nome}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <label htmlFor="descricao">Descrição do Serviço</label>
                        <textarea
                            className="form-control"
                            placeholder="Descrição"
                            aria-label="Descrição"
                            name="descricao"
                            value={descricao}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <label htmlFor="valor">Valor do Serviço</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Valor"
                            aria-label="Valor"
                            name="valor"
                            value={valor}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <button className="btn btn-outline-primary" type="submit" style={{ background: tema }}>
                            Cadastrar Serviço
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
