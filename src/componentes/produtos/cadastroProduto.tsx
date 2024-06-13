import React, { Component } from "react";

type Props = {
    tema: string;
    adicionarProduto: (novoProduto: { nome: string; descricao: string; valor: number }) => void;
};

type State = {
    nome: string;
    descricao: string;
    valor: number;
};

export default class FormularioCadastroProduto extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: "",
            descricao: "",
            valor: 0,
        };
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            ...prevState,
            [name]: name === "valor" ? parseFloat(value) : value
        } as Pick<State, keyof State>));
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { nome, descricao, valor } = this.state;

        alert("Produto cadastrado com sucesso!");
        const novoProduto = { nome, descricao, valor };
        this.props.adicionarProduto(novoProduto); // Chamando a função adicionarProduto passada por props
        this.setState({
            nome: "",
            descricao: "",
            valor: 0
        });
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
                            type="number"
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
