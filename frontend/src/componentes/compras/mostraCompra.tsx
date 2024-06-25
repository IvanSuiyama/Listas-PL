import React, { useEffect, useState } from 'react';

type Compra = {
    nomeCliente: string;
    nomeP?: string;
    valorP?: string;
    nomeS?: string;
    valorS?: string;
};

const ListaCompras: React.FC = () => {
    const [compras, setCompras] = useState<Compra[]>([]);

    useEffect(() => {
        const fetchCompras = async () => {
            try {
                const response = await fetch('http://localhost:5000/mostrarCompras');
                if (!response.ok) {
                    throw new Error('Erro ao buscar compras');
                }
                const data = await response.json();
                setCompras(data);
            } catch (error) {
                console.error('Erro ao buscar compras:', error);
            }
        };

        fetchCompras();
    }, []);

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
                                <h5>Cliente: {compra.nomeCliente}</h5>
                                {compra.nomeP && (
                                    <p>
                                        Produto: {compra.nomeP} - R$ {compra.valorP}
                                    </p>
                                )}
                                {compra.nomeS && (
                                    <p>
                                        Serviço: {compra.nomeS} - R$ {compra.valorS}
                                    </p>
                                )}
                            </div>
                            {index !== compras.length - 1 && <hr style={{ borderColor: 'blue' }} />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ListaCompras;
