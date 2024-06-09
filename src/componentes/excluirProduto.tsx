import React, { useState } from 'react';

type Produto = {
    nome: string;
    descricao: string;
    valor: number;
};

type Props = {
    produtos: Produto[];
    excluirProduto: (nomeProduto: string) => void;
};

const ExcluirProduto: React.FC<Props> = ({ produtos, excluirProduto }) => {
    const [nomeProduto, setNomeProduto] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!nomeProduto) {
            alert('Por favor, informe o nome do produto.');
            return;
        }

        const produto = produtos.find(produto => produto.nome === nomeProduto);
        if (!produto) {
            alert('Produto não encontrado.');
            return;
        }

        excluirProduto(nomeProduto);
        setNomeProduto('');
        alert('Produto excluído com sucesso.');
    };

    return (
        <div>
            <h2>Excluir Produto</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nomeProduto">Nome do Produto:</label>
                    <input
                        type="text"
                        id="nomeProduto"
                        value={nomeProduto}
                        onChange={(e) => setNomeProduto(e.target.value)}
                    />
                </div>
                <button type="submit">Excluir Produto</button>
            </form>
        </div>
    );
};

export default ExcluirProduto;
