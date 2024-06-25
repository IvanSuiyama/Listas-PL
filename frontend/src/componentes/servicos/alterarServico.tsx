import React, { Component, FormEvent, ChangeEvent } from "react";

type Props = {
    tema: string;
    alterarServico: (servicoAtualizado: Servico) => void;
};

type Servico = {
    id_serv: number;
    nome: string;
    descricao: string;
    valor: number;
};

type State = {
    nome: string;
    descricao: string;
    valor: string;
    servicoSelecionado: string;
    servicos: Servico[];
    erroAoAlterarServico: boolean;
};

export default class AlterarServico extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: "",
            descricao: "",
            valor: "",
            servicoSelecionado: "",
            servicos: [],
            erroAoAlterarServico: false,
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
        const servicoId = parseInt(event.target.value, 10); // Convertendo para número
        const servicoSelecionado = this.state.servicos.find((servico) => servico.id_serv === servicoId);

        if (servicoSelecionado) {
            this.setState({
                nome: servicoSelecionado.nome,
                descricao: servicoSelecionado.descricao,
                valor: servicoSelecionado.valor.toString(),
                servicoSelecionado: servicoSelecionado.id_serv.toString(),
                erroAoAlterarServico: false, // Resetando o estado de erro ao selecionar novo serviço
            });
        } else {
            this.setState({
                nome: "",
                descricao: "",
                valor: "",
                servicoSelecionado: "",
                erroAoAlterarServico: false, // Resetando o estado de erro ao selecionar novo serviço
            });
        }
    };

    handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            ...prevState,
            [name]: value,
        }) as Pick<State, keyof State>);
    };
    

    handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { nome, descricao, valor, servicoSelecionado } = this.state;

        if (!servicoSelecionado) {
            alert("Selecione um serviço antes de enviar o formulário!");
            return;
        }

        const valorNum = parseFloat(valor);
        if (isNaN(valorNum)) {
            alert("Valor do serviço inválido!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/alterarServico", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_serv: parseInt(servicoSelecionado, 10),
                    nome,
                    valor: valorNum,
                    descricao,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.message === "Serviço atualizado com sucesso!") {
                    const servicoAtualizado: Servico = { id_serv: parseInt(servicoSelecionado, 10), nome, descricao, valor: valorNum };
                    this.props.alterarServico(servicoAtualizado);
                    alert("Serviço alterado com sucesso!");
                    this.setState({
                        nome: "",
                        descricao: "",
                        valor: "",
                        servicoSelecionado: "",
                    });
                    this.fetchServicos();
                } else {
                    console.error(`Erro ao alterar serviço: ${data.error}`);
                    alert(`Erro ao alterar serviço: ${data.error}`);
                }
            } else {
                const errorText = await response.text();
                console.error(`Erro ao alterar serviço: ${errorText}`);
                alert(`Erro ao alterar serviço: ${errorText}`);
            }
        } catch (error) {
            console.error("Erro ao enviar solicitação para alterar serviço", error);
            alert("Erro ao alterar serviço. Verifique o console para mais detalhes.");
        }
    };

    render() {
        const { tema } = this.props;
        const { nome, descricao, valor, servicoSelecionado, servicos, erroAoAlterarServico } = this.state;

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
                            <option key="default" value="">Selecione um Serviço</option>
                            {servicos.map((servico) => (
                                <option key={servico.id_serv} value={servico.id_serv}>
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
                            {erroAoAlterarServico && (
                                <div className="alert alert-danger" role="alert">
                                    Ocorreu um erro ao alterar o serviço. Por favor, tente novamente.
                                </div>
                            )}
                        </>
                    )}
                </form>
            </div>
        );
    }
}
