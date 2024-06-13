import React, { Component } from "react";

type Props = {
    tema: string;
    excluirServico: (nomeServico: string) => void;
    servicos: Servico[];
};

type Servico = {
    nome: string;
    descricao: string;
    valor: number;
};

type State = {
    servicoSelecionado: string;
};

export default class ExcluirServico extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            servicoSelecionado: "",
        };
    }

    handleServicoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const nomeServico = event.target.value;
        this.setState({
            servicoSelecionado: nomeServico,
        });
    };

    handleExcluirServico = () => {
        const { servicoSelecionado } = this.state;
        if (!servicoSelecionado) {
            alert("Selecione um serviço para excluir.");
            return;
        }
        const confirmacao = window.confirm(`Tem certeza que deseja excluir o serviço "${servicoSelecionado}"?`);
        if (confirmacao) {
            this.props.excluirServico(servicoSelecionado);
            alert("Serviço excluído com sucesso!");
            // Limpar o campo após a exclusão
            this.setState({
                servicoSelecionado: "",
            });
        }
    };

    render() {
        const { tema, servicos } = this.props;
        const { servicoSelecionado } = this.state;

        return (
            <div className="container-fluid">
                <form onSubmit={(event) => event.preventDefault()}>
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
                        <div className="input-group mb-3">
                            <p>Tem certeza que deseja excluir o serviço "{servicoSelecionado}"?</p>
                            <button className="btn btn-outline-danger" type="button" onClick={this.handleExcluirServico} style={{ background: tema }}>
                                Excluir Serviço
                            </button>
                        </div>
                    )}
                </form>
            </div>
        );
    }
}
