import React, { useEffect, useState } from 'react';

type Cliente = {
    nome: string;
    cpf: string;
    quantidadeProdutos: number;
    quantidadeServicos: number;
};

const TopClientes: React.FC = () => {
    const [topClientes, setTopClientes] = useState<Cliente[]>([]);

    useEffect(() => {
        const fetchTopClientes = async () => {
            try {
                const clientesResponse = await fetch('http://localhost:5000/listarClientes');
                if (!clientesResponse.ok) {
                    throw new Error('Erro ao buscar os top clientes');
                }
                const clientesData = await clientesResponse.json();

                const clientesComQuantidades = await Promise.all(
                    clientesData.map(async (cliente: Cliente) => {
                        // Busca a quantidade de produtos consumidos pelo cliente
                        const produtosResponse = await fetch(`http://localhost:5000/Compras/Produtos/${cliente.cpf}`);
                        if (!produtosResponse.ok) {
                            throw new Error(`Erro ao buscar produtos consumidos pelo cliente ${cliente.nome}`);
                        }
                        const produtosData = await produtosResponse.json();
                        cliente.quantidadeProdutos = produtosData.quantidadeProdutos;

                        // Busca a quantidade de serviços consumidos pelo cliente
                        const servicosResponse = await fetch(`http://localhost:5000/Compras/Servicos/${cliente.cpf}`);
                        if (!servicosResponse.ok) {
                            throw new Error(`Erro ao buscar serviços consumidos pelo cliente ${cliente.nome}`);
                        }
                        const servicosData = await servicosResponse.json();
                        cliente.quantidadeServicos = servicosData.quantidadeServicos;

                        return cliente;
                    })
                );

                // Ordena os clientes por quantidade de produtos + serviços (exemplo)
                const top10 = clientesComQuantidades
                    .sort((a, b) => (a.quantidadeProdutos + a.quantidadeServicos > b.quantidadeProdutos + b.quantidadeServicos ? -1 : 1))
                    .slice(0, 10);

                setTopClientes(top10);
            } catch (error) {
                console.error('Erro ao buscar os top clientes:', error);
            }
        };

        fetchTopClientes();
    }, []);

    return (
        <div className="container-fluid">
            <h2>Top Clientes por Quantidade de Compras</h2>
            {topClientes.length === 0 ? (
                <div className="alert alert-info" role="alert">
                    Nenhum cliente encontrado.
                </div>
            ) : (
                <div className="list-group">
                    {topClientes.map((cliente, index) => (
                        <div key={index}>
                            <div className="list-group-item list-group-item-action">
                                <h5>{index + 1}. Cliente: {cliente.nome}</h5>
                                <p>CPF: {cliente.cpf}</p>
                                <p>Quantidade de Produtos Consumidos: {cliente.quantidadeProdutos}</p>
                                <p>Quantidade de Serviços Consumidos: {cliente.quantidadeServicos}</p>
                            </div>
                            {index !== topClientes.length - 1 && <hr style={{ borderColor: 'blue' }} />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TopClientes;
