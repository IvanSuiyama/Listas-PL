import React, { useState } from "react";

const AlterarServico = ({ tema, alterarServico, servicos }) => {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [servicoSelecionado, setServicoSelecionado] = useState("");

    const handleServicoChange = (event) => {
        const nomeServico = event.target.value;
        const servicoSelecionado = servicos.find((servico) => servico.nome === nomeServico);
        if (servicoSelecionado) {
            setNome(servicoSelecionado.nome);
            setDescricao(servicoSelecionado.descricao);
            setValor(servicoSelecionado.valor.toString());
            setServicoSelecionado(nomeServico);
        }
    };

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
        const servicoAtualizado = { nome, descricao, valor: valorNum };
        alterarServico(servicoAtualizado);
        alert("Serviço alterado com sucesso!");
        setNome("");
        setDescricao("");
        setValor("");
        setServicoSelecionado("");
    };

    return (
        <div className="container-fluid">
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <label htmlFor="servicoSelecionado">Selecione o Serviço</label>
                    <select
                        className="form-select"
                        aria-label="Selecione o Serviço"
                        name="servicoSelecionado"
                        value={servicoSelecionado}
                        onChange={handleServicoChange}
                    >
                        <option value="">Selecione um Serviço</option>
                        {servicos.map((servico) => (
                            <option key={servico.nome} value={servico.nome}>
                                {servico.nome}
                            </option>
                        ))}
                    </select>
                </div>
                {servicoSelecionado && (
                    <>
                        <div className="input-group mb-3">
                            <label htmlFor="nome">Nome</label>
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
                            <button className="btn btn-outline-secondary" type="submit" style={{ background: tema }}>
                                Alterar Serviço
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
};

export default AlterarServico;
