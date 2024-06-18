import React, { useState } from "react";

const ExcluirServico = ({ tema, excluirServico, servicos }) => {
    const [servicoSelecionado, setServicoSelecionado] = useState("");

    const handleServicoChange = (event) => {
        const nomeServico = event.target.value;
        setServicoSelecionado(nomeServico);
    };

    const handleExcluirServico = () => {
        if (!servicoSelecionado) {
            alert("Selecione um serviço para excluir.");
            return;
        }
        const confirmacao = window.confirm(`Tem certeza que deseja excluir o serviço "${servicoSelecionado}"?`);
        if (confirmacao) {
            excluirServico(servicoSelecionado);
            alert("Serviço excluído com sucesso!");
            setServicoSelecionado("");
        }
    };

    return (
        <div className="container-fluid">
            <form onSubmit={(event) => event.preventDefault()}>
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
                    <div className="input-group mb-3">
                        <p>Tem certeza que deseja excluir o serviço "{servicoSelecionado}"?</p>
                        <button
                            className="btn btn-outline-danger"
                            type="button"
                            onClick={handleExcluirServico}
                            style={{ background: tema }}
                        >
                            Excluir Serviço
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default ExcluirServico;
