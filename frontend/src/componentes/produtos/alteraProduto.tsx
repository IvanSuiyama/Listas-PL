import React, { Component, FormEvent, ChangeEvent } from "react";

type Props = {
    tema: string;
    alterarProduto: (produtoAtualizado: Produto) => void;
};

type Produto = {
    id_prod: number; // Alterado de string para number
    nome: string;
    descricao: string;
    valor: number;
};

type State = {
    nome: string;
    descricao: string;
    valor: string;
    produtoSelecionado: string;
    produtos: Produto[];
};

export default class AlterarProduto extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: "",
            descricao: "",
            valor: "",
            produtoSelecionado: "",
            produtos: [],
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
        const produtoId = parseInt(event.target.value, 10); // Convertendo para número
        console.log("Produto selecionado ID:", produtoId);
        const produtoSelecionado = this.state.produtos.find((produto) => produto.id_prod === produtoId);

        if (produtoSelecionado) {
            console.log("Produto selecionado encontrado:", produtoSelecionado);
            this.setState({
                nome: produtoSelecionado.nome,
                descricao: produtoSelecionado.descricao,
                valor: produtoSelecionado.valor.toString(),
                produtoSelecionado: produtoSelecionado.id_prod.toString(), // Convertendo para string para manter a consistência no estado
            });
        } else {
            console.log("Produto selecionado não encontrado");
            this.setState({
                nome: "",
                descricao: "",
                valor: "",
                produtoSelecionado: "",
            });
        }
    };

    handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        this.setState({ [name]: value } as unknown as Pick<State, keyof State>);
    };

    handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { nome, descricao, valor, produtoSelecionado } = this.state;

        if (!produtoSelecionado) {
            alert("Selecione um produto antes de enviar o formulário!");
            return;
        }

        const valorNum = parseFloat(valor);
        if (isNaN(valorNum)) {
            alert("Valor do produto inválido!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/alterarProduto", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_prod: parseInt(produtoSelecionado, 10), // Convertendo para número antes de enviar
                    nome,
                    valor: valorNum,
                    descricao,
                }),
            });

            if (response.ok) {
                alert("Produto alterado com sucesso!");
                const produtoAtualizado: Produto = { id_prod: parseInt(produtoSelecionado, 10), nome, descricao, valor: valorNum };
                this.props.alterarProduto(produtoAtualizado);
                this.setState({
                    nome: "",
                    descricao: "",
                    valor: "",
                    produtoSelecionado: "",
                });
                this.fetchProdutos();
            } else {
                const errorText = await response.text();
                console.error("Erro ao alterar produto:", errorText);
                alert("Erro ao alterar o produto: " + errorText);
            }
        } catch (error) {
            console.error("Erro ao fazer requisição:", error);
            alert("Erro ao alterar o produto. Verifique o console para mais detalhes.");
        }
    };

    render() {
        const { tema } = this.props;
        const { nome, descricao, valor, produtoSelecionado, produtos } = this.state;

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
                            <option key="default" value="">Selecione um Produto</option>
                            {produtos.map((produto) => (
                                <option key={produto.id_prod} value={produto.id_prod}>
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
