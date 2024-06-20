import React, { Component } from "react";
import axios from 'axios';

type Props = {
    tema: string;
    adicionarProduto: (novoProduto: { nome: string; descricao: string; valor: number }) => void;
};

type State = {
    nome: string;
    descricao: string;
    valor: string;
};

export default class FormularioCadastroProduto extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: "",
            descricao: "",
            valor: "",
        };
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        // Substituir vírgulas por pontos no campo de valor
        if (name === 'valor') {
            const valorFormatado = value.replace(',', '.');
            this.setState({
                ...this.state,
                [name]: valorFormatado
            });
        } else {
            this.setState({
                ...this.state,
                [name]: value
            });
        }
    };

    handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { nome, descricao, valor } = this.state;

        // Validar se o valor é numérico
        if (!this.isNumeric(valor)) {
            alert("Por favor, insira um valor numérico válido.");
            return;
        }

        // Formatar o valor para garantir que seja um número válido (substituir vírgulas por pontos)
        const valorFormatado = parseFloat(valor.replace(',', '.'));

        try {
            const response = await axios.post('http://localhost:5000/cadastroProduto', {
                nome,
                descricao,
                valor: valorFormatado
            });
            console.log(response.data);
            alert("Produto cadastrado com sucesso!");
            this.props.adicionarProduto({ nome, descricao, valor: valorFormatado });
            this.setState({
                nome: "",
                descricao: "",
                valor: ""
            });
        } catch (error) {
            console.error("Erro ao cadastrar produto", error);
            alert("Erro ao cadastrar produto");
        }
    };

    isNumeric = (value: string) => {
        return /^\d+(\.\d+)?$/.test(value.replace(',', '.'));
    };

    render() {
        const { tema } = this.props;
        const { nome, descricao, valor } = this.state;

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
                        <label htmlFor="descricao">Descrição</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Descrição"
                            aria-label="Descrição"
                            aria-describedby="basic-addon1"
                            name="descricao"
                            value={descricao}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <label htmlFor="valor">Valor</label>
                        <input
                            type="text" // Alterado para text
                            className="form-control"
                            placeholder="Valor"
                            aria-label="Valor"
                            aria-describedby="basic-addon1"
                            name="valor"
                            value={valor}
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
