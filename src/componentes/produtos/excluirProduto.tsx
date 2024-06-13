import React, { Component } from "react";

type Props = {
    tema: string;
    excluirProduto: (nomeProduto: string) => void;
    produtos: Produto[];
};

type Produto = {
    nome: string;
    descricao: string;
    valor: number;
};

type State = {
    produtoSelecionado: string;
};

export default class ExcluirProduto extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            produtoSelecionado: "",
        };
    }

    handleProdutoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const nomeProduto = event.target.value;
        this.setState({
            produtoSelecionado: nomeProduto,
        });
    };

    handleExcluirProduto = () => {
        const { produtoSelecionado } = this.state;
        if (!produtoSelecionado) {
            alert("Selecione um produto para excluir.");
            return;
        }
        const confirmacao = window.confirm(`Tem certeza que deseja excluir o produto "${produtoSelecionado}"?`);
        if (confirmacao) {
            this.props.excluirProduto(produtoSelecionado);
            alert("Produto excluído com sucesso!");
            // Limpar o campo após a exclusão
            this.setState({
                produtoSelecionado: "",
            });
        }
    };

    render() {
        const { tema, produtos } = this.props;
        const { produtoSelecionado } = this.state;

        return (
            <div className="container-fluid">
                <form onSubmit={(event) => event.preventDefault()}>
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
                        <div className="input-group mb-3">
                            <p>Tem certeza que deseja excluir o produto "{produtoSelecionado}"?</p>
                            <button className="btn btn-outline-danger" type="button" onClick={this.handleExcluirProduto} style={{ background: tema }}>
                                Excluir Produto
                            </button>
                        </div>
                    )}
                </form>
            </div>
        );
    }
}
