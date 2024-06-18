import React, { useState } from "react";

function ExcluirProduto({ tema, excluirProduto, produtos }) {
    const [produtoSelecionado, setProdutoSelecionado] = useState("");

    const handleProdutoChange = (event) => {
        const nomeProduto = event.target.value;
        setProdutoSelecionado(nomeProduto);
    };

    const handleExcluirProduto = () => {
        if (!produtoSelecionado) {
            alert("Selecione um produto para excluir.");
            return;
        }
        const confirmacao = window.confirm(`Tem certeza que deseja excluir o produto "${produtoSelecionado}"?`);
        if (confirmacao) {
            excluirProduto(produtoSelecionado);
            alert("Produto excluído com sucesso!");
            // Limpar o campo após a exclusão
            setProdutoSelecionado("");
        }
    };

    return (
        <div className="container-fluid">
            <form onSubmit={(event) => event.preventDefault()}>
                <div className="input-group mb-3">
                    <label htmlFor="produtoSelecionado">Selecione o Produto</label>
                    <select
                        className="form-select"
                        aria-label="Selecione o Produto"
                        name="produtoSelecionado"
                        value={produtoSelecionado}
                        onChange={handleProdutoChange}
                    >
                        <option value="">Selecione um Produto</option>
                        {produtos.map((produto) => (
                            <option key={produto.nome} value={produto.nome}>
                                {produto.nome}
                            </option>
                        ))}
                    </select>
                </div>
                {produtoSelecionado && (
                    <div className="input-group mb-3">
                        <p>Tem certeza que deseja excluir o produto "{produtoSelecionado}"?</p>
                        <button
                            className="btn btn-outline-danger"
                            type="button"
                            onClick={handleExcluirProduto}
                            style={{ background: tema }}
                        >
                            Excluir Produto
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}

export default ExcluirProduto;
