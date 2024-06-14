// mostraCompra.tsx
import React from 'react';

type Compra = {
    clienteCpf: string;
    clienteNome: string;
    itens: {
        nome: string;
        tipo: "produto" | "servico";
        valor: number;
    }[];
};

type Props = {
    compras: Compra[];
};

const ListaCompras: React.FC<Props> = ({ compras }) => {
    return (
        <div className="container-fluid">
            <h2>Lista de Compras</h2>
            {compras.length === 0 ? (
                <div className="alert alert-info" role="alert">
                    Nenhuma compra registrada.
                </div>
            ) : (
                <div className="list-group">
                    {compras.map((compra, index) => (
                        <div key={index}>
                            <div className="list-group-item list-group-item-action">
                                <h5>{compra.clienteNome}</h5>
                                <p>CPF: {compra.clienteCpf}</p>
                                {compra.itens.map((item, idx) => (
                                    <p key={idx}>
                                        {item.tipo === "produto" ? "Produto" : "Serviço"}: {item.nome} - R$ {item.valor}
                                    </p>
                                ))}
                            </div>
                            {index !== compras.length - 1 && <hr style={{ borderColor: "blue" }} />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ListaCompras;
