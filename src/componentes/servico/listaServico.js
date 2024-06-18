import React from "react";

const ListarServico = ({ servicos }) => {
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
};

export default ListarServico;
