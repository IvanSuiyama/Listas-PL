import React, { Component } from "react";

type Servico = {
    nome: string;
    descricao: string;
    valor: number;
};

type Props = {
    servicos: Servico[];
};

type State = {
    servicos: Servico[];
};

class ListarServico extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            servicos: []
        };
    }

    async componentDidMount() {
        try {
            const response = await fetch('http://localhost:5000/listarServico'); // Verifique o endereço completo aqui
            if (!response.ok) {
                throw new Error('Erro ao obter os serviços');
            }
            const servicos = await response.json();
            this.setState({ servicos });
        } catch (error) {
            console.error('Erro ao obter serviços:', error);
            // Trate o erro adequadamente (exibir mensagem de erro, etc.)
        }
    }

    render() {
        const { servicos } = this.state;

        return (
            <div className="container-fluid">
                {servicos.length === 0 ? (
                    <div className="alert alert-info" role="alert">
                        Nenhum serviço cadastrado.
                    </div>
                ) : (
                    <div className="list-group">
                        {servicos.map((servico, index) => (
                            <div key={index}>
                                <div className="list-group-item list-group-item-action">
                                    <h5>{servico.nome}</h5>
                                    <p>Descrição: {servico.descricao}</p>
                                    <p>Valor: R$ {servico.valor.toFixed(2)}</p>
                                </div>
                                {index !== servicos.length - 1 && <hr style={{ borderColor: "blue" }} />}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

export default ListarServico;
