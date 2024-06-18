import React, { useState } from "react";

function AlterarProduto({ tema, alterarProduto, produtos }) {
  const [state, setState] = useState({
    nome: "",
    descricao: "",
    valor: "",
    produtoSelecionado: "",
  });

  const handleProdutoChange = (event) => {
    const nomeProduto = event.target.value;
    const produtoSelecionado = produtos.find(
      (produto) => produto.nome === nomeProduto
    );
    if (produtoSelecionado) {
      setState({
        ...state,
        nome: produtoSelecionado.nome,
        descricao: produtoSelecionado.descricao,
        valor: produtoSelecionado.valor.toString(),
        produtoSelecionado: nomeProduto,
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { nome, descricao, valor } = state;
    const valorNum = parseFloat(valor);
    if (isNaN(valorNum)) {
      alert("Valor do produto inválido!");
      return;
    }
    const produtoAtualizado = { nome, descricao, valor: valorNum };
    alterarProduto(produtoAtualizado);
    alert("Produto alterado com sucesso!");
    setState({
      nome: "",
      descricao: "",
      valor: "",
      produtoSelecionado: "",
    });
  };

  const { nome, descricao, valor, produtoSelecionado } = state;

  return (
    <div className="container-fluid">
      <form onSubmit={handleSubmit}>
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
          <>
            <div className="input-group mb-3">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nome"
                aria-label="Nome"
                aria-describedby="basic-addon1"
                name="nome"
                value={nome}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group mb-3">
              <label htmlFor="descricao">Descrição</label>
              <textarea
                className="form-control"
                placeholder="Descrição"
                aria-label="Descrição"
                name="descricao"
                value={descricao}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group mb-3">
              <label htmlFor="valor">Valor</label>
              <input
                type="text"
                className="form-control"
                placeholder="Valor"
                aria-label="Valor"
                name="valor"
                value={valor}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group mb-3">
              <button
                className="btn btn-outline-secondary"
                type="submit"
                style={{ background: tema }}
              >
                Alterar Produto
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default AlterarProduto;
