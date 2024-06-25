// top5cli.tsx

import React, { useEffect, useState } from 'react';

type Cliente = {
    nome: string;
    cpf: string;
    totalConsumido: number;
};

const Top5Clientes: React.FC = () => {
    const [top5Clientes, setTop5Clientes] = useState<Cliente[]>([]);

    useEffect(() => {
        const fetchTop5Clientes = async () => {
            try {
                // Substitua pela sua URL da API ou endpoint da rota /buscartop5cli
                const response = await fetch('http://localhost:5000/buscartop5cli');
                if (!response.ok) {
                    throw new Error('Erro ao buscar os top clientes');
                }
                const data = await response.json();

                const top5ClientesData: Cliente[] = data.map((cliente: any) => ({
                    nome: cliente.nome,
                    cpf: cliente.cpfCliente,
                    totalConsumido: cliente.totalValorS + cliente.totalValorP // Supondo que os valores estejam retornados corretamente
                }));

                setTop5Clientes(top5ClientesData);
            } catch (error) {
                console.error('Erro ao buscar os top clientes:', error);
            }
        };

        fetchTop5Clientes();
    }, []);

    return (
        <div className="container-fluid">
            <h2>Top 5 Clientes que Mais Consumiram</h2>
            {top5Clientes.length === 0 ? (
                <div className="alert alert-info" role="alert">
                    Nenhum cliente encontrado.
                </div>
            ) : (
                <div className="list-group">
                    {top5Clientes.map((cliente, index) => (
                        <div key={index}>
                            <div className="list-group-item list-group-item-action">
                                <h5>{index + 1}. Cliente: {cliente.nome}</h5>
                                <p>CPF: {cliente.cpf}</p>
                                <p>Total Consumido: R$ {cliente.totalConsumido.toFixed(2)}</p>
                            </div>
                            {index !== top5Clientes.length - 1 && <hr style={{ borderColor: 'blue' }} />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Top5Clientes;
