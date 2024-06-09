/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";

type Cliente = {
    nome: string;
    nomeSocial: string;
    cpf: string;
    dataEmissao: string;
};

type Props = {
    tema: string;
    clientes: Cliente[];
    editarCliente: (cliente: Cliente) => void;
};

export default class ListaCliente extends Component<Props> {
    render() {
        const { tema, clientes, editarCliente } = this.props;
        return (
            <div className="container-fluid">
                <h2>Lista de Clientes</h2>
                {clientes.length === 0 ? (
                <p>Nenhum cliente cadastrado.</p>
                ):(
                <div className="list-group">
                    {clientes.map((cliente, index) => (
                        <div key={index} className="list-group-item list-group-item-action">
                            {cliente.nome} ({cliente.nomeSocial}) - {cliente.cpf} - {cliente.dataEmissao}
                            <button
                                className="btn btn-primary btn-sm mx-2"
                                onClick={() => editarCliente(cliente)}
                            >
                                Editar
                            </button>
                        </div>
                    ))}
                    
                </div>
                )}
            </div>
        );
    }
}
