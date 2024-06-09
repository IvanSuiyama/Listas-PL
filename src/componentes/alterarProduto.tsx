import React, { useState } from "react";

type Produto = {
    nome: string;
    descricao: string;
    valor: number;
};

type Props = {
    produtos: Produto[];
    alterarProduto: (produtoAlterado: Produto) => void;
};

const AlterarProduto: React.FC<Props> = ({ produtos, alterarProduto }) => {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState(0);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const produto = produtos.find(p => p.nome === nome);
        if (!produto) {
            alert("Produto não encontrado.");
            return;
        }

        const produtoAlterado = { nome, descricao, valor };
        alterarProduto(produtoAlterado);
        alert("Produto alterado com sucesso!");

        setNome("");
        setDescricao("");
        setValor(0);
    };

    return (
        <div>
            <h2>Alterar Produto</h2>
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
                    <label htmlFor="descricao">Descrição:</label>
                    <input
                        type="text"
                        id="descricao"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="valor">Valor:</label>
                    <input
                        type="number"
                        id="valor"
                        value={valor}
                        onChange={(e) => setValor(Number(e.target.value))}
                    />
                </div>
                <button type="submit">Alterar</button>
            </form>
        </div>
    );
};

export default AlterarProduto;
