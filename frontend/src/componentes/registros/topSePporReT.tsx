import React, { useEffect, useState } from 'react';

type ConsumoPet = {
    tipoPet: string;
    racaPet: string;
    quantidadeProdutos: number;
};

const TopSePporReT: React.FC = () => {
    const [topProdutosServicos, setTopProdutosServicos] = useState<ConsumoPet[]>([]);

    useEffect(() => {
        const fetchTopSePporReT = async () => {
            try {
                const response = await fetch('http://localhost:5000/topSePporReT');
                if (!response.ok) {
                    throw new Error('Erro ao buscar os top produtos e serviços por tipo e raça de pet');
                }
                const data = await response.json();
                setTopProdutosServicos(data);
            } catch (error) {
                console.error('Erro ao buscar os top produtos e serviços por tipo e raça de pet:', error);
            }
        };

        fetchTopSePporReT();
    }, []);

    return (
        <div className="container-fluid">
            <h2>Top 5 Produtos e Serviços por Tipo e Raça de Pet</h2>
            {topProdutosServicos.length === 0 ? (
                <div className="alert alert-info" role="alert">
                    Nenhum dado encontrado.
                </div>
            ) : (
                <div className="list-group">
                    {topProdutosServicos.map((item, index) => (
                        <div key={index}>
                            <div className="list-group-item list-group-item-action">
                                <h5>{index + 1}. Tipo de Pet: {item.tipoPet}</h5>
                                <p>Raça: {item.racaPet}</p>
                                <p>Quantidade de Produtos e Serviços Consumidos: {item.quantidadeProdutos}</p>
                            </div>
                            {index !== topProdutosServicos.length - 1 && <hr style={{ borderColor: 'blue' }} />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TopSePporReT;
