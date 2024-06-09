import React, { useState } from 'react';

type Produto = {
    nome: string;
    descricao: string;
    valor: number;
};

type Props = {
    adicionarProduto: (produto: Produto) => void;
};

const CadastroProduto: React.FC<Props> = ({ adicionarProduto }) => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState<number | ''>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const valorNumerico = typeof valor === 'string' ? parseFloat(valor) : valor;

        if (!nome || !descricao || isNaN(valorNumerico)) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const novoProduto: Produto = { nome, descricao, valor: valorNumerico };
        adicionarProduto(novoProduto);

        setNome('');
        setDescricao('');
        setValor('');

        alert('Cadastro de produto concluído :)');
    };

    return (
        <div>
            <h2>Cadastro de Produto</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nome">Nome do Produto:</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="descricao">Descrição do Produto:</label>
                    <input
                        type="text"
                        id="descricao"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="valor">Valor do Produto:</label>
                    <input
                        type="number"
                        id="valor"
                        value={valor}
                        onChange={(e) => setValor(e.target.valueAsNumber)}
                    />
                </div>
                <button type="submit">Cadastrar Produto</button>
            </form>
        </div>
    );
};

export default CadastroProduto;
