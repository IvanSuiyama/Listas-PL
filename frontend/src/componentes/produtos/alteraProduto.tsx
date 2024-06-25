import React, { Component, FormEvent, ChangeEvent } from "react";

type Props = {
    tema: string;
    alterarProduto: (produtoAtualizado: Produto) => void;
};

type Produto = {
    id_prod: number;
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
    erroAoAlterarProduto: boolean;
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
            erroAoAlterarProduto: false,
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
                produtoSelecionado: produtoSelecionado.id_prod.toString(),
                erroAoAlterarProduto: false, // Resetando o estado de erro ao selecionar novo produto
            });
        } else {
            console.log("Produto selecionado não encontrado");
            this.setState({
                nome: "",
                descricao: "",
                valor: "",
                produtoSelecionado: "",
                erroAoAlterarProduto: false, // Resetando o estado de erro ao selecionar novo produto
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
                    id_prod: parseInt(produtoSelecionado, 10),
                    nome,
                    valor: valorNum,
                    descricao,
                }),
            });
    
            if (response.ok) {
                const data = await response.json();
                if (data.message === "Produto atualizado com sucesso") { // Ajustado para verificar a mensagem de sucesso correta
                    const produtoAtualizado: Produto = { id_prod: parseInt(produtoSelecionado, 10), nome, descricao, valor: valorNum };
                    this.props.alterarProduto(produtoAtualizado);
                    alert("Produto alterado com sucesso!");
                    this.setState({
                        nome: "",
                        descricao: "",
                        valor: "",
                        produtoSelecionado: "",
                    });
                    this.fetchProdutos();
                } else {
                    console.error(`Erro ao alterar produto: ${data.error}`);
                    alert(`Erro ao alterar produto: ${data.error}`);
                }
            } else {
                const errorText = await response.text();
                console.error(`Erro ao alterar produto: ${errorText}`);
                alert(`Erro ao alterar produto: ${errorText}`);
            }
        } catch (error) {
            console.error("Erro ao enviar solicitação para alterar produto", error);
            alert("Erro ao alterar produto. Verifique o console para mais detalhes.");
        }
    };
    

    render() {
        const { tema } = this.props;
        const { nome, descricao, valor, produtoSelecionado, produtos, erroAoAlterarProduto } = this.state;

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
                            {erroAoAlterarProduto && (
                                <div className="alert alert-danger" role="alert">
                                    Ocorreu um erro ao alterar o produto. Por favor, tente novamente.
                                </div>
                            )}
                        </>
                    )}
                </form>
            </div>
        );
    }
}
