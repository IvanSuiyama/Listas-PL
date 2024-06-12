import React, { Component } from "react";

type Cliente = {
    nome: string;
    nomeSocial: string;
    cpf: string;
    dataEmissao: string;
};

type Props = {
    clientes: Cliente[];
};

type State = {};

export default class ListaCliente extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { clientes } = this.props;

        return (
            <div className="container-fluid">
                {clientes.length === 0 ? (
                    <p>Não tem nenhum cliente cadastrado</p>
                ) : (
                    <div className="list-group">
                        {clientes.map((cliente, index) => (
                            <div key={index}>
                                <div className="list-group-item list-group-item-action">
                                    <h5>{cliente.nome}</h5>
                                    <p>Nome Social: {cliente.nomeSocial}</p>
                                    <p>CPF: {cliente.cpf}</p>
                                    <p>Data de Emissão: {cliente.dataEmissao}</p>
                                </div>
                                {index !== clientes.length - 1 && <hr style={{ borderColor: "blue" }} />}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}
