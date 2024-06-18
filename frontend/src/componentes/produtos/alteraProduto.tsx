import React, { Component } from "react";

type Props = {
    tema: string;
    alterarProduto: (produtoAtualizado: Produto) => void;
    produtos: Produto[];
};

type Produto = {
    nome: string;
    descricao: string;
    valor: number;
};

type State = {
    nome: string;
    descricao: string;
    valor: string;
    produtoSelecionado: string;
};

export default class AlterarProduto extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: "",
            descricao: "",
            valor: "",
            produtoSelecionado: "",
        };
    }

    handleProdutoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const nomeProduto = event.target.value;
        const produtoSelecionado = this.props.produtos.find((produto) => produto.nome === nomeProduto);
        if (produtoSelecionado) {
            this.setState({
                nome: produtoSelecionado.nome,
                descricao: produtoSelecionado.descricao,
                valor: produtoSelecionado.valor.toString(),
                produtoSelecionado: nomeProduto,
            });
        }
    };

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        this.setState({ [name]: value } as Pick<State, keyof State>);
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { nome, descricao, valor, produtoSelecionado } = this.state;
        const valorNum = parseFloat(valor);
        if (isNaN(valorNum)) {
            alert("Valor do produto inválido!");
            return;
        }
        const produtoAtualizado: Produto = { nome, descricao, valor: valorNum };
        this.props.alterarProduto(produtoAtualizado);
        alert("Produto alterado com sucesso!");
        // Limpar os campos após a submissão
        this.setState({
            nome: "",
            descricao: "",
            valor: "",
            produtoSelecionado: "",
        });
    };

    render() {
        const { tema, produtos } = this.props;
        const { nome, descricao, valor, produtoSelecionado } = this.state;

        return (
            <div className="container-fluid">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group mb-3">
                        <label htmlFor="produtoSelecionado">Selecione o Produto</label>
                        <select
                            className="form-select"
                            aria-label="Selecione o Produto"
                            name="produtoSelecionado"
                            value={produtoSelecionado}
                            onChange={this.handleProdutoChange}
                        >
                            <option value="">Selecione um Produto</option>
                            {produtos.map((produto) => (
                                <option key={produto.nome} value={produto.nome}>
                                    {produto.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    {produtoSelecionado && (
                        <>
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
                                <label htmlFor="valor">Valor</label>
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
                                <button className="btn btn-outline-secondary" type="submit" style={{ background: tema }}>
                                    Alterar Produto
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        );
    }
}
