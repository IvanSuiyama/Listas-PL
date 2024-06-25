import React, { Component, FormEvent, ChangeEvent } from "react";

type Props = {
    tema: string;
    excluirServico: (id_servico: number) => void;
};

type Servico = {
    id_serv: number;
    nome: string;
    descricao: string;
    valor: number;
};

type State = {
    servicoSelecionado: string;
    servicos: Servico[];
    erroAoExcluirServico: boolean;
};

export default class ExcluirServico extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            servicoSelecionado: "",
            servicos: [],
            erroAoExcluirServico: false,
        };
    }

    componentDidMount() {
        this.fetchServicos();
    }

    fetchServicos = async () => {
        try {
            const response = await fetch("http://localhost:5000/servicos");
            const servicos = await response.json();
            console.log("Serviços recebidos do backend:", servicos);
            this.setState({ servicos });
        } catch (error) {
            console.error("Erro ao buscar serviços:", error);
        }
    };

    handleServicoChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const servicoId = event.target.value;
        console.log("Serviço selecionado ID:", servicoId);
        this.setState({
            servicoSelecionado: servicoId,
            erroAoExcluirServico: false, // Resetando o estado de erro ao selecionar novo serviço
        });
    };

    handleExcluirServico = async () => {
        const { servicoSelecionado } = this.state;
        if (!servicoSelecionado) {
            alert("Selecione um serviço para excluir.");
            return;
        }

        const confirmacao = window.confirm(`Tem certeza que deseja excluir o serviço com ID "${servicoSelecionado}"?`);
        if (confirmacao) {
            try {
                const response = await fetch("http://localhost:5000/excluirServico", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id_serv: parseInt(servicoSelecionado, 10) }),
                });

                if (response.ok) {
                    alert("Serviço excluído com sucesso!");
                    this.setState({
                        servicoSelecionado: "",
                    });
                    this.fetchServicos(); // Atualizar a lista de serviços
                } else {
                    console.error("Erro ao excluir serviço:", response.statusText);
                    this.setState({ erroAoExcluirServico: true });
                }
            } catch (error) {
                console.error("Erro ao enviar solicitação para excluir serviço", error);
                this.setState({ erroAoExcluirServico: true });
            }
        }
    };

    render() {
        const { tema } = this.props;
        const { servicoSelecionado, servicos, erroAoExcluirServico } = this.state;

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
                                <option key={servico.id_serv} value={servico.id_serv.toString()}>
                                    {servico.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    {servicoSelecionado && (
                        <div className="input-group mb-3">
                            <p>Tem certeza que deseja excluir o serviço "{servicos.find(serv => serv.id_serv.toString() === servicoSelecionado)?.nome}"?</p>
                            <button className="btn btn-outline-danger" type="button" onClick={this.handleExcluirServico} style={{ background: tema }}>
                                Excluir Serviço
                            </button>
                        </div>
                    )}
                    {erroAoExcluirServico && (
                        <div className="alert alert-danger" role="alert">
                            Ocorreu um erro ao excluir o serviço. Por favor, tente novamente.
                        </div>
                    )}
                </form>
            </div>
        );
    }
}
