import React from "react";

type Produto = {
    nome: string;
    descricao: string;
    valor: number;
};

type Props = {
    produtos: Produto[];
};

const ListarProdutos: React.FC<Props> = ({ produtos }) => {
    return (
        <div>
            <h2>Lista de Produtos</h2>
            {produtos.length === 0 ? (
                <p>Nenhum produto cadastrado.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map((produto, index) => (
                            <tr key={index}>
                                <td>{produto.nome}</td>
                                <td>{produto.descricao}</td>
                                <td>{produto.valor.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ListarProdutos;
