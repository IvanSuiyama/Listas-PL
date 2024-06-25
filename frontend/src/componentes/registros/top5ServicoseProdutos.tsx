import React, { useEffect, useState } from 'react';

type PeS = {
    nome: string;
    quantidade: number;
};

const Top5ServicoseProdutos: React.FC = () => {
    const [top5PeS, setTop5PeS] = useState<PeS[]>([]);

    useEffect(() => {
        const fetchTop5PeS = async () => {
            try {
                const response = await fetch('http://localhost/top5PeS');
                if (!response.ok) {
                    throw new Error('Erro ao buscar os top produtos e serviços');
                }
                const data = await response.json();
                setTop5PeS(data);
            } catch (error) {
                console.error('Erro ao buscar os top produtos e serviços:', error);
            }
        };

        fetchTop5PeS();
    }, []);

    return (
        <div className="container">
            <h2>Top 5 Serviços e Produtos Mais Consumidos</h2>
            <ul className="list-group">
                {top5PeS.map((item, index) => (
                    <li key={index} className="list-group-item">
                        <strong>{item.nome}</strong> - {item.quantidade}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Top5ServicoseProdutos;
