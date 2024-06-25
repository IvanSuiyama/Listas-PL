import React, { Component, FormEvent, ChangeEvent } from "react";

type Cliente = {
    cpf: string;
    nome: string;
};

type Produto = {
    id_prod: number;
    nome: string;
    descricao: string;
    valor: number;
};

type Servico = {
    id_serv: number;
    nome: string;
    descricao: string;
    valor: number;
};

type State = {
    cpfSelecionado: string;
    idProdutoSelecionado: string;
    idServicoSelecionado: string;
    clientes: Cliente[];
    produtos: Produto[];
    servicos: Servico[];
};

export default class RegistrarCompra extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            cpfSelecionado: "",
            idProdutoSelecionado: "",
            idServicoSelecionado: "",
            clientes: [],
            produtos: [],
            servicos: [],
        };
    }

    componentDidMount() {
        this.fetchClientes();
        this.fetchProdutos();
        this.fetchServicos();
    }

    fetchClientes = async () => {
        try {
            const response = await fetch("http://localhost:5000/listarclientes");
            const clientes = await response.json();
            this.setState({ clientes });
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
        }
    };

    fetchProdutos = async () => {
        try {
            const response = await fetch("http://localhost:5000/produtos");
            const produtos = await response.json();
            this.setState({ produtos });
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    fetchServicos = async () => {
        try {
            const response = await fetch("http://localhost:5000/servicos");
            const servicos = await response.json();
            this.setState({ servicos });
        } catch (error) {
            console.error("Erro ao buscar serviços:", error);
        }
    };

    handleCpfChange = (event: ChangeEvent<HTMLSelectElement>) => {
        this.setState({ cpfSelecionado: event.target.value });
    };

    handleProdutoChange = (event: ChangeEvent<HTMLSelectElement>) => {
        this.setState({ idProdutoSelecionado: event.target.value });
    };

    handleServicoChange = (event: ChangeEvent<HTMLSelectElement>) => {
        this.setState({ idServicoSelecionado: event.target.value });
    };

    handleRegistrarCompra = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { cpfSelecionado, idProdutoSelecionado, idServicoSelecionado } = this.state;

        if (!cpfSelecionado) {
            alert("Selecione um cliente antes de registrar a compra!");
            return;
        }

        if (!idProdutoSelecionado && !idServicoSelecionado) {
            alert("Selecione pelo menos um produto ou um serviço antes de registrar a compra!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/cadastrarCompra", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cpfCliente: cpfSelecionado,
                    idProduto: idProdutoSelecionado || null,
                    idServico: idServicoSelecionado || null,
                }),
            });

            if (response.ok) {
                alert("Compra registrada com sucesso!");
                this.setState({
                    cpfSelecionado: "",
                    idProdutoSelecionado: "",
                    idServicoSelecionado: "",
                });
            } else {
                const errorData = await response.json();
                alert(`Erro ao registrar compra: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Erro ao registrar compra:", error);
            alert("Erro ao registrar compra. Tente novamente mais tarde.");
        }
    };

    render() {
        const { cpfSelecionado, idProdutoSelecionado, idServicoSelecionado, clientes, produtos, servicos } = this.state;

        return (
            <div className="container-fluid">
                <h2>Registrar Compra de Produto ou Serviço</h2>
                <form onSubmit={this.handleRegistrarCompra}>
                    <div className="input-group mb-3">
                        <label htmlFor="clienteSelecionado">Selecione o Cliente</label>
                        <select
                            className="form-select"
                            name="clienteSelecionado"
                            value={cpfSelecionado}
                            onChange={this.handleCpfChange}
                        >
                            <option value="">Selecione um Cliente</option>
                            {clientes.map(cliente => (
                                <option key={cliente.cpf} value={cliente.cpf}>
                                    {cliente.nome} - CPF: {cliente.cpf}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <label htmlFor="produtoSelecionado">Selecione o Produto (Opcional)</label>
                        <select
                            className="form-select"
                            name="produtoSelecionado"
                            value={idProdutoSelecionado}
                            onChange={this.handleProdutoChange}
                        >
                            <option value="">Selecione um Produto</option>
                            {produtos.map(produto => (
                                <option key={produto.id_prod} value={produto.id_prod}>
                                    {produto.nome} - {produto.descricao} - R$ {produto.valor}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <label htmlFor="servicoSelecionado">Selecione o Serviço (Opcional)</label>
                        <select
                            className="form-select"
                            name="servicoSelecionado"
                            value={idServicoSelecionado}
                            onChange={this.handleServicoChange}
                        >
                            <option value="">Selecione um Serviço</option>
                            {servicos.map(servico => (
                                <option key={servico.id_serv} value={servico.id_serv}>
                                    {servico.nome} - {servico.descricao} - R$ {servico.valor}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <button className="btn btn-outline-secondary" type="submit">
                            Registrar Compra
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
