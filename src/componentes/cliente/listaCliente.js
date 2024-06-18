import React from "react";

const ListaCliente = ({ clientes }) => {
    return (
        <div className="container-fluid">
            {clientes.length === 0 ? (
                <div className="alert alert-info" role="alert">
                    Nenhum cliente cadastrado.
                </div>
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
};

export default ListaCliente;
