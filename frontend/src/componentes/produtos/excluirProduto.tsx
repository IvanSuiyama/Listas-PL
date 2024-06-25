import React, { Component, FormEvent, ChangeEvent } from "react";

type Props = {
    tema: string;
    excluirProduto: (id_produto: number) => void;
};

type Produto = {
    id_prod: number;
    nome: string;
    descricao: string;
    valor: number;
};

type State = {
    produtoSelecionado: string;
    produtos: Produto[];
    erroAoExcluirProduto: boolean;
};

export default class ExcluirProduto extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            produtoSelecionado: "",
            produtos: [],
            erroAoExcluirProduto: false,
        };
    }

    componentDidMount() {
        this.fetchProdutos();
    }

    fetchProdutos = async () => {
        try {
            const response = await fetch("http://localhost:5000/produtos");
            const produtos = await response.json();
            console.log("Produtos recebidos do backend:", produtos);
            this.setState({ produtos });
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    handleProdutoChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const produtoId = event.target.value;
        console.log("Produto selecionado ID:", produtoId);
        this.setState({
            produtoSelecionado: produtoId,
            erroAoExcluirProduto: false, // Resetando o estado de erro ao selecionar novo produto
        });
    };

    handleExcluirProduto = async () => {
        const { produtoSelecionado } = this.state;
        if (!produtoSelecionado) {
            alert("Selecione um produto para excluir.");
            return;
        }

        const confirmacao = window.confirm(`Tem certeza que deseja excluir o produto com ID "${produtoSelecionado}"?`);
        if (confirmacao) {
            try {
                const response = await fetch("http://localhost:5000/excluirProduto", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id_prod: parseInt(produtoSelecionado, 10) }),
                });

                if (response.ok) {
                    alert("Produto excluído com sucesso!");
                    this.setState({
                        produtoSelecionado: "",
                    });
                    this.fetchProdutos(); // Atualizar a lista de produtos
                } else {
                    console.error("Erro ao excluir produto:", response.statusText);
                    this.setState({ erroAoExcluirProduto: true });
                }
            } catch (error) {
                console.error("Erro ao enviar solicitação para excluir produto", error);
                this.setState({ erroAoExcluirProduto: true });
            }
        }
    };

    render() {
        const { tema } = this.props;
        const { produtoSelecionado, produtos, erroAoExcluirProduto } = this.state;

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
                                <option key={produto.id_prod} value={produto.id_prod.toString()}>
                                    {produto.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    {produtoSelecionado && (
                        <div className="input-group mb-3">
                            <p>Tem certeza que deseja excluir o produto "{produtos.find(prod => prod.id_prod.toString() === produtoSelecionado)?.nome}"?</p>
                            <button className="btn btn-outline-danger" type="button" onClick={this.handleExcluirProduto} style={{ background: tema }}>
                                Excluir Produto
                            </button>
                        </div>
                    )}
                    {erroAoExcluirProduto && (
                        <div className="alert alert-danger" role="alert">
                            Ocorreu um erro ao excluir o produto. Por favor, tente novamente.
                        </div>
                    )}
                </form>
            </div>
        );
    }
}
