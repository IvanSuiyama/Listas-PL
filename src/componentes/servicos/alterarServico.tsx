import React, { Component } from "react";

type Props = {
    tema: string;
    alterarServico: (servicoAtualizado: Servico) => void;
    servicos: Servico[];
};

type Servico = {
    nome: string;
    descricao: string;
    valor: number;
};

type State = {
    nome: string;
    descricao: string;
    valor: string;
    servicoSelecionado: string;
};

export default class AlterarServico extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: "",
            descricao: "",
            valor: "",
            servicoSelecionado: "",
        };
    }

    handleServicoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const nomeServico = event.target.value;
        const servicoSelecionado = this.props.servicos.find((servico) => servico.nome === nomeServico);
        if (servicoSelecionado) {
            this.setState({
                nome: servicoSelecionado.nome,
                descricao: servicoSelecionado.descricao,
                valor: servicoSelecionado.valor.toString(),
                servicoSelecionado: nomeServico,
            });
        }
    };

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        this.setState({ [name]: value } as Pick<State, keyof State>);
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { nome, descricao, valor, servicoSelecionado } = this.state;
        const valorNum = parseFloat(valor);
        if (isNaN(valorNum)) {
            alert("Valor do serviço inválido!");
            return;
        }
        const servicoAtualizado: Servico = { nome, descricao, valor: valorNum };
        this.props.alterarServico(servicoAtualizado);
        alert("Serviço alterado com sucesso!");
        // Limpar os campos após a submissão
        this.setState({
            nome: "",
            descricao: "",
            valor: "",
            servicoSelecionado: "",
        });
    };

    render() {
        const { tema, servicos } = this.props;
        const { nome, descricao, valor, servicoSelecionado } = this.state;

        return (
            <div className="container-fluid">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group mb-3">
                        <label htmlFor="servicoSelecionado">Selecione o Serviço</label>
                        <select
                            className="form-select"
                            aria-label="Selecione o Serviço"
                            name="servicoSelecionado"
                            value={servicoSelecionado}
                            onChange={this.handleServicoChange}
                        >
                            <option value="">Selecione um Serviço</option>
                            {servicos.map((servico) => (
                                <option key={servico.nome} value={servico.nome}>
                                    {servico.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    {servicoSelecionado && (
                        <>
                            <div className="input-group mb-3">
                                <label htmlFor="nome">Nome</label>
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
                                    Alterar Serviço
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        );
    }
}
