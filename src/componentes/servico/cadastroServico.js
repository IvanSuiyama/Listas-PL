import React, { useState } from "react";

function FormularioCadastroServico({ tema, adicionarServico }) {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "nome") setNome(value);
        if (name === "descricao") setDescricao(value);
        if (name === "valor") setValor(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const valorNum = parseFloat(valor);
        if (isNaN(valorNum)) {
            alert("Valor do serviço inválido!");
            return;
        }
        const novoServico = { nome, descricao, valor: valorNum };
        adicionarServico(novoServico);
        alert("Serviço cadastrado com sucesso!");
        // Limpar os campos após a submissão
        setNome("");
        setDescricao("");
        setValor("");
    };

    return (
        <div className="container-fluid">
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <label htmlFor="nome">Nome do Serviço</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nome"
                        aria-label="Nome"
                        name="nome"
                        value={nome}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-group mb-3">
                    <label htmlFor="descricao">Descrição do Serviço</label>
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
                    <label htmlFor="valor">Valor do Serviço</label>
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
                    <button className="btn btn-outline-primary" type="submit" style={{ background: tema }}>
                        Cadastrar Serviço
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormularioCadastroServico;
