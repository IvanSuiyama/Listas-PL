import React, { Component } from "react";
import axios from 'axios';

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

    handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { nome, descricao, valor } = this.state;

        // Validar se o valor é numérico
        const valorNum = parseFloat(valor.replace(',', '.')); // Substituir vírgulas por pontos
        if (isNaN(valorNum)) {
            alert("Valor do serviço inválido!");
            return;
        }

        const novoServico: Servico = { nome, descricao, valor: valorNum };

        try {
            const response = await axios.post('http://localhost:5000/cadastroServico', {
                nome,
                descricao,
                valor: valorNum
            });
            console.log(response.data);
            alert("Serviço cadastrado com sucesso!");
            this.props.adicionarServico(novoServico);
            // Limpar os campos após a submissão
            this.setState({
                nome: "",
                descricao: "",
                valor: "",
            });
        } catch (error) {
            console.error("Erro ao cadastrar serviço", error);
            alert("Erro ao cadastrar serviço");
        }
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
                            type="text" // Alterado para text
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
